import { app } from "./app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
