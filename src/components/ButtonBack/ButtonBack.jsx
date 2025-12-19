import { useNavigate } from "react-router";

function ButtonBack() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="mb-6 inline-flex mr-7 self-start items-center justify-center w-10 h-10 rounded-full bg-neutral-200 hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 text-gray-700"
      aria-label="Zurück"
    >
      ←
    </button>
  );
}

export default ButtonBack;
