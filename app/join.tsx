import { StyleSheet, TextInput, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { useEffect, useRef, useState } from 'react';
import { ButtonComponent } from '@/components/ButtonComponent';
import { Sizes } from '@/constants/Theme';
import { CardComponent } from '@/components/CardComponent';
import { InputComponent } from '@/components/InputComponent';
import { addPlayers } from '../functions/addPlayers';
import { getGameRoom } from '@/functions/getGameRoom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import data from '../public/content.json';
import React from 'react';
import { useSearchParams } from 'expo-router/build/hooks';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';

export default function Join() {
  const [gameCode, setGameCode] = useState('');
  const [playerName, setPlayerName] = useState<string>('');
  const content = data.content.joinGame;
  const button = data.content.buttons;
  const inputRef = useRef<TextInput | null>(null);
  const searchParams = useSearchParams();
  const QRcode = searchParams.get('code');
  const [checkPlayerName, setCheckPlayerName] = useState(false);

  useEffect(() => {
    if (QRcode) {
      setGameCode(QRcode);
    }
  }, []);

  const router = useRouter();

  const joinGame = async () => {
    const gameRoom = await getGameRoom(gameCode);

    if (gameRoom?.id) {
      await AsyncStorage.setItem('gameRoom', JSON.stringify(gameRoom));
      await addPlayers(gameRoom.id, playerName);
      await AsyncStorage.setItem('isAdmin', 'false');

      router.push('/game');
    } else {
      alert('Wrong game code!');
    }
  };

  const focusOnNextInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <ParallaxScrollView paddingTop={100}>
        <View style={styles.titleContainer}>
          <ThemedText type='heading32'>{content.title}</ThemedText>
          <ThemedText type='default'>{content.description}</ThemedText>
        </View>
        <View style={{ marginVertical: 40, position: 'relative' }}>
          <CardComponent heading={content.subHeading} fullWidth>
            <InputComponent
              placeholder='Code'
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
              placeholder='Name'
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
              <ThemedView
                style={{
                  paddingLeft: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  position: 'absolute',
                  bottom: 85,
                }}
              >
                <Ionicons name='alert-circle-outline' size={20} />
                <ThemedText type='default' style={{}}>
                  {playerName.length <= 2 && 'Min 2 characters'}
                  {playerName.length >= 10 && 'Max 10 characters'}
                </ThemedText>
              </ThemedView>
            )}
            <ButtonComponent
              style={styles.button}
              variant='primary'
              text={button.joinGame}
              onSubmit={joinGame}
              buttonDisabled={!checkPlayerName}
            />
          </CardComponent>
        </View>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    gap: Sizes.Spacings.small,
    marginBottom: 35,
    width: '90%',
  },
  cardContainer: {
    marginTop: 35,
    marginBottom: 70,
  },
  button: {
    marginTop: 30,
  },
});
