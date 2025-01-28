import { StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { CopyComponent } from '@/components/CopyComponent';
import { useEffect, useMemo, useState } from 'react';
import { ButtonComponent } from '@/components/ButtonComponent';
import { JoinedPlayers } from '@/components/JoinedPlayers';
import { GradientContainer } from '@/components/GradientContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getGameRoom } from '@/functions/getGameRoom';
import { getPlayers } from '@/functions/getPlayers';
import { getOrUpdateStatus } from '@/functions/getOrUpdateStatus';
import { useGameRoom } from '@/hooks/useGameRoom';
import { router } from 'expo-router';
import data from '../public/content.json';
import { getRandomString } from '@/utils/getRandomString';

export type PlayerIconType = {
  color: string;
  shape: string;
};
export interface Player {
  playerName: string;
  points: number[];
  isAdmin: boolean;
  playerId: string;
  totalPoints: number;
  playerIcon: PlayerIconType;
}

export const loadGameCode = async () => {
  try {
    const roomId = await AsyncStorage.getItem('roomId');

    if (!roomId) {
      console.error('No roomId in storage');
      return null;
    }

    return roomId;
  } catch (e) {
    console.error('Error loading from storage', e);
    return null;
  }
};

export default function Code() {
  const [gameCode, setGameCode] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const { data: gameRoom } = useGameRoom();
  const content = data.content.code;
  const button = data.content.buttons;
  const documentId = gameRoom?.id;

  const headerTitle = useMemo(
    () => getRandomString(content.title),
    [content.title[0]],
  );

  useEffect(() => {
    const fetchGameCode = async () => {
      const roomCode = await loadGameCode();
      if (roomCode) {
        setGameCode(roomCode);
      }
    };
    fetchGameCode();
  }, []);

  useEffect(() => {
    if (gameCode) {
      const fetchAndListenToPlayers = async () => {
        const gameRoom = await getGameRoom(gameCode);
        if (gameRoom?.id) {
          const unsubscribe = await getPlayers(gameRoom.id, setPlayers);
          return () => {
            if (unsubscribe) {
              unsubscribe();
            }
          };
        }
      };
      fetchAndListenToPlayers();
    }
  }, [gameCode]);

  const startGame = async () => {
    //   if (players.length >= 3) {
    if (documentId) {
      getOrUpdateStatus({
        documentId,
        changeStatus: 'active',
      });
    }
    router.push('/game');
    // } else {
    //   Alert.alert(
    //     "Not enough players",
    //     "You need at least 3 players to start the game",
    //     [{ text: "OK", onPress: () => {} }]
    //   );
    // }
  };

  return (
    <>
      <ParallaxScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type='heading32'>{headerTitle}</ThemedText>
          <ThemedText type='default'>{content.description}</ThemedText>
        </ThemedView>
        <CopyComponent gameCode={gameCode} />
        <View style={styles.cardContainer}>
          <JoinedPlayers
            players={players}
            heading={content.subHeading}
            showListLength={true}
          />
        </View>
      </ParallaxScrollView>
      <GradientContainer>
        <ButtonComponent
          text={button.start}
          variant='primary'
          onSubmit={() => {
            startGame();
          }}
        />
      </GradientContainer>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    gap: 8,
    marginBottom: 35,
    width: '90%',
  },
  cardContainer: {
    marginTop: 35,
    marginBottom: 70,
  },
});
