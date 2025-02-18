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
import CharacterCheck from './CharacterCheck';

interface AddAdminProps {
  showAddAdmin: boolean;
  onClose: () => void;
}

export default function AddAdmin({ showAddAdmin, onClose }: AddAdminProps) {
  const { questions } = useQuestions();
  const { content, isLoading, error } = useLanguage();
  const { updateIsAdmin } = useIsAdmin();
  const [playerName, setPlayerName] = useState<string>('');
  const [checkPlayerName, setCheckPlayerName] = useState(false);
  const labels = content?.labels;
  const button = content?.buttons;
  const playerNameCheck = playerName.length >= 2 && playerName.length <= 10;

  const handlePress = async () => {
    const playerIcon = await getIconColorAndShape();
    await createGameRoom(playerName, questions, playerIcon);
    updateIsAdmin(true);
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
              if (value.length >= 2 && value.length <= 10) {
                setCheckPlayerName(true);
              } else {
                setCheckPlayerName(false);
              }
            }}
            value={playerName}
            returnKeyType='join'
            onSubmitEditing={() => {
              if (checkPlayerName) {
                handlePress();
              }
            }}
            checks={checkPlayerName}
          />
          {!checkPlayerName && playerName.length > 0 && (
            <CharacterCheck playerName={playerName} addAdmin={true} />
          )}
        </ThemedView>
        <GradientContainer>
          <ButtonComponent
            onSubmit={handlePress}
            text={button.createGame}
            variant='primary'
            route={playerNameCheck ? '/code' : undefined}
            buttonDisabled={!checkPlayerName}
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
