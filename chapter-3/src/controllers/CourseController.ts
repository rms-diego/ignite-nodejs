import { Request, Response } from "express";

import { CreateCourseService } from "../service/CreateCourseService";

class CourseController {
  static createCourse(request: Request, response: Response) {
    CreateCourseService.execute({
      name: "NodeJs",
      duration: 10,
      educator: "Diego Ramos",
    });

    return response.status(200).send();
  }
}

export { CourseController };
