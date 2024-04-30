import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "../context/QuizContext";
import QuizEditor from "../features/quiz/QuizEditor";

jest.mock("../context/QuizContext", () => ({
  useQuiz: () => ({
    addQuiz: jest.fn(),
    updateQuiz: jest.fn(),
    quizzes: [],
    allQuizzes: [],
  }),
  QuizProvider: ({ children }) => children,
}));

jest.mock("../hooks/useMoveback", () => ({
  useMoveBack: () => jest.fn(),
}));

jest.mock("../features/quiz/QuizForm", () => () => (
  <div>QuizForm Component</div>
));
jest.mock("../features/quiz/RecycleQuestions", () => () => (
  <div>RecycleQuestions Component</div>
));

describe("QuizEditor Component", () => {
  beforeEach(() => {
    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders correctly and handles save interaction", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <QuizProvider>
                <QuizEditor />
              </QuizProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    );

    // Check for the presence of specific parts of the UI
    expect(screen.getByText(/QuizForm Component/)).toBeInTheDocument();
    expect(screen.getByText(/RecycleQuestions Component/)).toBeInTheDocument();

    const saveButton = screen.getByText(/save quiz/i);
    fireEvent.click(saveButton);

    // Check if the alert was called since it's supposed to handle errors when input is incomplete
    expect(window.alert).toHaveBeenCalledWith(
      "Title and at least one question are required!"
    );
  });
});
