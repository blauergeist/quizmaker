// THIS IS JUST A PREPARATION FOR WHEN THE API IS FINISHED
// THE FOLLOWING CODE SHOULD BE TESTED AND ADJUSTED ONCE THE API INTEGRATION HAPPENS

import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as apiQuiz from "./apiQuiz";

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const {
    data: quizzes,
    isLoading,
    error,
  } = useQuery("quizzes", apiQuiz.fetchQuizzes);

  const addQuizMutation = useMutation(apiQuiz.addQuiz, {
    onSuccess: () => {
      queryClient.invalidateQueries("quizzes");
    },
  });

  const updateQuizMutation = useMutation(apiQuiz.updateQuiz, {
    onSuccess: () => {
      queryClient.invalidateQueries("quizzes");
    },
  });

  const deleteQuizMutation = useMutation(apiQuiz.deleteQuiz, {
    onSuccess: () => {
      queryClient.invalidateQueries("quizzes");
    },
  });

  const value = {
    quizzes,
    isLoading,
    error,
    addQuiz: addQuizMutation.mutate,
    updateQuiz: updateQuizMutation.mutate,
    deleteQuiz: deleteQuizMutation.mutate,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
