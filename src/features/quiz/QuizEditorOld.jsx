import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { useMoveBack } from "../hooks/useMoveback";
import { generateUniqueId } from "../utils/helpers";

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

  const handleSave = () => {
    if (!title.trim() || questions.length === 0) {
      alert("Title and at least one question are required!");
      return;
    }

    // Check if all questions and answers are filled
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
  };

  const handleQuestionChange = (text, id) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, text } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (answer, id) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, answer } : q
    );
    setQuestions(updatedQuestions);
  };

  const addQuestion = (number = 1) => {
    const newQuestions = [
      ...questions,
      ...Array.from({ length: number }, () => ({
        id: generateUniqueId(),
        text: "",
        answer: "",
      })),
    ];
    setQuestions(newQuestions);
  };

  const deleteQuestion = (id) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
  };

  const toggleQuizSelection = (quizId) => {
    if (selectedQuizIdForRecycling === quizId) {
      setSelectedQuizIdForRecycling(null); // Toggle off if the same quiz is clicked
    } else {
      setSelectedQuizIdForRecycling(quizId);
    }
  };

  const recycleQuestion = (question) => {
    setQuestions([...questions, { ...question, id: generateUniqueId() }]);
  };

  return (
    <div className="min-h-screen min-w-full bg-slate-50 font-sans">
      <div className="container mx-auto p-4 w-full sm:w-1/2">
        <h1 className="text-2xl font-bold mb-8 mt-8 text-slate-700">
          {quizId === "new" ? "Create A New Quiz" : `Edit Quiz - ${title}`}
        </h1>
        <div className="bg-blue-100 text-blue-400 p-3 rounded mt-4 mb-4 font-medium">
          <p>Tip: A typical quiz consists of 15-25 questions.</p>
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
          />
        </div>
        {questions.map((question, index) => (
          <div key={question.id} className="mt-4 mb-8">
            <label className="block text-sm font-medium text-gray-700">
              Question {index + 1}
            </label>
            <input
              type="text"
              value={question.text}
              onChange={(e) =>
                handleQuestionChange(e.target.value, question.id)
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
            />
            <label className="block text-sm font-medium text-gray-700">
              Answer {index + 1}
            </label>
            <input
              type="text"
              value={question.answer}
              onChange={(e) => handleAnswerChange(e.target.value, question.id)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
            />
            <button
              onClick={() => deleteQuestion(question.id)}
              className="mt-2 bg-red-200 hover:bg-red-300 text-red-800 hover:text-red-900 font-bold py-1 px-2 rounded"
            >
              Delete Question
            </button>
          </div>
        ))}
        <button
          onClick={() => addQuestion()}
          className="mt-4 bg-green-200 hover:bg-green-300 text-green-800 hover:text-green-900 font-bold mx-1 py-2 px-4 rounded"
        >
          Add Question
        </button>
        <button
          onClick={() => addQuestion(10)}
          className="mt-4 bg-green-200 hover:bg-green-300 text-green-800 hover:text-green-900 font-bold mx-1 py-2 px-4 rounded"
        >
          Add 10 Questions
        </button>
        <button
          onClick={() => addQuestion(15)}
          className="mt-4 bg-green-200 hover:bg-green-300 text-green-800 hover:text-green-900 font-bold mx-1 py-2 px-4 rounded"
        >
          Add 15 Questions
        </button>
        <div className="mt-4">
          <h2 className="text-lg font-bold mt-12 mb-2 text-slate-700">
            Recycle Questions
          </h2>
          {allQuizzes.filter((q) => q.id !== quizId).length > 0 ? (
            <div>
              {allQuizzes
                .filter((q) => q.id !== quizId)
                .map((quiz) => (
                  <button
                    key={quiz.id}
                    onClick={() => toggleQuizSelection(quiz.id)}
                    className="bg-green-200 hover:bg-green-300 text-green-800 hover:text-green-900 font-bold py-1 px-2 rounded m-2"
                  >
                    {" "}
                    {quiz.title}{" "}
                  </button>
                ))}
            </div>
          ) : (
            <p className="bg-yellow-100 text-yellow-600 p-2 rounded font-medium">
              There are currently no previous quizzes to recycle from.
            </p>
          )}
          {selectedQuizIdForRecycling &&
            allQuizzes
              .find((q) => q.id === selectedQuizIdForRecycling)
              ?.questions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => recycleQuestion(question)}
                  className="bg-gray-200 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded mr-2 mt-2"
                >
                  Add &quot;{question.text.slice(0, 30)}...&quot;
                </button>
              ))}
        </div>
        <button
          onClick={handleSave}
          className="mt-12 bg-blue-200 hover:bg-blue-300 text-blue-500 hover:text-blue-900 font-bold py-2 px-4 mx-1 rounded"
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
