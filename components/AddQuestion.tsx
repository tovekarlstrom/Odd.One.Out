import { View, StyleSheet } from 'react-native';
import { InputComponent } from './InputComponent';
import { RoundButton } from './RoundButton';
import { useState } from 'react';

import { useQuestions } from '@/contexts/QuestionsProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonComponent } from './ButtonComponent';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';
import data from '../public/content.json';
import { majority } from '../public/statements.json';
import { ModalComponent } from './Modal';

export function AddQuestion() {
  const [newQuestion, setNewQuestion] = useState<string>('');
  const { addQuestion } = useQuestions();
  const { questions } = useQuestions();
  const [showModal, setShowModal] = useState(false);
  const text = data?.content?.createGame || {};

  const handleNewQuestion = (text: string) => {
    setNewQuestion(text);
  };
  const addNewQuestion = async () => {
    if (!newQuestion || newQuestion.length > 100) {
      alert('Question must be within 0 - 100 characters');
      return;
    }

    const questions = await AsyncStorage.getItem('questions');
    const parsedQuestions = questions ? JSON.parse(questions) : [];

    if (parsedQuestions.includes(newQuestion)) {
      return alert('This question has already been added.');
    }

    addQuestion(newQuestion);
    setNewQuestion('');
  };

  const handleRandomStatements = async () => {
    const uniqueStatement = majority.filter(
      (statement) => !questions.includes(statement),
    );
    if (uniqueStatement.length < 1) {
      setShowModal(true);
      return;
    }
    const randomIndex = Math.floor(Math.random() * uniqueStatement.length);
    addQuestion(uniqueStatement[randomIndex]);
  };

  return (
    <View style={styled.container}>
      <InputComponent
        placeholder='Question'
        onChangeText={handleNewQuestion}
        value={newQuestion}
        onSubmitEditing={addNewQuestion}
      />
      <ButtonComponent
        text='Add question'
        variant='blue'
        onSubmit={addNewQuestion}
      />
      <ThemedView
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          width: 310,
          marginHorizontal: 20,
          marginTop: 25,
        }}
      >
        <Ionicons
          name='information-circle-outline'
          size={24}
          color='black'
          style={{ flex: 0.5 }}
        />
        <ThemedText type='defaultSmall' style={{ flex: 4 }}>
          {text.addNewQuestionsInfo}
        </ThemedText>
        <RoundButton
          isAdding={true}
          onPress={handleRandomStatements}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      </ThemedView>
      {showModal && (
        <ModalComponent
          heading={text.totalAddedQuestions.heading}
          onClose={() => {
            setShowModal(false);
          }}
          description={text.totalAddedQuestions.description}
          oneButton
        />
      )}
    </View>
  );
}

const styled = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
});
