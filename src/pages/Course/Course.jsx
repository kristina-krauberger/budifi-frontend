import { useEffect } from "react";
import LessonCard from "../../components/LessonCard/LessonCard";
import { useParams } from "react-router";
import ButtonDashboard from "../../components/ButtonDashboard/ButtonDashboard";
import NotFound from "../NotFound/NotFound";

/**
 * allCourses          = wrapper object from backend API
 * allCourses.courses  = full list (array) of all courses
 * course               = currently selected course (based on URL param)
 *
 * allCourses.courses is used to FIND a course
 * course is used to RENDER lessons
 */

// TODO: delete all console.logs

function Course({ course, allCourses, setCourse, userProgress }) {
  // Get the course id from URL parameter (e.g., /course/:id)
  const { courseId } = useParams();

  console.log(`courseId ${courseId}`);

  useEffect(() => {
    if (courseId && allCourses?.courses?.length > 0) {
      const foundCourse = allCourses.courses.find(
        (c) => c.course_number === parseInt(courseId),
      );
      setCourse(foundCourse);
    }
  }, [courseId, allCourses]);

  if (!course) {
    return <NotFound />;
  }

  return (
    <>
      {course && (
        <div className="main-content text-left">
          <div className="flex items-center min-h-[60px] gap-x-6 mb-10">
            <ButtonDashboard />
            <h1 className="text-2xl font-semibold tracking-tight text-heading leading-8">
              {course.title}{" "}
            </h1>
          </div>
          {course.lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              to={`/course/${courseId}/lesson/${lesson.id}`}
              title={lesson.title}
              duration={lesson.duration}
              isCompleted={lesson.isCompleted}
              isLastLesson={lesson.isLastLesson}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Course;
