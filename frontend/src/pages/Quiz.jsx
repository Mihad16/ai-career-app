import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    likes_coding: false,
    likes_business: false,
    likes_creativity: false,
  });
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  const handleAnswer = (key, value) => {
    setAnswers({ ...answers, [key]: value });
    if (step < 3) {
      setStep(step + 1);
    } else {
      submitQuiz({ ...answers, [key]: value });
    }
  };

  const submitQuiz = (finalAnswers) => {
    setLoading(true);
    axios.post(`http://localhost:8000/api/recommend/`, finalAnswers)
      .then(res => {
        setRecommendations(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  if (loading) return <div className="loader">Analyzing your profile...</div>;

  if (recommendations) {
    return (
      <div className="fade-in">
        <h2>Your AI Recommendations</h2>
        <p className="subtitle">Based on your interests, we strongly suggest these paths.</p>
        <div className="list-container">
          {recommendations.length === 0 ? <p>No exact matches found.</p> : recommendations.map(dom => (
            <div key={dom.id} className="list-card" onClick={() => navigate(`/skills/${dom.id}?domainName=${encodeURIComponent(dom.name)}`)}>
              <h3>{dom.name}</h3>
              <span>Select →</span>
            </div>
          ))}
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>← Start Over</button>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Career Recommendation Finder</h2>
      <p className="subtitle">Question {step} of 3</p>
      
      <div className="stat-card" style={{ textAlign: "center", padding: "3rem 1rem" }}>
        {step === 1 && (
          <>
            <h3 style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "2rem" }}>Do you enjoy logic, mathematics, and breaking down systems?</h3>
            <div className="hero-actions">
              <button className="primary-btn hero-btn" onClick={() => handleAnswer('likes_coding', true)}>Yes, I love that</button>
              <button className="primary-btn glass-btn hero-btn" onClick={() => handleAnswer('likes_coding', false)}>Not really</button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h3 style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "2rem" }}>Do you want to run operations, manage money, or lead sales teams?</h3>
            <div className="hero-actions">
              <button className="primary-btn hero-btn" onClick={() => handleAnswer('likes_business', true)}>Absolutely</button>
              <button className="primary-btn glass-btn hero-btn" onClick={() => handleAnswer('likes_business', false)}>No thanks</button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h3 style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "2rem" }}>Are you highly creative and enjoy designing or writing stories?</h3>
            <div className="hero-actions">
              <button className="primary-btn hero-btn" onClick={() => handleAnswer('likes_creativity', true)}>Yes, very much</button>
              <button className="primary-btn glass-btn hero-btn" onClick={() => handleAnswer('likes_creativity', false)}>Not my strength</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
