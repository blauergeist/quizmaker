import { render, screen, fireEvent } from "@testing-library/react";
import QuestionItem from "../features/quiz/QuestionItem";

describe("QuestionItem Component", () => {
  const mockQuestionChange = jest.fn();
  const mockAnswerChange = jest.fn();
  const mockDeleteQuestion = jest.fn();
  const questionData = {
    id: "q1",
    text: "What is the capital of France?",
    answer: "Paris",
  };

  beforeEach(() => {
    render(
      <QuestionItem
        question={questionData}
        index={0}
        onQuestionChange={mockQuestionChange}
        onAnswerChange={mockAnswerChange}
        onDeleteQuestion={mockDeleteQuestion}
      />
    );
  });

  it("displays the question and answer inputs with the correct values", () => {
    const questionInput = screen.getByLabelText(/question 1/i);
    const answerInput = screen.getByLabelText(/answer 1/i);

    expect(questionInput.value).toBe("What is the capital of France?");
    expect(answerInput.value).toBe("Paris");
  });

  it("calls onQuestionChange when the question input is changed", () => {
    const questionInput = screen.getByLabelText(/question 1/i);
    fireEvent.change(questionInput, { target: { value: "New question text" } });
    expect(mockQuestionChange).toHaveBeenCalledWith("New question text", "q1");
  });

  it("calls onAnswerChange when the answer input is changed", () => {
    const answerInput = screen.getByLabelText(/answer 1/i);
    fireEvent.change(answerInput, { target: { value: "New answer text" } });
    expect(mockAnswerChange).toHaveBeenCalledWith("New answer text", "q1");
  });

  it("calls onDeleteQuestion when the delete button is clicked", () => {
    const deleteButton = screen.getByRole("button", {
      name: /delete question/i,
    });
    fireEvent.click(deleteButton);
    expect(mockDeleteQuestion).toHaveBeenCalled();
  });
});
