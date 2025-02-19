import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const QuestionContext = createContext<any>(undefined);

export function QuestionsProvider({ children }: { children: React.ReactNode }) {
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    const loadQuestions = async () => {
      const questions = await AsyncStorage.getItem('questions');
      const parsedQuestions = JSON.parse(questions || '[]');
      setQuestions(parsedQuestions);
    };
    loadQuestions();
  }, []);

  const addQuestion = async (newQuestion: string) => {
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    await AsyncStorage.setItem('questions', JSON.stringify(updatedQuestions));
  };

  const removeQuestion = async (question: string) => {
    const updatedQuestions = questions.filter((q) => q !== question);
    setQuestions(updatedQuestions);
    await AsyncStorage.setItem('questions', JSON.stringify(updatedQuestions));
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
