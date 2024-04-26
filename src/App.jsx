import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./features/Dashboard";
import QuizEditor from "./features/QuizEditor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit/:quizId" element={<QuizEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
