import QuestionItem from "./QuestionItem";

function QuizForm({
  title,
  onTitleChange,
  questions,
  onQuestionChange,
  onAnswerChange,
  onDeleteQuestion,
  onAddQuestion,
}) {
  return (
    <div>
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
          onChange={onTitleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
        />
      </div>
      {questions.map((question, index) => (
        <QuestionItem
          key={question.id}
          question={question}
          index={index}
          onQuestionChange={(text) => onQuestionChange(text, question.id)}
          onAnswerChange={(answer) => onAnswerChange(answer, question.id)}
          onDeleteQuestion={() => onDeleteQuestion(question.id)}
        />
      ))}
      <div>
        <button
          onClick={() => onAddQuestion(1)}
          className="mt-4 bg-green-200 hover:bg-green-300 text-green-800 hover:text-green-900 font-bold py-2 px-4 mx-1 rounded"
        >
          Add Question
        </button>
        <button
          onClick={() => onAddQuestion(10)}
          className="mt-4 bg-green-200 hover:bg-green-300 text-green-800 hover:text-green-900 font-bold py-2 px-4 mx-1 rounded"
        >
          Add 10 Questions
        </button>
        <button
          onClick={() => onAddQuestion(15)}
          className="mt-4 bg-green-200 hover:bg-green-300 text-green-800 hover:text-green-900 font-bold py-2 px-4 mx-1 rounded"
        >
          Add 15 Questions
        </button>
      </div>
    </div>
  );
}

export default QuizForm;
