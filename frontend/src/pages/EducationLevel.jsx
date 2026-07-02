import { useNavigate } from "react-router-dom";

export default function EducationLevel() {
  const navigate = useNavigate();

  const levels = [
    {
      id: 1,
      title: "After 10th",
      icon: "🎒",
      description: "Choose the best stream after completing Class 10.",
    },
    {
      id: 2,
      title: "After Plus Two (+2)",
      icon: "📚",
      description: "Find the perfect degree based on your stream.",
    },
    {
      id: 3,
      title: "After Degree",
      icon: "🎓",
      description: "Explore careers, higher studies, and certifications.",
    },
  ];

  const handleSelect = (levelTitle) => {
    navigate("/stream", {
      state: { educationLevel: levelTitle },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="mx-auto max-w-3xl text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Choose Your Education Level
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Select where you are in your education journey. We'll personalize your career guidance.
        </p>
      </div>

      {/* Education Grid */}
      <div className="mx-auto max-w-5xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {levels.map((level) => (
          <div
            key={level.id}
            onClick={() => handleSelect(level.title)}
            className="group relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
          >
            <div>
              {/* Icon */}
              <div className="text-4xl mb-4 inline-block p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                {level.icon}
              </div>

              {/* Title & Description */}
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {level.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {level.description}
              </p>
            </div>

            {/* Button */}
            <button className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 text-sm">
              Continue 
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}