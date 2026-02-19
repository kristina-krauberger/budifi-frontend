import { Link } from "react-router";

export default function CourseCard({
  to,
  title,
  lessons,
  progress,
  cardColor,
}) {
  return (
    <Link
      to={to}
      className={`relative block max-w-sm p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${cardColor}`}
    >
      <h5 className="mb-4 text-3xl font-extrabold tracking-tight leading-tight">
        {title}
      </h5>
      <p className="text-sm text-white/80">{lessons} Lektionen</p>
      <div className="mt-6">
        <div className="flex justify-between text-sm font-medium text-white/80 mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/30">
          <div
            className="h-2 rounded-full bg-[#E1F563] transition-all duration-500"
            style={{ width: progress + "%" }}
          />
        </div>
      </div>
    </Link>
  );
}
