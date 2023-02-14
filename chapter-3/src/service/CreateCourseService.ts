interface CreateCourseDTO {
  name: string;
  duration?: number;
  educator: string;
}

class CreateCourseService {
  static execute({ name, duration = 8, educator }: CreateCourseDTO) {
    console.log({ name, duration, educator });
  }
}

export { CreateCourseService };
