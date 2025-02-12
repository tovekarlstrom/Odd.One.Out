import { StyleSheet } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ButtonComponent } from '@/components/ButtonComponent';
import { Colors, Sizes } from '@/constants/Theme';
import { useState } from 'react';
import { createGameRoom } from '../functions/createGameRoom';
import { InputComponent } from './InputComponent';
import { GradientContainer } from './GradientContainer';
import SlideAnimation from './SlideAnimation';
import { useQuestions } from '@/contexts/QuestionsProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from '../public/content.json';
import { getIconColorAndShape } from '@/utils/getIconColorAndShape';

interface AddAdminProps {
  showAddAdmin: boolean;
  onClose: () => void;
}

export default function AddAdmin({ showAddAdmin, onClose }: AddAdminProps) {
  const { questions } = useQuestions();
  const [playerName, setPlayerName] = useState<string>('');
  const button = data.content.buttons;
  const playerNameCheck = playerName.length >= 2 && playerName.length <= 10;

  const handlePress = async () => {
    if (playerNameCheck) {
      const playerIcon = await getIconColorAndShape();
      await createGameRoom(playerName, questions, playerIcon);
      AsyncStorage.setItem('isAdmin', 'true');
    } else {
      alert('Your player name must be within 2 - 10 characters');
    }
  };

  return (
    <SlideAnimation
      height={300}
      showSlider={showAddAdmin}
      style={styles.addAdminBoxOpen}
      onClose={onClose}
    >
      <>
        <ThemedText type='heading24'>Add your player name</ThemedText>
        <ThemedView style={styles.inputContainer}>
          <InputComponent
            placeholder='Name'
            onChangeText={(value) => {
              setPlayerName(value);
            }}
            value={playerName}
          />
        </ThemedView>
        <GradientContainer>
          <ButtonComponent
            onSubmit={handlePress}
            text={button.createGame}
            variant='primary'
            route={playerNameCheck ? '/code' : undefined}
          />
        </GradientContainer>
      </>
    </SlideAnimation>
  );
}

const styles = StyleSheet.create({
  addAdminBoxOpen: {
    width: '100%',
    maxWidth: Sizes.Widths.medium,
    margin: 'auto',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: Sizes.Spacings.xxLarge,
    backgroundColor: Colors.light.Card,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  inputContainer: {
    width: '100%',
    height: 100,
  },
});
