import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Vibration, View } from 'react-native';
import { GradientContainer } from '@/components/GradientContainer';
import { ButtonComponent } from '@/components/ButtonComponent';
import { getOrUpdateStatus } from '@/functions/getOrUpdateStatus';
import { router } from 'expo-router';
import { updateIndex } from '@/functions/getOrUpdateIndex';
import { JoinedPlayers } from '@/components/JoinedPlayers';
import { useGameRoom } from '@/hooks/useGameRoom';
import { useSortedPlayers } from '@/hooks/useSortedPlayers';
import data from '../public/content.json';

import PlayerIcon from '@/components/PlayerIcon';
import { usePlayerIcon } from '@/hooks/usePlayerIcon';
import { getRandomString } from '@/utils/getRandomString';
import { useQuestionsLength } from '@/hooks/useQuestionsLength';
export default function RoundResult() {
  const [scored, setScored] = useState<boolean | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState(false);
  const [status, setStatus] = useState<string>();
  const [randomString, setRandomString] = useState<string>('');
  const [countDown, setCountDown] = useState(5);
  const [index, setIndex] = useState<number>(0);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const { data: gameRoom } = useGameRoom();
  const documentId = gameRoom.id;
  const mode = gameRoom.mode;
  const { data: playerIcon } = usePlayerIcon();
  const players = useSortedPlayers();
  const { data: questionsLength } = useQuestionsLength();

  const labels = data.content.labels;
  const button = data.content.buttons;

  const previousStatus = useRef<string | null>(null);

  const pointsLabel =
    mode === 'majority' ? labels.score.majority : labels.score.minority;

  useEffect(() => {
    const getAdmin = async () => {
      const admin = await AsyncStorage.getItem('isAdmin');
      if (admin) {
        const parsedAdmin = JSON.parse(admin);
        if (parsedAdmin === true) {
          setIsAdmin(parsedAdmin);
        }
      }
    };
    const getIndex = async () => {
      if (documentId) {
        await updateIndex(documentId, setIndex);
      }
    };
    const getStatus = async () => {
      if (documentId) {
        const unsubscribe = await getOrUpdateStatus({
          documentId,
          setStatus: (newStatus) => {
            if (previousStatus.current !== newStatus) {
              setStatus(newStatus);
              previousStatus.current = newStatus;
            }
          },
        });
        return () => {
          if (unsubscribe) {
            unsubscribe();
          }
        };
      }
    };

    getAdmin();
    getStatus();
    getIndex();
  }, [documentId]);

  useEffect(() => {
    const checkScore = async () => {
      const playerId = await AsyncStorage.getItem('playerId');
      if (playerId && players) {
        const findUser = players.find((player) => player.playerId === playerId);
        if (findUser) {
          if (findUser.points[findUser.points.length - 1] === 1) {
            setScored(true);
          } else {
            setScored(false);
          }
        }
      }
    };
    checkScore();
  }, [players]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (status === 'active') {
      setCountdownStarted(true);
      setCountDown(5);

      intervalId = setInterval(() => {
        setCountDown((prevCountDown) => {
          if (prevCountDown > 1) {
            Vibration.vibrate(500);
            return prevCountDown - 1;
          } else {
            if (intervalId) {
              clearInterval(intervalId);
            }
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [status]);

  useEffect(() => {
    if (countDown === 0) {
      router.push('/game');
    }
  }, [countDown]);

  useEffect(() => {
    if (scored !== undefined) {
      setRandomString(
        getRandomString(scored ? pointsLabel.right : pointsLabel.wrong),
      );
    }
  }, [scored]);

  const nextQuestion = useCallback(async () => {
    if (documentId) {
      await updateIndex(documentId, undefined, true);
      await getOrUpdateStatus({ documentId, changeStatus: 'active' });
    }
  }, []);

  return (
    <>
      <ParallaxScrollView paddingTop={20}>
        {scored !== undefined && (
          <View>
            <PlayerIcon
              size={80}
              color={playerIcon.color}
              shape={playerIcon.shape}
              paddingBottom={30}
            />
            <ThemedText style={{ paddingBottom: 57 }} type='heading32'>
              {randomString}
            </ThemedText>

            <ThemedText style={{ marginBottom: 47 }} type='default'>
              {scored ? 1 : 0} {labels.pointsAdded}
            </ThemedText>

            <JoinedPlayers
              heading={labels.topThree}
              players={players}
              showPoints
              topPlayers
            />
          </View>
        )}
      </ParallaxScrollView>

      <GradientContainer>
        {countdownStarted ? (
          <ThemedText type='defaultSemiBold' style={{ marginBottom: 10 }}>
            {labels.gameCountdown} {countDown}
          </ThemedText>
        ) : (
          <>
            {index === questionsLength - 1 ? (
              <ButtonComponent
                variant='primary'
                text={button.endGame}
                route='/scoreboard'
              />
            ) : isAdmin ? (
              <ButtonComponent
                text={button.nextRound}
                variant='primary'
                onSubmit={nextQuestion}
              />
            ) : null}
          </>
        )}
      </GradientContainer>
    </>
  );
}
