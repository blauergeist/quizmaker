import React from "react";
import { render, screen } from "@testing-library/react";
import RecycleQuestions from "../features/RecycleQuestions";

const mockRecycleQuestion = jest.fn();
const mockToggleQuizSelection = jest.fn();

const mockQuizzes = [
  { id: "1", title: "First Quiz", questions: [{ text: "Q1", answer: "A1" }] },
  { id: "2", title: "Second Quiz", questions: [{ text: "Q2", answer: "A2" }] },
  { id: "3", title: "Third Quiz", questions: [{ text: "Q3", answer: "A3" }] },
];

describe("RecycleQuestions Component", () => {
  const renderComponent = (quizId = "1") => {
    let mockQuizzesRender = mockQuizzes;
    if (quizId === "new") mockQuizzesRender = [];

    render(
      <RecycleQuestions
        allQuizzes={mockQuizzesRender}
        quizId={quizId}
        selectedQuizIdForRecycling={null}
        toggleQuizSelection={mockToggleQuizSelection}
        recycleQuestion={mockRecycleQuestion}
      />
    );
  };

  it("displays recyclable quizzes excluding the current quiz", () => {
    renderComponent("3");
    expect(screen.getByText("First Quiz")).toBeInTheDocument();
    expect(screen.getByText("Second Quiz")).toBeInTheDocument();
    expect(screen.queryByText("Third Quiz")).toBeNull(); // Should not show the current quiz
  });

  it("displays only 'Second Quiz' as available to recycle from", () => {
    renderComponent("1");
    expect(screen.queryByText("First Quiz")).toBeNull();
    expect(screen.queryByText("Second Quiz")).toBeInTheDocument(); // Only Second Quiz should be available
  });

  it("shows no quizzes message when there are no existing quizzes in the system", () => {
    renderComponent("new"); // Creating the initial quiz - no existing quizzes in the system
    expect(
      screen.getByText(
        "There are currently no previous quizzes to recycle from."
      )
    ).toBeInTheDocument();
  });
});
