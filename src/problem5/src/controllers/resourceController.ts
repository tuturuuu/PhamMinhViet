import type { Request, Response, NextFunction } from "express";
import { initDB } from "../config/db.js";
import { ResourceModel } from "../models/resourceModel.js";

export const getAllResources = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const db = await initDB();
    const { q } = req.query;
    const resources = await ResourceModel.findAll(db, q as string);
    res.json({ success: true, data: resources });
  } catch (err) {
    next(err);
  }
};

export const getResourceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const db = await initDB();
    const resource = await ResourceModel.findById(db, Number(req.params.id));
    if (!resource)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: resource });
  } catch (err) {
    next(err);
  }
};

export const createResource = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const db = await initDB();
    const newResource = await ResourceModel.create(db, req.body);
    res.status(201).json({ success: true, data: newResource });
  } catch (err) {
    next(err);
  }
};

export const updateResource = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const db = await initDB();
    const updated = await ResourceModel.update(
      db,
      Number(req.params.id),
      req.body
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteResource = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const db = await initDB();
    await ResourceModel.remove(db, Number(req.params.id));
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
