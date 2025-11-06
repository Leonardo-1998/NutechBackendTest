import express from "express";
import UserController from "./controllers/UserController.js";
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/registration", UserController.X);
app.post("/login", UserController.X);
app.get("/profile", UserController.X);
app.put("/profile/update", UserController.X);
app.put("/profile/image", UserController.X);

app.get("/banner", UserController.X);
app.get("/services", UserController.X);

app.get("/balance", UserController.X);
app.post("/topup", UserController.X);
app.post("/transaction", UserController.X);
app.get("/transaction/history", UserController.X);

app.get("/user", UserController.showProfile);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
