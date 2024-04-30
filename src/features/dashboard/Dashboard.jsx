import { useQuiz } from "../../context/QuizContext";
import { Link } from "react-router-dom";

function Dashboard() {
  const { quizzes, deleteQuiz } = useQuiz();

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen min-w-full bg-slate-50 font-sans">
      <h1 className="text-2xl font-bold mb-4">Quiz Dashboard</h1>
      <div className="mt-4 mb-8 w-full sm:w-1/2">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="flex justify-between items-center bg-gray-100 p-2 rounded my-2"
            >
              <Link
                to={`/edit/${quiz.id}`}
                className="flex-grow px-8 font-medium capitalize"
              >
                {quiz.title}
              </Link>
              <button
                className="bg-blue-200 hover:bg-blue-300 text-blue-500 hover:text-blue-900 font-bold py-1 px-4 rounded mx-2"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/view/${quiz.id}`;
                }}
              >
                View
              </button>
              <button
                onClick={() => deleteQuiz(quiz.id)}
                className="bg-red-200 hover:bg-red-300 text-red-800 hover:text-red-900 font-bold py-1 px-4 rounded"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center bg-yellow-100 text-yellow-600 p-2 rounded font-medium">
            There are currently no quizzes in the system. Click the button below
            to create a new quiz!
          </p>
        )}
      </div>
      <Link
        to="/edit/new"
        className="bg-blue-200 hover:bg-blue-300 text-blue-500 hover:text-blue-900 font-bold py-2 px-4 rounded"
      >
        New Quiz
      </Link>
    </div>
  );
}

export default Dashboard;
