import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

interface QuestionContextProps {
  questions: string[];
  addQuestion: (newQuestion: string) => Promise<void>;
  removeQuestion: (question: string) => Promise<void>;
}
const QuestionContext = createContext<QuestionContextProps | undefined>(
  undefined
);

export function QuestionsProvider({ children }: { children: React.ReactNode }) {
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    const loadQuestions = async () => {
      const questions = await AsyncStorage.getItem("questions");
      const parsedQuestions = JSON.parse(questions || "[]");
      setQuestions(parsedQuestions);
    };
    loadQuestions();
  }, []);

  const addQuestion = async (newQuestion: string) => {
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    await AsyncStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  const removeQuestion = async (question: string) => {
    const updatedQuestions = questions.filter((q) => q !== question);
    setQuestions(updatedQuestions);
    await AsyncStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  return (
    <QuestionContext.Provider
      value={{ questions, addQuestion, removeQuestion }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export const useQuestions = () => useContext(QuestionContext);
