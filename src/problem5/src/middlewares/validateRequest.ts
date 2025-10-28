import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

export const validateRequest = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    // Attach parsed data to req.body (type-safe)
    req.body = result.data;
    next();
  };
};

export default validateRequest;
