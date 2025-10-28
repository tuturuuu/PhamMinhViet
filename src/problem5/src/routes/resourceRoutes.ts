import { Router } from "express";
import {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
} from "../controllers/resourceController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  createResourceSchema,
  updateResourceSchema,
} from "../schemas/resourceSchema.js";

const router = Router();

router.get("/", getAllResources);
router.get("/:id", getResourceById);
router.post("/", validateRequest(createResourceSchema), createResource);
router.put("/:id", validateRequest(updateResourceSchema), updateResource);
router.delete("/:id", deleteResource);

export default router;
