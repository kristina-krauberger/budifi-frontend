import { useEffect } from "react";
import LessonCard from "../../components/LessonCard/LessonCard";
import { useParams } from "react-router";
import ButtonDashboard from "../../components/ButtonDashboard/ButtonDashboard";
import NotFound from "../NotFound/NotFound";

/**
 * coursesData          = wrapper object from mock JSON
 * coursesData.courses  = full list (array) of all courses
 * course               = currently selected course (based on URL param)
 *
 * coursesData.courses is used to FIND a course
 * course is used to RENDER lessons
 */

// TODO: delete all console.logs

function Course({ course, coursesData, setCourse }) {
  // Get the course id from URL parameter (e.g., /course/:id)
  const { courseId } = useParams();

  console.log(`courseId ${courseId}`);

  useEffect(() => {
    if (courseId) {
      // `id` comes from the URL as a string (e.g. "2"), so we convert it to a number
      // to safely use it as an index for our mock data array
      setCourse(coursesData.courses[parseInt(courseId) - 1]);
    }
  }, [courseId]);

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
