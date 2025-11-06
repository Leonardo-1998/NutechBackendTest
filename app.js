import express from "express";
import UserController from "./controllers/UserController.js";
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Module Membership
app.post("/registration", UserController.registerUser);
app.post("/login", UserController.loginUser);
app.get("/profile", UserController.showProfile);
app.put("/profile/update", UserController.X);
app.put("/profile/image", UserController.X);

// Module Information
app.get("/banner", UserController.X);
app.get("/services", UserController.X);

// Module Transaction
app.get("/balance", UserController.X);
app.post("/topup", UserController.X);
app.post("/transaction", UserController.X);
app.get("/transaction/history", UserController.X);

// app.get("/user", UserController.showProfile);

app.listen(port, () => {
  console.log(`Starting app at port ${port}`);
});
