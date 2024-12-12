import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from 'react-query';

const getQuestionsLength = async () => {
  const questionsLength = await AsyncStorage.getItem('questionsLength');
  const parsedLength = JSON.parse(questionsLength || '');
  return parsedLength;
};

export const useQuestionsLength = () => {
  return useQuery('questionsLength', getQuestionsLength);
};
