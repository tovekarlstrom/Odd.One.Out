import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const AnswerContext = createContext<any>(undefined);

export function AnswersProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const loadQuestions = async () => {
      const answers = await AsyncStorage.getItem("answers");
      const parsedAnswers = JSON.parse(answers || "[]");
      setAnswers(parsedAnswers);
    };
    loadQuestions();
  }, []);

  const addAnswer = async (newAnswer: string) => {
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    await AsyncStorage.setItem("answers", JSON.stringify(updatedAnswers));
  };

  return (
    <AnswerContext.Provider value={{ answers, addAnswer }}>
      {children}
    </AnswerContext.Provider>
  );
}

export const useAnswers = () => useContext(AnswerContext);
