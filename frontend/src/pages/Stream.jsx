import { useLocation, useNavigate } from "react-router-dom";

export default function Stream() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const educationLevel = state?.educationLevel || "After Plus Two (+2)";

  const streams = {
    "After 10th": [
      {
        name: "Science",
        icon: "🧪",
        desc: "Engineering, Medical, Research & Technology",
      },
      {
        name: "Commerce",
        icon: "💼",
        desc: "Business, Accounting & Finance",
      },
      {
        name: "Humanities",
        icon: "📚",
        desc: "Arts, Law, Journalism & UPSC",
      },
      {
        name: "Diploma",
        icon: "🛠️",
        desc: "Polytechnic & Technical Courses",
      },
      {
        name: "ITI",
        icon: "⚙️",
        desc: "Industrial Training Institute",
      },
    ],

    "After Plus Two (+2)": [
      {
        name: "Science",
        icon: "🧪",
        desc: "Engineering, Medical, Computer Science",
      },
      {
        name: "Commerce",
        icon: "💼",
        desc: "Business, Finance & Management",
      },
      {
        name: "Humanities",
        icon: "📖",
        desc: "Arts, Social Science & Law",
      },
    ],

    "After Degree": [
      {
        name: "Higher Studies",
        icon: "🎓",
        desc: "Master's, MBA, M.Tech & Research",
      },
      {
        name: "Jobs",
        icon: "💻",
        desc: "Private & Government Careers",
      },
      {
        name: "Certifications",
        icon: "📜",
        desc: "Professional Skill Certifications",
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

          <h1 className="text-5xl font-bold mt-6 text-gray-900">
            Choose Your Stream
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Education Level:
            <span className="font-semibold text-indigo-600">
              {" "}
              {educationLevel}
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {streams[educationLevel]?.map((stream) => (

            <div
              key={stream.name}
              onClick={() =>
                navigate("/subject", {
                  state: {
                    educationLevel,
                    stream: stream.name,
                  },
                })
              }
              className="cursor-pointer bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
            >

              <div className="text-6xl mb-6">
                {stream.icon}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {stream.name}
              </h2>

              <p className="text-gray-600 leading-7 mb-8">
                {stream.desc}
              </p>

              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition">
                Continue →
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}