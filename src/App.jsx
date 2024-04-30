import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "react-query"; - THIS WILL BE SET UP ONCE THE API IS FINISHED
import { QuizProvider } from "./context/QuizContext";
import Dashboard from "./features/dashboard/Dashboard";
import QuizEditor from "./features/quiz/QuizEditor";
import QuizViewer from "./features/quiz/QuizViewer";

function App() {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/edit/:quizId" element={<QuizEditor />} />
          <Route path="/view/:quizId" element={<QuizViewer />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;
