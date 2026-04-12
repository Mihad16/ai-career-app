import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { domainId, userSkills } = location.state || {};

  useEffect(() => {
    if (!domainId) {
      navigate('/');
      return;
    }

    axios.post(`http://localhost:8000/api/evaluate/`, {
      domain_id: domainId,
      user_skills: userSkills || []
    })
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to evaluate profile.");
        setLoading(false);
      });
  }, [domainId, userSkills, navigate]);

  if (loading) return <div className="loader">Analyzing your profile...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!data) return null;

  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Outcome: {data.domain}</h2>
      
      <div className="stats-container" style={{ margin: '1.5rem 0' }}>
        <div className="stat-card">
          <h3>Career Readiness Score</h3>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `\${data.readiness}%` }}></div>
          </div>
          <p className="readiness-text">{data.readiness}% Ready</p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.5rem" }}>
            You are {data.readiness}% ready to become a {data.job_roles}.
          </p>
        </div>

        <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>Future Outcome</h3>
          <p style={{ margin: "0.5rem 0" }}><strong>Possible Roles:</strong> <span style={{ color: "var(--accent-primary)" }}>{data.job_roles}</span></p>
          <p style={{ margin: "0.5rem 0" }}><strong>Avg. Salary:</strong> <span style={{ color: "var(--success)" }}>{data.average_salary}</span></p>
          <p style={{ margin: "0.5rem 0" }}><strong>Growth:</strong> <span style={{ color: "#fbbf24" }}>{data.career_growth}</span></p>
        </div>
      </div>

      <div className="stat-card" style={{ margin: '1.5rem 0' }}>
          <h3>Actionable Skill Gaps 🎯</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {data.missing_skills.length === 0 ? (
              <span className="success-text">You have all the required base skills to start applying!</span>
            ) : (
              data.missing_skills.map(ms => (
                <div key={ms.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fca5a5' }}>{ms.name}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {ms.youtube_link && (
                      <a href={ms.youtube_link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', background: '#ef4444', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 'bold' }}>YouTube</a>
                    )}
                    {ms.coursera_link && (
                      <a href={ms.coursera_link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', background: '#3b82f6', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 'bold' }}>Coursera</a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
      </div>

      <h3 className="roadmap-title">Step-by-Step Action Plan</h3>
      <div className="timeline">
        {data.roadmap.map(step => (
          <div key={step.id} className="timeline-item">
            <div className="timeline-marker">{step.step_number}</div>
            <div className="timeline-content">
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", margin: "3rem 0" }}>
        <button className="primary-btn" style={{ fontSize: "1.2rem", padding: "1rem 3rem" }}>Start Learning 🚀</button>
        <br/><br/>
        <button className="primary-btn glass-btn" onClick={() => navigate('/')} style={{ width: 'auto' }}>Start Over</button>
      </div>
    </div>
  );
}
