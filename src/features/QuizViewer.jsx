import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

function QuizViewer() {
  const { quizId } = useParams();
  const { quizzes } = useQuiz();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const foundQuiz = quizzes.find((q) => q.id === quizId);
    if (foundQuiz) {
      setQuiz(foundQuiz);
    }
  }, [quizId, quizzes]);

  if (!quiz) return <p>Loading...</p>;

  const handleNextQuestion = () => {
    setShowAnswer(false);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowAnswer(false);
    }
  };

  const startOver = () => {
    setCompleted(false);
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen min-w-full bg-green-100 font-sans">
      <div className="text-center w-full max-w-2xl">
        <h1 className="text-green-800 text-center text-2xl font-bold mb-4">
          {quiz.title}
        </h1>
        {completed ? (
          <div className="text-center">
            <p className="text-lg font-bold text-green-900">
              Congrats, you&apos;ve completed the quiz!
            </p>
            <button
              onClick={startOver}
              className="bg-green-700 text-white hover:bg-green-600 hover:text-green-100 font-bold py-2 px-4 rounded mt-4"
            >
              Start Over
            </button>
          </div>
        ) : (
          <div className="p-8 bg-green-50 rounded-lg shadow-lg">
            <p className="text-2xl mb-2 text-green-900 font-bold">
              {quiz.questions[currentQuestionIndex].text}
            </p>
            <div className="flex items-center justify-center min-h-16">
              {showAnswer && (
                <p className="text-lg text-teal-700 font-bold">
                  {quiz.questions[currentQuestionIndex].answer}
                </p>
              )}
            </div>
            <div className="flex justify-center space-x-4 mt-4 mb-8">
              <button
                onClick={toggleAnswer}
                className="bg-teal-200 hover:bg-teal-300 text-teal-900 hover:text-teal-950 font-bold py-2 px-4 rounded"
              >
                {showAnswer ? "Hide Answer" : "Show Answer"}
              </button>{" "}
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {currentQuestionIndex > 0 && (
                <button
                  onClick={handlePreviousQuestion}
                  className="bg-green-200 hover:bg-green-300 text-green-900 hover:text-green-950 font-bold py-2 px-4 rounded"
                >
                  Previous Question
                </button>
              )}
              {currentQuestionIndex === quiz.questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="bg-green-200 hover:bg-green-300 text-green-900 hover:text-green-950 font-bold py-2 px-4 rounded"
                >
                  End Quiz
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="bg-green-200 hover:bg-green-300 text-green-900 hover:text-green-950 font-bold py-2 px-4 rounded"
                >
                  Next Question
                </button>
              )}
            </div>
            <p className="text-sm m-4 italic">
              Question {currentQuestionIndex + 1}/{quiz.questions.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizViewer;
