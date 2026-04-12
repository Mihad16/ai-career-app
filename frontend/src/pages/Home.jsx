import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="fade-in">
      <div className="hero-section">
        <h2 className="hero-title">
          Don't Just Choose a Degree.<br />
          <span className="hero-highlight">Choose Your Future.</span>
        </h2>
        <p className="hero-subtitle">
          Stop guessing. Tell us your current educational stage, pick your dream domain, and let us generate an industry-backed, step-by-step roadmap to get you hired.
        </p>
        
        <div className="hero-actions">
          <button className="primary-btn hero-btn" onClick={() => navigate('/stream')}>
            I am After +2
          </button>
          <button className="primary-btn glass-btn hero-btn" onClick={() => navigate('/degree')} style={{ margin: 0 }}>
            I am Doing Degree
          </button>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <button className="back-btn" onClick={() => navigate('/quiz')} style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>
            ✨ Recommend a path for me
          </button>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🧭</div>
          <h3 className="feature-title">Degree-Specific Paths</h3>
          <p className="feature-desc">
            We adapt our roadmaps based on what you are currently studying, ensuring relevance at every stage.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3 className="feature-title">Targeted Topics</h3>
          <p className="feature-desc">
            Cut the noise. We only show you the exact required skills and topics you need to master.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h3 className="feature-title">Step-by-step Action</h3>
          <p className="feature-desc">
            From basic syntax to portfolio building, follow a professionally curated chronological timeline.
          </p>
        </div>
      </div>
    </div>
  );
}
