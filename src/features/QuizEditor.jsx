import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import QuizForm from "./QuizForm";
import { useMoveBack } from "../hooks/useMoveback";
import { generateUniqueId } from "../utils/helpers";
import RecycleQuestions from "./RecycleQuestions";

function QuizEditor() {
  const { quizId } = useParams();
  const { addQuiz, updateQuiz, quizzes, allQuizzes } = useQuiz();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedQuizIdForRecycling, setSelectedQuizIdForRecycling] =
    useState(null);

  useEffect(() => {
    if (quizId === "new") {
      setQuestions([{ id: generateUniqueId(), text: "", answer: "" }]);
    } else {
      const existingQuiz = quizzes.find((q) => q.id === quizId);
      if (existingQuiz) {
        setTitle(existingQuiz.title);
        setQuestions(existingQuiz.questions || []);
      }
    }
  }, [quizId, quizzes]);

  const moveBack = useMoveBack();

  const handleSave = useCallback(() => {
    if (!title.trim() || questions.length === 0) {
      alert("Title and at least one question are required!");
      return;
    }
    if (questions.some((q) => !q.text.trim() || !q.answer.trim())) {
      alert("All questions and answers must be filled out!");
      return;
    }

    const quizData = {
      id: quizId === "new" ? generateUniqueId() : quizId,
      title,
      questions,
      isActive: true,
    };

    if (quizId === "new") {
      addQuiz(quizData);
    } else {
      updateQuiz(quizData);
    }
    navigate("/");
  }, [title, questions, addQuiz, updateQuiz, quizId, navigate]);

  const handleQuestionChange = useCallback(
    (text, id) => {
      const updatedQuestions = questions.map((q) =>
        q.id === id ? { ...q, text: text } : q
      );
      setQuestions(updatedQuestions);
    },
    [questions]
  );

  const handleAnswerChange = useCallback(
    (answer, id) => {
      const updatedQuestions = questions.map((q) =>
        q.id === id ? { ...q, answer: answer } : q
      );
      setQuestions(updatedQuestions);
    },
    [questions]
  );

  const addQuestion = useCallback(
    (number = 1) => {
      const newQuestions = [
        ...questions,
        ...Array.from({ length: number }, () => ({
          id: generateUniqueId(),
          text: "",
          answer: "",
        })),
      ];
      setQuestions(newQuestions);
    },
    [questions]
  );

  const deleteQuestion = useCallback(
    (id) => {
      setQuestions(questions.filter((q) => q.id !== id));
    },
    [questions]
  );

  const toggleQuizSelection = (quizId) => {
    setSelectedQuizIdForRecycling(
      selectedQuizIdForRecycling === quizId ? null : quizId
    );
  };

  const recycleQuestion = (question) => {
    setQuestions([...questions, { ...question, id: generateUniqueId() }]);
  };

  return (
    <div className="min-h-screen min-w-full bg-slate-50 font-sans">
      <div className="container mx-auto p-4 w-full sm:w-1/2">
        <h1 className="text-2xl font-bold mb-8 mt-8 text-slate-700">
          {quizId === "new" ? "Create A New Quiz" : "Edit Quiz"}
        </h1>
        <div className="bg-blue-100 text-blue-400 p-3 rounded mt-4 mb-4 font-medium">
          <p>Tip: A typical quiz consists of 15-25 questions.</p>
        </div>
        <QuizForm
          title={title}
          onTitleChange={(e) => setTitle(e.target.value)}
          questions={questions}
          onQuestionChange={handleQuestionChange}
          onAnswerChange={handleAnswerChange}
          onDeleteQuestion={deleteQuestion}
          onAddQuestion={addQuestion}
        />
        <RecycleQuestions
          allQuizzes={allQuizzes}
          quizId={quizId}
          selectedQuizIdForRecycling={selectedQuizIdForRecycling}
          toggleQuizSelection={toggleQuizSelection}
          recycleQuestion={recycleQuestion}
        />
        <button
          onClick={handleSave}
          className="mt-12 bg-blue-200 hover:bg-blue-300 text-blue-800 hover:text-blue-900 font-bold py-2 px-4 mx-1 rounded"
        >
          Save Quiz
        </button>
        <button
          onClick={moveBack}
          className="mt-4 bg-red-200 hover:bg-red-300 text-red-800 hover:text-red-900 font-bold py-2 px-4 mx-1 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default QuizEditor;
