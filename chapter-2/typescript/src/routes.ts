import { Request, Response } from "express";
import CreateCourseService from "./CreateCourseService";

export const createCourse = (request: Request, response: Response) => {
  CreateCourseService.execute({
    name: "nome lalaa",
    duration: 3000,
    educator: "Diego Ramos",
  });

  return response.status(200).json({
    name: "nome lalaa",
    duration: 3000,
    educator: "Diego Ramos",
  });
};
