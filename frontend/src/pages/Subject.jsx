import { useLocation, useNavigate } from "react-router-dom";

export default function Subject() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const educationLevel = state?.educationLevel;
  const stream = state?.stream;

  const subjects = {
    Science: [
      {
        name: "Biology",
        icon: "🧬",
        desc: "Medical & Life Sciences",
      },
      {
        name: "Computer Science",
        icon: "💻",
        desc: "Programming & Software Development",
      },
      {
        name: "Mathematics",
        icon: "📐",
        desc: "Engineering & Data Science",
      },
      {
        name: "Physics",
        icon: "⚛️",
        desc: "Research & Engineering",
      },
      {
        name: "Chemistry",
        icon: "🧪",
        desc: "Pharmacy & Chemical Engineering",
      },
    ],

    Commerce: [
      {
        name: "Accountancy",
        icon: "📊",
        desc: "Accounting & Finance",
      },
      {
        name: "Business Studies",
        icon: "💼",
        desc: "Business Management",
      },
      {
        name: "Economics",
        icon: "📈",
        desc: "Economics & Analytics",
      },
    ],

    Humanities: [
      {
        name: "History",
        icon: "🏛️",
        desc: "History & Archaeology",
      },
      {
        name: "Geography",
        icon: "🌍",
        desc: "Geography & GIS",
      },
      {
        name: "Political Science",
        icon: "⚖️",
        desc: "Law & Civil Services",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="text-center mb-12">

          <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
            AI Career Mentor
          </span>

          <h1 className="text-5xl font-bold mt-6">
            Choose Your Subject
          </h1>

          <p className="text-lg text-gray-600 mt-4">
            <span className="font-semibold">
              {educationLevel}
            </span>
            {" • "}
            <span className="text-indigo-600 font-semibold">
              {stream}
            </span>
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {subjects[stream]?.map((subject) => (

            <div
              key={subject.name}
              onClick={() =>
                navigate("/degree", {
                  state: {
                    educationLevel,
                    stream,
                    subject: subject.name,
                  },
                })
              }
              className="cursor-pointer bg-white rounded-3xl p-8 shadow hover:shadow-xl transition hover:-translate-y-2"
            >

              <div className="text-6xl mb-5">
                {subject.icon}
              </div>

              <h2 className="text-2xl font-bold mb-3">
                {subject.name}
              </h2>

              <p className="text-gray-600 mb-6">
                {subject.desc}
              </p>

              <button className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition">
                Continue →
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}