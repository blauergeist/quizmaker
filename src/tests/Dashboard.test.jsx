import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { QuizProvider } from "../context/QuizContext";
import Dashboard from "../features/Dashboard";
import "@testing-library/jest-dom";

jest.mock("../context/QuizContext", () => {
  const originalModule = jest.requireActual("../context/QuizContext");
  return {
    __esModule: true,
    ...originalModule,
    useQuiz: jest.fn(),
  };
});

describe("Dashboard Component", () => {
  const mockDeleteQuiz = jest.fn();
  const quizzesMock = [
    { id: "1", title: "Quiz 1", isActive: true },
    { id: "2", title: "Quiz 2", isActive: true },
  ];

  beforeEach(() => {
    require("../context/QuizContext").useQuiz.mockImplementation(() => ({
      quizzes: quizzesMock,
      deleteQuiz: mockDeleteQuiz,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display quizzes and interact with delete button", () => {
    render(
      <Router>
        <QuizProvider>
          <Dashboard />
        </QuizProvider>
      </Router>
    );

    expect(screen.getByText("Quiz Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Quiz 1")).toBeInTheDocument();
    expect(screen.getByText("Quiz 2")).toBeInTheDocument();

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);
    expect(mockDeleteQuiz).toHaveBeenCalledWith("1");
  });

  it("shows no quizzes message when there are no quizzes", () => {
    require("../context/QuizContext").useQuiz.mockImplementation(() => ({
      quizzes: [],
      deleteQuiz: mockDeleteQuiz,
    }));

    render(
      <Router>
        <QuizProvider>
          <Dashboard />
        </QuizProvider>
      </Router>
    );

    expect(
      screen.getByText(/there are currently no quizzes/i)
    ).toBeInTheDocument();
  });
});
