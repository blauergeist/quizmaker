function QuestionItem({
  question,
  index,
  onQuestionChange,
  onAnswerChange,
  onDeleteQuestion,
}) {
  return (
    <div className="mt-4 mb-8">
      <label className="block text-sm font-medium text-gray-700">
        Question {index + 1}
      </label>
      <input
        type="text"
        value={question.text}
        onChange={(e) => onQuestionChange(e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
      />
      <label className="block text-sm font-medium text-gray-700">
        Answer {index + 1}
      </label>
      <input
        type="text"
        value={question.answer}
        onChange={(e) => onAnswerChange(e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
      />
      <button
        onClick={onDeleteQuestion}
        className="mt-2 bg-red-200 hover:bg-red-300 text-red-800 hover:text-red-900 font-bold py-1 px-2 rounded"
      >
        Delete Question
      </button>
    </div>
  );
}

export default QuestionItem;
