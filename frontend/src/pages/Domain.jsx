import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Domain() {
  const { degreeId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [domains, setDomains] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const degreeName = searchParams.get('degreeName') || "your degree";

  useEffect(() => {
    axios.get(`http://localhost:8000/api/domains/?degree_id=${degreeId}`)
      .then(res => {
        setDomains(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [degreeId]);

  if (loading) return <div className="loader">Loading domains...</div>;

  const filteredDomains = domains.filter(dom => 
    dom.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fade-in">
      <h2 style={{ textAlign: "center" }}>Choose Your Domain</h2>
      <p className="subtitle" style={{ textAlign: "center" }}>Specializations for {degreeName}.</p>
      
      <input 
        type="text" 
        className="search-input" 
        placeholder="Search domains (e.g., Data Science)..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div className="list-container">
        {filteredDomains.length === 0 ? (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>No domains found matching "{searchTerm}".</p>
        ) : filteredDomains.map(dom => (
          <div key={dom.id} className="list-card" onClick={() => navigate(`/skills/${dom.id}?domainName=${encodeURIComponent(dom.name)}`)}>
            <h3>{dom.name}</h3>
            <span>Select →</span>
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      </div>
    </div>
  );
}
