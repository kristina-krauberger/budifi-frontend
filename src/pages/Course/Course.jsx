import { useEffect } from "react";
import LessonCard from "../../components/LessonCard/LessonCard";
import { useParams } from "react-router";

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

  return (
    <>
      {course && (
        <div className="main-content">
          <h1 className="mb-10 text-2xl font-semibold tracking-tight text-heading leading-8 text-left">
            {course.title}
          </h1>
          {course.lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              to={`/course/${courseId}/lesson/${lesson.id}`}
              title={lesson.title}
              duration={lesson.duration}
              isCompleted={lesson.isCompleted}
              isLast={lesson.isLast}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Course;
