import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Degree() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [degrees, setDegrees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const streamId = searchParams.get('streamId');
    const endpoint = streamId 
      ? `http://localhost:8000/api/degrees/?stream_id=${streamId}` 
      : `http://localhost:8000/api/degrees/`;
      
    axios.get(endpoint)
      .then(res => {
        setDegrees(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [searchParams]);

  const streamName = searchParams.get('streamName');
  const title = streamName ? `Degrees in ${streamName}` : "Select Your Degree";
  const subtitle = streamName ? "Based on your Stream, select your path." : "Which degree are you pursuing?";

  if (loading) return <div className="loader">Loading degrees...</div>;

  const filteredDegrees = degrees.filter(deg => 
    deg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fade-in">
      <h2 style={{ textAlign: "center" }}>{title}</h2>
      <p className="subtitle" style={{ textAlign: "center" }}>{subtitle}</p>
      
      <input 
        type="text" 
        className="search-input" 
        placeholder="Type to search degrees..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div className="list-container">
        {filteredDegrees.length === 0 ? (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>No degrees found matching "{searchTerm}".</p>
        ) : filteredDegrees.map(deg => (
          <div key={deg.id} className="list-card" onClick={() => navigate(`/domain/${deg.id}?degreeName=${encodeURIComponent(deg.name)}`)}>
            <h3>{deg.name}</h3>
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
