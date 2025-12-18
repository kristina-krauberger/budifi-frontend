import { Link } from "react-router";


export default function CourseCard({ to, title, lessons, progress }) {
  return (
    <Link to= {to}
      className="block max-w-sm p-6 bg-neutral-100 border border-gray-300 rounded-lg shadow hover:bg-neutral-200"
    >
      <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">
        {title}
      </h5>
      <p className="text-body">Kapitel: {lessons}</p>
      <div className="w-full mt-5 h-4 rounded-full border border-gray-400 bg-neutral-quaternary">
        <div
          className="bg-brand h-4 rounded-full flex items-center justify-center text-white text-xs font-medium"
          style={{ width: progress + "%" }}
        >
          {progress + " %"}
        </div>
      </div>
    </Link>
  );
}
