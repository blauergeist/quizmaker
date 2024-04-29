const API_URL = "http://quiz-maker.apidocs.enterwell.space/api"; // API DOESN'T EXIST YET

export async function fetchQuizzes() {
  try {
    const response = await fetch(`${API_URL}/quizzes`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const quizzes = response.json();
    return quizzes;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchQuiz(quizId) {
  try {
    const response = await fetch(`${API_URL}/quizzes/${quizId}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const quiz = response.json();
    return quiz;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchQuestions() {
  try {
    const response = await fetch(`${API_URL}/questions`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const questions = response.json();
    return questions;
  } catch (error) {
    console.error(error);
  }
}

export async function addQuiz(quiz) {
  try {
    const response = await fetch(`${API_URL}/quizzes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quiz),
    });

    if (!response.ok) {
      throw new Error("Failed to create quiz");
    }

    const newQuiz = response.json();
    return newQuiz;
  } catch (error) {
    console.error(error);
  }
}

export async function updateQuiz(quiz) {
  try {
    const response = await fetch(`${API_URL}/quizzes/${quiz.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quiz),
    });

    if (!response.ok) {
      throw new Error("Failed to update quiz");
    }

    const updatedQuiz = response.json();
    return updatedQuiz;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteQuiz(quizId) {
  try {
    const response = await fetch(`${API_URL}/quizzes/${quizId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete quiz");
    }

    return true;
  } catch (error) {
    console.error(error);
  }
}
