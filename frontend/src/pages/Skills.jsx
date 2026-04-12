import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Skills() {
  const { domainId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [allSkills, setAllSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const domainName = searchParams.get('domainName') || "this domain";

  useEffect(() => {
    axios.get(`http://localhost:8000/api/skills/`)
      .then(res => {
        setAllSkills(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const toggleSkill = (id) => {
    const nextList = new Set(selectedSkills);
    if (nextList.has(id)) {
      nextList.delete(id);
    } else {
      nextList.add(id);
    }
    setSelectedSkills(nextList);
  };

  const submitSkills = () => {
    navigate('/result', {
      state: {
        domainId,
        userSkills: Array.from(selectedSkills)
      }
    });
  };

  if (loading) return <div className="loader">Loading skills...</div>;

  return (
    <div className="fade-in">
      <h2>Select Your Skills</h2>
      <p className="subtitle">Which of these skills do you already possess for {domainName}?</p>
      
      <div className="tags-container" style={{maxWidth: 700, margin: '0 auto 2rem'}}>
        {allSkills.map(skill => (
          <div 
            key={skill.id} 
            className={`tag-selectable \${selectedSkills.has(skill.id) ? 'selected' : ''}`}
            onClick={() => toggleSkill(skill.id)}
          >
            <span className="tag-icon"></span>
            {skill.name}
          </div>
        ))}
      </div>
      
      <div className="actions" style={{justifyContent: 'center', gap: '1rem'}}>
        <button className="primary-btn glass-btn" onClick={() => navigate(-1)} style={{width: 'auto', marginBottom: 0}}>← Back</button>
        <button className="primary-btn" onClick={submitSkills}>Calculate Readiness →</button>
      </div>
    </div>
  );
}
