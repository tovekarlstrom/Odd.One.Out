import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  Platform,
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useEffect, useRef, useState } from 'react';
import { ButtonComponent } from '@/components/ButtonComponent';
import { Colors, Sizes } from '@/constants/Theme';
import { CardComponent } from '@/components/CardComponent';
import { InputComponent } from '@/components/InputComponent';
import { addPlayers } from '../functions/addPlayers';
import { getGameRoom } from '@/functions/getGameRoom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useLanguage } from '@/hooks/useLanguage';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { ModalComponent } from '@/components/Modal';
import CharacterCheck from '@/components/CharacterCheck';

export default function Join() {
  const [gameCode, setGameCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [playerName, setPlayerName] = useState<string>('');
  const [showWarningModal, setShowWarningModal] = useState(false);
  const { content, isLoading, error } = useLanguage();
  const pageContent = content?.joinGame;
  const button = content?.buttons;
  const labels = content?.labels;
  const inputRef = useRef<TextInput | null>(null);
  const searchParams = useLocalSearchParams();
  const { updateIsAdmin } = useIsAdmin();
  const QRcode = searchParams.code;
  const [checkPlayerName, setCheckPlayerName] = useState(false);

  useEffect(() => {
    if (QRcode && typeof QRcode === 'string') {
      setGameCode(QRcode);
    }
  }, []);

  const router = useRouter();

  const joinGame = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const gameRoom = await getGameRoom(gameCode);

      if (gameRoom?.id) {
        await AsyncStorage.setItem('gameRoom', JSON.stringify(gameRoom));
        await addPlayers(gameRoom.id, playerName);
        updateIsAdmin(false);

        router.push('/game');
      } else {
        setShowWarningModal(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const focusOnNextInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  if (isLoading || error) return null;

  return (
    <ParallaxScrollView paddingTop={45} scroll={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={styles.container}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <View style={styles.titleContainer}>
            <ThemedText type='heading32'>{pageContent.title}</ThemedText>
            <ThemedText type='default'>{pageContent.description}</ThemedText>
          </View>

          <View style={styles.inner}>
            <CardComponent heading={pageContent.subHeading} fullWidth>
              <InputComponent
                placeholder={labels.code}
                editable={QRcode ? false : true}
                onChangeText={(value) => {
                  setGameCode(value);
                }}
                value={gameCode}
                returnKeyType='next'
                onSubmitEditing={focusOnNextInput}
                checks={gameCode.length === 9}
              />
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
                ref={inputRef}
                returnKeyType='join'
                onSubmitEditing={() => {
                  if (checkPlayerName) {
                    joinGame();
                  }
                }}
                checks={checkPlayerName}
              />
              {!checkPlayerName && playerName.length > 0 && (
                <CharacterCheck playerName={playerName} />
              )}
              <ButtonComponent
                style={styles.button}
                variant='primary'
                text={button.joinGame}
                onSubmit={joinGame}
                buttonDisabled={!checkPlayerName || isSubmitting}
              />
            </CardComponent>
          </View>
        </View>
      </KeyboardAvoidingView>
      {showWarningModal && (
        <ModalComponent
          onClose={() => setShowWarningModal(false)}
          heading={labels.wrongGameCode.title}
          description={labels.wrongGameCode.description}
          oneButton={true}
        />
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  inner: {
    flex: 1,

    marginBottom: 155,
  },
  titleContainer: {
    flexDirection: 'column',
    gap: 15,
    marginVertical: Sizes.Spacings.medium,
    paddingHorizontal: 15,
  },
  cardContainer: {
    marginTop: 35,
    marginBottom: 70,
  },
  button: {
    marginTop: 30,
  },
});
