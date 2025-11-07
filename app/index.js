import express from "express";
import UserController from "../controllers/UserController.js";
import InformationController from "../controllers/InformationController.js";
import { upload } from "../utils/multer.js";
import multer from "multer";
import TransactionController from "../controllers/TransactionController.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Hello");
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
app.get("/banner", InformationController.showAllBanner);
app.get("/services", InformationController.showServices);

// Module Transaction
app.get("/balance", TransactionController.getBalance);
app.post("/topup", TransactionController.addBalance);
app.post("/transaction", TransactionController.transaction);
app.get("/transaction/history", TransactionController.showRecord);

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

app.listen(PORT, () => {
  console.log(`Starting app at port ${PORT}`);
});
