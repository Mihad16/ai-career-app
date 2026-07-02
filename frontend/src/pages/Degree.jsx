import { useLocation, useNavigate } from "react-router-dom";

export default function Degree() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const educationLevel = state?.educationLevel;
  const stream = state?.stream;
  const subject = state?.subject;

  const degrees = {
    Biology: [
      {
        name: "MBBS",
        icon: "🩺",
        desc: "Doctor & Medical Career",
      },
      {
        name: "BDS",
        icon: "🦷",
        desc: "Dental Surgeon",
      },
      {
        name: "B.Sc Nursing",
        icon: "🏥",
        desc: "Nursing & Healthcare",
      },
      {
        name: "B.Pharm",
        icon: "💊",
        desc: "Pharmacy",
      },
    ],

    "Computer Science": [
      {
        name: "BCA",
        icon: "💻",
        desc: "Bachelor of Computer Applications",
      },
      {
        name: "B.Tech Computer Science",
        icon: "⚙️",
        desc: "Engineering in Computer Science",
      },
      {
        name: "B.Sc Computer Science",
        icon: "🖥️",
        desc: "Computer Science Degree",
      },
    ],

    Mathematics: [
      {
        name: "B.Sc Mathematics",
        icon: "📐",
        desc: "Mathematics Degree",
      },
      {
        name: "B.Stat",
        icon: "📊",
        desc: "Statistics",
      },
    ],

    Accountancy: [
      {
        name: "B.Com",
        icon: "💰",
        desc: "Bachelor of Commerce",
      },
      {
        name: "BBA",
        icon: "📈",
        desc: "Business Administration",
      },
      {
        name: "CA",
        icon: "🧾",
        desc: "Chartered Accountant",
      },
    ],

    "Business Studies": [
      {
        name: "BBA",
        icon: "💼",
        desc: "Business Administration",
      },
      {
        name: "BBM",
        icon: "📊",
        desc: "Business Management",
      },
    ],

    Economics: [
      {
        name: "BA Economics",
        icon: "📉",
        desc: "Economics",
      },
      {
        name: "B.Com",
        icon: "💰",
        desc: "Commerce",
      },
    ],

    History: [
      {
        name: "BA History",
        icon: "🏛️",
        desc: "History Degree",
      },
    ],

    Geography: [
      {
        name: "BA Geography",
        icon: "🌍",
        desc: "Geography",
      },
    ],

    "Political Science": [
      {
        name: "BA Political Science",
        icon: "⚖️",
        desc: "Politics & Public Administration",
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
            Choose Your Degree
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            <span className="font-semibold">{educationLevel}</span>
            {" • "}
            <span className="font-semibold">{stream}</span>
            {" • "}
            <span className="text-indigo-600 font-semibold">
              {subject}
            </span>
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {degrees[subject]?.map((degree) => (

            <div
              key={degree.name}
              onClick={() =>
                navigate("/domain", {
                  state: {
                    educationLevel,
                    stream,
                    subject,
                    degree: degree.name,
                  },
                })
              }
              className="bg-white rounded-3xl shadow hover:shadow-xl p-8 cursor-pointer transition hover:-translate-y-2"
            >

              <div className="text-6xl mb-6">
                {degree.icon}
              </div>

              <h2 className="text-2xl font-bold mb-3">
                {degree.name}
              </h2>

              <p className="text-gray-600 mb-8">
                {degree.desc}
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