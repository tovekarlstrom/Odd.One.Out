import { useState } from 'react';
import { CardComponent } from './CardComponent';
import { ButtonComponent } from './ButtonComponent';
import { InputComponent } from './InputComponent';
import { useRouter } from 'expo-router';
import { addAnswerToQuestion } from '@/functions/addAnswers';
import { useGameRoom } from '@/hooks/useGameRoom';
import { useLanguage } from '@/hooks/useLanguage';
import { ModalComponent } from './Modal';

export function AddAnswer({ question }: { question: string }) {
  const [newAnswer, setNewAnswer] = useState<string>('');
  const { data: gameRoom } = useGameRoom();
  const { content, isLoading, error } = useLanguage();
  const button = content?.buttons;
  const labels = content?.labels;
  const descriptions = content?.descriptions;
  const documentId = gameRoom?.id;
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const addNewAnswer = async () => {
    if (documentId) {
      if (newAnswer) {
        await addAnswerToQuestion(documentId, newAnswer);
        setNewAnswer('');
      }
      router.replace('/answers');
    }
  };

  if (isLoading || error) return null;

  return (
    <CardComponent heading={question} fullWidth>
      <InputComponent
        placeholder={labels?.answer}
        onChangeText={(text) => {
          setNewAnswer(text);
        }}
        value={newAnswer}
      />
      <ButtonComponent
        variant='primary'
        text={button.sendAnswer}
        onSubmit={() => {
          if (newAnswer.length > 0 && newAnswer.length < 100) {
            addNewAnswer();
          } else {
            setShowModal(true);
          }
        }}
      />
      {showModal && (
        <ModalComponent
          heading={labels.canNotProceed}
          onClose={() => {
            setShowModal(false);
          }}
          description={descriptions.notEnoughCharacters}
          oneButton
        />
      )}
    </CardComponent>
  );
}
