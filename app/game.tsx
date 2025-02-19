import ParallaxScrollView from '@/components/ParallaxScrollView';
import PlayerIcon from '@/components/PlayerIcon';
import { AddAnswer } from '@/components/AddAnswer';
import { getOrUpdateStatus } from '@/functions/getOrUpdateStatus';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import { useGameRoom } from '@/hooks/useGameRoom';
import { getQuestion } from '@/functions/getQuestion';
import { usePlayerIcon } from '@/hooks/usePlayerIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export default function Game() {
  const [status, setStatus] = useState<string>('');
  const { data: gameRoom } = useGameRoom();
  const { data: playerIcon } = usePlayerIcon();
  const [question, setQuestion] = useState<string>('');
  const [questionsLength, setQuestionsLength] = useState<number>(0);
  const documentId = gameRoom?.id;

  useEffect(() => {
    const ListenAndGetStatus = async () => {
      if (documentId) {
        const unsubscribe = await getOrUpdateStatus({
          documentId,
          setStatus,
        });
        return () => {
          if (unsubscribe) {
            unsubscribe();
          }
        };
      }
    };

    const fetchQuestion = async () => {
      if (documentId) {
        const unsubscribe = await getQuestion(
          documentId,
          setQuestion,
          setQuestionsLength,
        );

        return () => {
          if (unsubscribe) {
            unsubscribe();
          }
        };
      }
    };

    ListenAndGetStatus();
    fetchQuestion();
  }, [documentId]);

  useEffect(() => {
    if (questionsLength) {
      AsyncStorage.setItem('questionsLength', questionsLength.toString());
    }
  }, [questionsLength]);

  return (
    <ParallaxScrollView paddingTop={20}>
      {status === 'active' ? (
        <>
          <PlayerIcon
            paddingBottom={120}
            size={80}
            color={playerIcon.color}
            shape={playerIcon.shape}
          />
          <AddAnswer question={question} />
        </>
      ) : (
        <Loading initial='waiting' />
      )}
    </ParallaxScrollView>
  );
}
