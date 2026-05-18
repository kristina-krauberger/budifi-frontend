import { Link } from "react-router";

/**
 * CourseCard — light neutral card with a single brand accent.
 * Consistent across all cards: one color, stronger typography, calm premium feel.
 */
export default function CourseCard({
  to,
  title,
  lessons,
  progress,
}) {
  const BRAND = "#0EB689";

  return (
    <Link
      to={to}
      className="relative block bg-white border border-gray-100 rounded-2xl shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 group overflow-hidden"
    >
      {/* Single brand accent stripe */}
      <div className="w-full h-1 rounded-t-2xl" style={{ backgroundColor: BRAND }} />

      <div className="p-6">
        <h5 className="mb-1 text-2xl font-extrabold text-gray-800 tracking-tight leading-snug group-hover:text-[#0EB689] transition-colors duration-200">
          {title}
        </h5>
        <p className="text-sm text-gray-400 font-medium mb-6">{lessons} Lektionen</p>

        <div>
          <div className="flex justify-between text-xs font-semibold text-gray-400 mb-2">
            <span>Fortschritt</span>
            <span style={{ color: BRAND }}>{progress}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-gray-100">
            <div
              className="h-1.5 rounded-full transition-all duration-500"
              style={{ width: progress + "%", backgroundColor: BRAND }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
