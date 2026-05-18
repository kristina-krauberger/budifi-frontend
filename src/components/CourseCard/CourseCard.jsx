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
      className={`relative block p-7 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${cardColor}`}
    >
      <h5 className="mb-2 text-3xl font-extrabold tracking-tight leading-tight text-white">
        {title}
      </h5>
      <p className="text-sm text-white/70 mb-6">{lessons} Lektionen</p>

      <div>
        <div className="flex justify-between text-xs font-medium text-white/70 mb-1.5">
          <span>Fortschritt</span>
          <span className="text-white font-semibold">{progress}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/25">
          <div
            className="h-1.5 rounded-full bg-white/80 transition-all duration-500"
            style={{ width: progress + "%" }}
          />
        </div>
      </div>
    </Link>
  );
}
