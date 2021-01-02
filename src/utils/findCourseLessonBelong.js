export default function findCourseLessonBelong(courseList, lessonId) {
  return courseList.find((course) => {
    // Extract all lessons from the course
    const { content: simplifiedLessonInCourse } = course;
    const numberOfLessons = simplifiedLessonInCourse.length;
    // Loop through all lessons in the course
    for (let i = 0; i < numberOfLessons; i++) {
      // If the lesson is in the course, break from the loop ans return true,
      // which will indicate for find() that this course has the lesson
      if (simplifiedLessonInCourse[i].id === lessonId) return true;
    }

    return false;
  });
}
