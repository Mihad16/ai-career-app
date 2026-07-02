import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20 lg:py-32 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold tracking-wide shadow-sm mb-6">
          🤖 AI Powered Career Guidance
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
          Find Your Perfect <br />
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Career Path
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
          Choose your education level and discover the best degrees,
          careers, skills, salaries, and AI-generated roadmaps
          designed just for you.
        </p>

        <button
          className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2 text-lg"
          onClick={() => navigate("/education-level")}
        >
          🚀 Get Started
        </button>
      </section>

      {/* Education Levels */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12">
          Choose Your Education Level
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div
            className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-200 cursor-pointer"
            onClick={() => navigate("/education-level")}
          >
            <div className="text-4xl mb-4 bg-slate-50 w-14 h-14 flex items-center justify-center rounded-xl group-hover:bg-indigo-50 transition-colors">🎒</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">After 10th</h3>
            <p className="text-slate-600 leading-relaxed">
              Find the right stream and build a strong foundation.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-200 cursor-pointer"
            onClick={() => navigate("/education-level")}
          >
            <div className="text-4xl mb-4 bg-slate-50 w-14 h-14 flex items-center justify-center rounded-xl group-hover:bg-indigo-50 transition-colors">📖</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">After Plus Two (+2)</h3>
            <p className="text-slate-600 leading-relaxed">
              Explore the best degrees based on your stream.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-200 cursor-pointer"
            onClick={() => navigate("/education-level")}
          >
            <div className="text-4xl mb-4 bg-slate-50 w-14 h-14 flex items-center justify-center rounded-xl group-hover:bg-indigo-50 transition-colors">🎓</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">After Degree</h3>
            <p className="text-slate-600 leading-relaxed">
              Discover careers, certifications, and higher studies.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-100/70 border-y border-slate-200/50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12">
            Everything You Need
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🧭", title: "Career Guidance", desc: "Discover careers that match your interests." },
              { icon: "🗺", title: "AI Roadmaps", desc: "Step-by-step learning plans created for your goals." },
              { icon: "💰", title: "Salary Insights", desc: "Learn salary ranges and future career growth." },
              { icon: "📚", title: "Learning Resources", desc: "Courses, YouTube videos, and certifications." },
              { icon: "🏢", title: "Top Companies", desc: "Find companies hiring in your chosen field." },
              { icon: "🤖", title: "AI Mentor", desc: "Ask questions and get instant career guidance." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4">
                <div className="text-2xl p-2 bg-slate-50 rounded-lg shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-16">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {[
            { num: "1", title: "Select Education Level", desc: "Choose where you are in your education journey." },
            { num: "2", title: "Choose Your Path", desc: "Select your stream, subject, and degree." },
            { num: "3", title: "Explore Careers", desc: "View career options, salaries, and opportunities." },
            { num: "4", title: "Follow Your Roadmap", desc: "Learn the required skills and become job-ready." }
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center relative group">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-lg shadow-md mb-4 ring-4 ring-indigo-50 group-hover:scale-105 transition-transform">
                {step.num}
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed max-w-[240px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-indigo-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { val: "500+", label: "Career Paths" },
              { val: "300+", label: "Degrees" },
              { val: "1000+", label: "Skills" },
              { val: "24/7", label: "AI Mentor" }
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl md:text-5xl font-extrabold text-indigo-200">{stat.val}</div>
                <div className="text-sm md:text-base text-indigo-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-8 md:p-14 shadow-xl relative overflow-hidden">
          {/* Subtle decorative background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 relative z-10">
            Start Your Career Journey Today
          </h2>
          
          <p className="text-indigo-200 max-w-xl mx-auto mb-8 relative z-10">
            Let AI guide you toward the right education and career path.
          </p>

          <button
            className="px-8 py-3.5 bg-white text-indigo-950 font-bold rounded-xl shadow-md hover:bg-slate-50 transition-colors relative z-10"
            onClick={() => navigate("/education-level")}
          >
            🚀 Start Now
          </button>
        </div>
      </section>
    </div>
  );
}