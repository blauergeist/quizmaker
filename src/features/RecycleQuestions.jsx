function RecycleQuestions({
  allQuizzes,
  quizId,
  selectedQuizIdForRecycling,
  toggleQuizSelection,
  recycleQuestion,
}) {
  return (
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
                {quiz.title}
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
              Add "{question.text.slice(0, 30)}..."
            </button>
          ))}
    </div>
  );
}

export default RecycleQuestions;
