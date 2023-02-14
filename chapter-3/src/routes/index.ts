import { Router } from "express";
import { CourseController } from "../controllers/CourseController";

const routes = Router();

routes.get("/", (request, response) =>
  response.json({ message: "hello world !" })
);

routes.get("/course/create", CourseController.createCourse);

export { routes };
