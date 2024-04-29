import { createContext, useContext, useState, useEffect } from "react";

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [allQuizzes, setAllQuizzes] = useState([]); // Store all quizzes, including inactive ones

  useEffect(() => {
    const loadedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    setAllQuizzes(loadedQuizzes);
    setQuizzes(loadedQuizzes.filter((quiz) => quiz.isActive !== false));
  }, []);

  const saveQuizzes = (updatedQuizzes) => {
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
    setAllQuizzes(updatedQuizzes);
    setQuizzes(updatedQuizzes.filter((quiz) => quiz.isActive !== false));
  };

  const addQuiz = (quiz) => {
    const newQuizzes = [...allQuizzes, { ...quiz, isActive: true }];
    saveQuizzes(newQuizzes);
  };

  const deleteQuiz = (id) => {
    const updatedQuizzes = allQuizzes.map((quiz) =>
      quiz.id === id ? { ...quiz, isActive: false } : quiz
    );
    saveQuizzes(updatedQuizzes);
  };

  const updateQuiz = (updatedQuiz) => {
    const updatedQuizzes = allQuizzes.map((quiz) =>
      quiz.id === updatedQuiz.id ? updatedQuiz : quiz
    );
    saveQuizzes(updatedQuizzes);
  };

  const value = {
    quizzes,
    allQuizzes,
    addQuiz,
    deleteQuiz,
    updateQuiz,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
