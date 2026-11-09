import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "./app.js";

const newUser = {
  firstName: "Jan",
  lastName: "Nowak",
  email: "email@example.com",
};

describe("POST /users", () => {
  it("Tworzy użytkownika z 1-5 róznymi rolami", async () => {
    const res = await request(app).post("/users").send(newUser);

    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe("Jan");

    const names = res.body.roles.map((r: { name: string }) => r.name);
    expect(names.length).toBeGreaterThanOrEqual(1);
    expect(names.length).toBeLessThanOrEqual(5);
    expect(new Set(names).size).toBe(names.length);
  });

  it("Zwraca 400 przy braku danych", async () => {
    const res = await request(app).post("/users").send({ firstName: "Adam" });

    expect(res.status).toBe(400);
  });
});

describe("GET /users", () => {
  it("Zwraca 200 i tablicę z użytkownikami", async () => {
    const res = await request(app).get("/users");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Zwraca utworzonych użytkowników razem z rolami", async () => {
    const a = await request(app).post("/users").send(newUser);
    const b = await request(app).post("/users").send(newUser);

    const res = await request(app).get("/users");
    const ids = res.body.map((u: { id: number }) => u.id);

    expect(ids).toContain(a.body.id);
    expect(ids).toContain(b.body.id);
    expect(res.body[0].roles.length).toBeGreaterThanOrEqual(1);
  });
});

describe("GET /users/:id", () => {
  it("Zwraca 200 i dnae użytkownika z rolami", async () => {
    const created = await request(app).post("/users").send(newUser);
    const res = await request(app).get(`/users/${created.body.id}`);

    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe("Jan");
    expect(res.body.lastName).toBe("Nowak");
    expect(res.body.email).toBe("email@example.com");
    expect(res.body.id).toBeGreaterThanOrEqual(1);
  });

  it("Zwraca 400 gdy id nie jest liczbą", async () => {
    const res = await request(app).get("/users/abc");

    expect(res.status).toBe(400);
  });

  it("Zwraca 404, gdy użytkownik nie istnieje", async () => {
    const res = await request(app).get("/users/999");

    expect(res.status).toBe(404);
  });
});

describe("PUT /users/:id", () => {
  it("Aktualizuje użytkownika", async () => {
    const created = await request(app).post("/users").send(newUser);

    const res = await request(app)
      .put(`/users/${created.body.id}`)
      .send({ ...newUser, lastName: "Kowalski" });

    expect(res.status).toBe(200);
    expect(res.body.lastName).toBe("Kowalski");
  });

  it("Zwraca 400 gdy id nie jest liczbą", async () => {
    const res = await request(app).put("/users/abc").send(newUser);

    expect(res.status).toBe(400);
  });

  it("Zwraca 400 przy braku danych", async () => {
    const created = await request(app).put("/users").send(newUser);
    const res = await request(app)
      .put(`/users/${created.body.id}`)
      .send({ ...newUser, lastName: "Kowalski" });

    expect(res.status).toBe(400);
  });

  it("Zwraca 404 gdy użytkownik nie istnieje", async () => {
    const res = await request(app).get("/users/999").send(newUser);

    expect(res.status).toBe(404);
  });
});

describe("DELETE /users/:id", () => {
  it("Usuwa użytkownika, a kolejny GET zwraca 404", async () => {
    const created = await request(app).post("/users").send(newUser);
    const id = created.body.id;

    const del = await request(app).delete(`/users/${id}`);
    expect(del.status).toBe(204);

    const get = await request(app).get(`/users/${id}`);
    expect(get.status).toBe(404);
  });

  it("Zwraca 400 gdy id nie jest liczbą", async () => {
    const res = await request(app).delete("/users/abc");
    expect(res.status).toBe(400);
  });

  it("Zwraca 404 dla nieistniejącego id", async () => {
    const res = await request(app).delete("/users/999");
    expect(res.status).toBe(404);
  });
});
