import { render, screen, fireEvent } from "@testing-library/react";
import QuizForm from "../features/quiz/QuizForm";
import QuestionItem from "../features/quiz/QuestionItem";

jest.mock("../features/QuestionItem", () => (props) => (
  <div>
    <input
      type="text"
      value={props.question.text}
      onChange={(e) =>
        props.onQuestionChange(e.target.value, props.question.id)
      }
    />
    <input
      type="text"
      value={props.question.answer}
      onChange={(e) => props.onAnswerChange(e.target.value, props.question.id)}
    />
    <button onClick={props.onDeleteQuestion}>Delete Question</button>
  </div>
));

describe("QuizForm Component", () => {
  const mockTitleChange = jest.fn();
  const mockQuestionChange = jest.fn();
  const mockAnswerChange = jest.fn();
  const mockDeleteQuestion = jest.fn();
  const mockAddQuestion = jest.fn();

  const setup = (questions = []) => {
    render(
      <QuizForm
        title="Sample Quiz"
        onTitleChange={mockTitleChange}
        questions={questions}
        onQuestionChange={mockQuestionChange}
        onAnswerChange={mockAnswerChange}
        onDeleteQuestion={mockDeleteQuestion}
        onAddQuestion={mockAddQuestion}
      />
    );
  };

  it("renders with a title input and buttons to add questions", () => {
    setup();
    expect(screen.getByRole("textbox", { name: /title/i })).toHaveValue(
      "Sample Quiz"
    );
    expect(
      screen.getByRole("button", { name: /add question/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add 10 questions/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add 15 questions/i })
    ).toBeInTheDocument();
  });

  it("allows input for quiz title to be changed", () => {
    setup();
    const titleInput = screen.getByRole("textbox", { name: /title/i });
    fireEvent.change(titleInput, { target: { value: "New Quiz Title" } });
    expect(mockTitleChange).toHaveBeenCalledWith(expect.anything());
  });

  it("renders multiple QuestionItems for multiple questions", () => {
    const questions = [
      { id: "1", text: "Question 1", answer: "Answer 1" },
      { id: "2", text: "Question 2", answer: "Answer 2" },
    ];
    setup(questions);
    const questionInputs = screen.getAllByRole("textbox");
    expect(questionInputs.length).toBe(5); // 2 for questions, 2 for answers, 1 for title
  });

  it("calls onAddQuestion when the add question button is clicked", () => {
    setup();
    const addButton = screen.getByRole("button", { name: /add question/i });
    fireEvent.click(addButton);
    expect(mockAddQuestion).toHaveBeenCalledWith(1);
  });

  it("calls onAddQuestion with 10 when the add 10 questions button is clicked", () => {
    setup();
    const add10Button = screen.getByRole("button", {
      name: /add 10 questions/i,
    });
    fireEvent.click(add10Button);
    expect(mockAddQuestion).toHaveBeenCalledWith(10);
  });

  it("calls onAddQuestion with 15 when the add 15 questions button is clicked", () => {
    setup();
    const add15Button = screen.getByRole("button", {
      name: /add 15 questions/i,
    });
    fireEvent.click(add15Button);
    expect(mockAddQuestion).toHaveBeenCalledWith(15);
  });
});
