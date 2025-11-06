import express from "express";
import UserController from "./controllers/UserController.js";
import { upload } from "./utils/multer.js";
import multer from "multer";

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
app.put("/profile/update", UserController.updateProfile);
app.put(
  "/profile/image",
  upload.single("file"),
  UserController.updateProfileImage
);

// Module Information
app.get("/banner", UserController.X);
app.get("/services", UserController.X);

// Module Transaction
app.get("/balance", UserController.X);
app.post("/topup", UserController.X);
app.post("/transaction", UserController.X);
app.get("/transaction/history", UserController.X);

// Error Handler
app.use((err, req, res, next) => {
  // handle multer errors
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      status: 102,
      message: err.message,
      data: null,
    });
  }
});

app.listen(port, () => {
  console.log(`Starting app at port ${port}`);
});
