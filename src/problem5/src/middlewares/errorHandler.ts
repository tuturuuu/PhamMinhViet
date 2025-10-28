import type { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";

interface ErrorWithStatus extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log error details to file (Winston handles both console and file)
  logger.error(`${req.method} ${req.originalUrl} - ${statusCode} - ${message}`);
  if (err.stack) logger.error(err.stack);

  // Send JSON error response
  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export default errorHandler;
