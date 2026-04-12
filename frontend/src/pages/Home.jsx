import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="fade-in">
      <div className="hero-section">
        <div className="hero-badge">✨ AI-Powered Career Guidance</div>

        <h2 className="hero-title">
          Confused About<br />
          <span className="hero-highlight">Your Career?</span>
        </h2>

        <p className="hero-subtitle">
          Tell us where you are in your education journey, and we'll show you 
          the best career paths with a clear step-by-step roadmap to get there.
        </p>

        <p className="hero-question">Where are you right now?</p>

        <div className="hero-actions">
          <button className="primary-btn hero-btn" onClick={() => navigate('/stream')}>
            🎓 I'm in 12th Grade
          </button>
          <button className="primary-btn glass-btn hero-btn" onClick={() => navigate('/degree')} style={{ margin: 0 }}>
            📚 I'm in College
          </button>
        </div>
      </div>

      <div className="how-it-works">
        <h3 className="section-title">How It Works</h3>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h4>Pick Your Stage</h4>
            <p>Tell us if you're in 12th grade or college</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h4>Choose a Career</h4>
            <p>Browse career domains that match your degree</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h4>Get Your Roadmap</h4>
            <p>See the exact skills and steps to land that job</p>
          </div>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🧭</div>
          <h3 className="feature-title">Personalized for You</h3>
          <p className="feature-desc">
            Roadmaps tailored to your specific degree and education level.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3 className="feature-title">Only What Matters</h3>
          <p className="feature-desc">
            No fluff — just the exact skills employers actually look for.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h3 className="feature-title">Clear Step-by-Step Path</h3>
          <p className="feature-desc">
            From beginner to job-ready, follow a simple timeline you can actually stick to.
          </p>
        </div>
      </div>
    </div>
  );
}
