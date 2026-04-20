// Main router for handling API routes, including authentication and authorization for protected endpoints
import express from "express";
import type { Request, Response } from "express";
import  { Router, } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { Role } from "../constants/roles.js";

const router = Router();

// Public route accessible to everyone
router.get("/profile", authenticate, (req: Request, res: Response) => {
  res.status(200).json({
    message: "Profile fetched successfully",
    user: req.user,
  });
});

router.post(
  "/content",
  authenticate,
  authorize([Role.ADMIN, Role.EDITOR]),
  (req: Request, res: Response) => {
    res.status(200).json({
      message: "Content created successfully",
    });
  }
);

router.delete(
  "/system",
  authenticate,
  authorize([Role.ADMIN]),
  (req: Request, res: Response) => {
    res.status(200).json({
      message: "System deleted successfully",
    });
  }
);

export default router;