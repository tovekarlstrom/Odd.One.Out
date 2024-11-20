import { useState } from 'react';
import { CardComponent } from './CardComponent';
import { ButtonComponent } from './ButtonComponent';
import { InputComponent } from './InputComponent';
import { useRouter } from 'expo-router';
import { addAnswerToQuestion } from '@/functions/addAnswers';
import { useGameRoom } from '@/hooks/useGameRoom';
import data from '../public/content.json';

export function AddAnswer({ question }: { question: string }) {
  const [newAnswer, setNewAnswer] = useState<string>('');
  const { data: gameRoom } = useGameRoom();
  const button = data.content.buttons;
  const documentId = gameRoom?.id;

  const router = useRouter();

  const addNewAnswer = async () => {
    if (documentId) {
      if (newAnswer) {
        await addAnswerToQuestion(documentId, newAnswer);
        setNewAnswer('');
      }
      router.push('/answers');
    }
  };

  return (
    <CardComponent heading={question} fullWidth>
      <InputComponent
        placeholder='Your answer'
        onChangeText={(text) => {
          setNewAnswer(text);
        }}
        value={newAnswer}
      />
      <ButtonComponent
        variant='primary'
        text={button.sendAnswer}
        onSubmit={() => {
          addNewAnswer();
        }}
      />
    </CardComponent>
  );
}
