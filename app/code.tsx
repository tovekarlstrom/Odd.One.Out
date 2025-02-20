import { StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { CopyComponent } from '@/components/CopyComponent';
import { useEffect, useMemo, useState } from 'react';
import { ButtonComponent } from '@/components/ButtonComponent';
import { JoinedPlayers } from '@/components/JoinedPlayers';
import { GradientContainer } from '@/components/GradientContainer';
import { getGameRoom } from '@/functions/getGameRoom';
import { getPlayers } from '@/functions/getPlayers';
import { getOrUpdateStatus } from '@/functions/getOrUpdateStatus';
import { useGameRoom } from '@/hooks/useGameRoom';
import { router } from 'expo-router';
import { getRandomString } from '@/utils/getRandomString';
import QRCode from 'react-native-qrcode-svg';
import React from 'react';
import { Colors, Sizes } from '@/constants/Theme';
import { useLanguage } from '@/hooks/useLanguage';
import { getGameCode } from '@/utils/getGameCode';
import { ModalComponent } from '@/components/Modal';

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
  hasAnswered?: boolean;
}

export default function Code() {
  const [gameCode, setGameCode] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { data: gameRoom } = useGameRoom();
  const { content, isLoading, error } = useLanguage();
  const pageContent = content?.code;
  const button = content?.buttons;
  const labels = content?.labels;
  const documentId = gameRoom?.id;

  const headerTitle = useMemo(
    () => getRandomString(pageContent.title),
    [pageContent.title[0]],
  );

  useEffect(() => {
    if (documentId) {
      getGameCode(setGameCode);
    }
  }, [documentId]);

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
    if (players.length >= 3) {
      if (documentId) {
        getOrUpdateStatus({
          documentId,
          changeStatus: 'active',
        });
      }
      router.replace('/game');
    } else {
      setShowModal(true);
    }
  };

  if (isLoading || error) return null;

  return (
    <>
      <ParallaxScrollView paddingTop={50}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type='heading32'>{headerTitle}</ThemedText>
          <ThemedText type='default'>{pageContent.description}</ThemedText>
        </ThemedView>
        {gameCode && (
          <ThemedView style={{ alignItems: 'center' }}>
            <QRCode
              value={gameCode}
              size={150}
              backgroundColor={Colors.light.background}
              color={Colors.light.text}
            />
          </ThemedView>
        )}

        <CopyComponent gameCode={gameCode} addPadding={true} />
        <View style={styles.cardContainer}>
          <JoinedPlayers
            players={players}
            heading={pageContent.subHeading}
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
      {showModal && (
        <ModalComponent
          onClose={() => setShowModal(false)}
          heading={labels.notEnoughPlayers.title}
          description={labels.notEnoughPlayers.description}
          oneButton={true}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    gap: 15,
    marginVertical: Sizes.Spacings.large,
    paddingHorizontal: 15,
  },
  cardContainer: {
    marginTop: 35,
    marginBottom: 70,
  },
});
