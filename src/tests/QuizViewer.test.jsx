import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import QuizViewer from "../features/quiz/QuizViewer";
import { QuizProvider, useQuiz } from "../context/QuizContext";

jest.mock("../context/QuizContext", () => {
  const originalModule = jest.requireActual("../context/QuizContext");
  return {
    __esModule: true,
    ...originalModule,
    useQuiz: jest.fn(),
  };
});

const mockQuizzes = [
  {
    id: "1",
    title: "Sample Quiz",
    questions: [
      { text: "Question 1?", answer: "Answer 1" },
      { text: "Question 2?", answer: "Answer 2" },
    ],
  },
];

describe("QuizViewer Component", () => {
  beforeEach(() => {
    // Mock the useQuiz hook to return quizzes
    useQuiz.mockImplementation(() => ({
      quizzes: mockQuizzes,
    }));
  });

  const setup = (quizId = "1") => {
    render(
      <MemoryRouter initialEntries={[`/view/${quizId}`]}>
        <QuizProvider>
          <Routes>
            <Route path="/view/:quizId" element={<QuizViewer />} />
          </Routes>
        </QuizProvider>
      </MemoryRouter>
    );
  };

  it("renders and displays the first question of the quiz", async () => {
    setup();
    expect(await screen.findByText(/sample quiz/i)).toBeInTheDocument();
    expect(await screen.findByText(/question 1\?/i)).toBeInTheDocument();
    expect(screen.queryByText(/answer 1/i)).toBeNull(); // Answer should not be visible initially
  });

  it("allows toggling the answer visibility", async () => {
    setup();
    const showAnswerButton = await screen.findByText(/show answer/i);
    fireEvent.click(showAnswerButton);
    expect(await screen.findByText(/answer 1/i)).toBeInTheDocument(); // Now answer should be visible

    fireEvent.click(showAnswerButton);
    expect(screen.queryByText(/answer 1/i)).toBeNull(); // Answer should be hidden again
  });

  it("navigates to the next question when next is clicked", async () => {
    setup();
    const nextButton = await screen.findByText(/next question/i);
    fireEvent.click(nextButton);
    expect(await screen.findByText(/question 2\?/i)).toBeInTheDocument();
  });

  it("displays completion message after the last question", async () => {
    setup();
    const nextButton = await screen.findByText(/next question/i);
    fireEvent.click(nextButton); // Go to second question

    const endButton = await screen.findByText(/end quiz/i);
    fireEvent.click(endButton); // Click the end quiz button

    expect(
      await screen.findByText(/congrats, you've completed the quiz!/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/start over/i)).toBeInTheDocument();
  });

  it("can start over after completing the quiz", async () => {
    setup();
    const nextButton = await screen.findByText(/next question/i);
    fireEvent.click(nextButton); // Go to second question

    const endButton = await screen.findByText(/end quiz/i);
    fireEvent.click(endButton); // Click the end quiz button

    const startOverButton = await screen.findByText(/start over/i);
    fireEvent.click(startOverButton);
    expect(await screen.findByText(/question 1\?/i)).toBeInTheDocument(); // Should be back to the first question
  });

  it("handles quiz not found scenario", async () => {
    setup("999");
    expect(await screen.findByText(/loading\.\.\./i)).toBeInTheDocument();
  });
});
