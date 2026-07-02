import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Stream from "./pages/Stream";
import Degree from "./pages/Degree";
import Domain from "./pages/Domain";
import Skills from "./pages/Skills";
import Result from "./pages/Result";
import EducationLevel from "./pages/EducationLevel";
import Subject from "./pages/Subject";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <h1>Career Compass</h1>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stream" element={<Stream />} />
            <Route path="/degree" element={<Degree />} />
            <Route path="/domain/:degreeId" element={<Domain />} />
            <Route path="/skills/:domainId" element={<Skills />} />
            <Route path="/result" element={<Result />} />
            <Route path="/education-level" element={<EducationLevel />} />
            <Route path="/subject" element={<Subject />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}