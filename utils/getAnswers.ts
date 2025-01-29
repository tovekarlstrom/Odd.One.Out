import { PlayerAnswer } from '@/app/answers';
import { getAnswer } from '@/functions/getAnswer';
import { Dispatch, SetStateAction } from 'react';

export const getAnswers = async (
  documentId: string | undefined,
  setAnswers: Dispatch<SetStateAction<PlayerAnswer[]>>,
) => {
  if (documentId) {
    getAnswer(documentId, setAnswers);
  }
};
