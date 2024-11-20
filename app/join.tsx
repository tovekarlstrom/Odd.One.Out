import { StyleSheet, TextInput, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { useRef, useState } from 'react';
import { ButtonComponent } from '@/components/ButtonComponent';
import { Sizes } from '@/constants/Theme';
import { CardComponent } from '@/components/CardComponent';
import { InputComponent } from '@/components/InputComponent';
import { addPlayers } from '../functions/addPlayers';
import { getGameRoom } from '@/functions/getGameRoom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import data from '../public/content.json';

export default function Join() {
  const [gameCode, setGameCode] = useState('');
  const [playerName, setPlayerName] = useState<string>('');
  const content = data.content.joinGame;
  const button = data.content.buttons;
  const inputRef = useRef<TextInput | null>(null);

  const router = useRouter();

  const joinGame = async () => {
    const gameRoom = await getGameRoom(gameCode);

    if (playerName.length < 3) {
      alert('Your player name has to contain at least three characters');
    } else if (gameRoom?.id) {
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
      <ParallaxScrollView paddingTop={50}>
        <View style={styles.titleContainer}>
          <ThemedText type='heading32'>{content.title}</ThemedText>
          <ThemedText type='default'>{content.description}</ThemedText>
        </View>
        <View style={{ marginVertical: 40 }}>
          <CardComponent heading={content.subHeading} fullWidth>
            <InputComponent
              placeholder='Code'
              onChangeText={(value) => {
                setGameCode(value);
              }}
              value={gameCode}
              returnKeyType='next'
              onSubmitEditing={focusOnNextInput}
            />
            <InputComponent
              placeholder='Name'
              onChangeText={(value) => {
                setPlayerName(value);
              }}
              value={playerName}
              ref={inputRef}
              returnKeyType='join'
              onSubmitEditing={joinGame}
            />
            <ButtonComponent
              variant='primary'
              text={button.joinGame}
              onSubmit={joinGame}
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
});
