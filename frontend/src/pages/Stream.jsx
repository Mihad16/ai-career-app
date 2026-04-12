import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Stream() {
  const navigate = useNavigate();
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/streams/`)
      .then(res => {
        setStreams(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loader">Loading streams...</div>;

  return (
    <div className="fade-in">
      <h2>Select Your +2 Stream</h2>
      <p className="subtitle">Which stream did you study in higher secondary?</p>
      
      <div className="list-container">
        {streams.length === 0 ? <p>No streams found.</p> : streams.map(st => (
          <div key={st.id} className="list-card" onClick={() => navigate(`/degree?streamId=${st.id}&streamName=${encodeURIComponent(st.name)}`)}>
            <h3>{st.name}</h3>
            <span>Select →</span>
          </div>
        ))}
      </div>
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
    </div>
  );
}
