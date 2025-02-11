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
import { getIconColorAndShape } from '@/utils/getIconColorAndShape';
import { useLanguage } from '@/hooks/useLanguage';
import { useIsAdmin } from '@/hooks/useIsAdmin';

interface AddAdminProps {
  showAddAdmin: boolean;
  onClose: () => void;
}

export default function AddAdmin({ showAddAdmin, onClose }: AddAdminProps) {
  const { questions } = useQuestions();
  const { content, isLoading, error } = useLanguage();
  const { updateIsAdmin } = useIsAdmin();
  const [playerName, setPlayerName] = useState<string>('');
  const labels = content?.labels;
  const button = content?.buttons;

  const handlePress = async () => {
    if (playerName.length < 3) {
      alert('Your player name has to contain at least three characters');
    } else {
      const playerIcon = await getIconColorAndShape();
      await createGameRoom(playerName, questions, playerIcon);
      updateIsAdmin(true);
    }
  };

  if (isLoading || error) return null;

  return (
    <SlideAnimation
      height={300}
      showSlider={showAddAdmin}
      style={styles.addAdminBoxOpen}
      onClose={onClose}
    >
      <>
        <ThemedText type='heading24'>{labels.addPlayerName}</ThemedText>
        <ThemedView style={styles.inputContainer}>
          <InputComponent
            placeholder={labels.name}
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
            route={playerName.length >= 3 ? '/code' : undefined}
          />
        </GradientContainer>
      </>
    </SlideAnimation>
  );
}

const styles = StyleSheet.create({
  addAdminBoxOpen: {
    width: '100%',
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
