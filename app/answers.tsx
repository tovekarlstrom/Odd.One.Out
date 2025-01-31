import React from 'react';
import { ButtonComponent } from '@/components/ButtonComponent';
import { CardComponent } from '@/components/CardComponent';
import { GradientContainer } from '@/components/GradientContainer';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import PlayerIcon from '@/components/PlayerIcon';
import { TextField } from '@/components/TextField';
import { addPoints } from '@/functions/addPoints';
import { getAnswer } from '@/functions/getAnswer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Colors, Sizes } from '@/constants/Theme';
import { getOrUpdateStatus } from '@/functions/getOrUpdateStatus';
import Loading from '@/components/Loading';
import { router } from 'expo-router';
import { useGameRoom } from '@/hooks/useGameRoom';
import { useSortedPlayers } from '@/hooks/useSortedPlayers';
import data from '../public/content.json';
import { usePlayerIcon } from '@/hooks/usePlayerIcon';
import { shape } from '@/utils/getIconColorAndShape';
import { PointsConfimationModal } from '@/components/PointsConfimationModal';

export interface PlayerAnswer {
  playerId: string;
  playerAnswer: string;
}

export default function Answers() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [answers, setAnswers] = useState<PlayerAnswer[]>([]);
  const [status, setStatus] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [playerGetPoints, setPlayerGetPoints] = useState<string[]>([]);
  const { data: gameRoom } = useGameRoom();
  const { data: playerIcon } = usePlayerIcon();
  const players = useSortedPlayers();
  const labels = data.content.labels;
  const button = data.content.buttons;
  const documentId = gameRoom?.id;

  const getPlayerAnswer = (playerId: string) => {
    if (!answers.length) return '';
    const answer = answers.find((answer) => answer.playerId === playerId);
    return answer ? answer.playerAnswer : 'Unknown Answer';
  };

  useEffect(() => {
    const getAnswers = async () => {
      if (documentId) {
        getAnswer(documentId, setAnswers);
      }
    };
    getAnswers();
  }, [documentId]);

  useEffect(() => {
    const getAdmin = async () => {
      const admin = await AsyncStorage.getItem('isAdmin');
      if (admin) {
        const parsedAdmin = JSON.parse(admin);
        if (parsedAdmin === true) {
          setIsAdmin(parsedAdmin);
        } else {
          setIsAdmin(false);
        }
      }
    };
    const getStatus = async () => {
      if (documentId) {
        await getOrUpdateStatus({ documentId, setStatus });
      }
    };
    getStatus();
    getAdmin();
  }, [documentId]);

  useEffect(() => {
    if (status === 'active') {
      if (players.length !== 0 && answers.length === players.length) {
        setIsLoading(false);
      }
    }
    if (status === 'idle' && !isAdmin) {
      router.push('/result');
    }
  }, [status, answers, players]);

  const handleSelectedAnswers = (playerId: string) => {
    setPlayerGetPoints((prevPoints) => {
      if (prevPoints.includes(playerId)) {
        console.log(`Removing ${playerId} from playerGetPoints`);
        return prevPoints.filter((id) => id !== playerId); // Remove player
      } else {
        console.log(`Adding ${playerId} to playerGetPoints`);
        return [...prevPoints, playerId]; // Add player
      }
    });
  };

  const enterPoints = async () => {
    if (documentId) {
      console.log('Adding points to players', playerGetPoints);
      await addPoints(documentId, playerGetPoints);
      await getOrUpdateStatus({ documentId, changeStatus: 'idle' });
      router.push('/result');
    }
  };

  return (
    <>
      <ParallaxScrollView paddingTop={20}>
        {isLoading ? (
          <Loading initial='active' />
        ) : (
          <>
            <PlayerIcon
              paddingBottom={20}
              size={80}
              color={playerIcon.color}
              shape={playerIcon.shape}
            />
            <View style={{ paddingTop: Sizes.Spacings.large }}>
              <CardComponent
                heading={isAdmin ? labels.answersAdmin : labels.answersPlayer}
                fullWidth
              >
                {players &&
                  players.map((player, index) => (
                    <View key={index}>
                      <TextField
                        value={player.playerName}
                        isClickable={isAdmin}
                        answer={getPlayerAnswer(player.playerId)}
                        onPress={() => {
                          handleSelectedAnswers(player.playerId);
                        }}
                      >
                        <PlayerIcon
                          size={17}
                          color={player.playerIcon.color}
                          shape={player.playerIcon.shape as shape}
                        />
                      </TextField>
                    </View>
                  ))}
              </CardComponent>
            </View>
            {!isAdmin && (
              <Text
                style={{
                  textAlign: 'center',
                  paddingVertical: 50,
                  color: Colors.light.placeholder,
                }}
              >
                {labels.waitForAdmin}
              </Text>
            )}
          </>
        )}
        {showModal && (
          <PointsConfimationModal
            playerGetPoints={playerGetPoints}
            onClose={() => setShowModal(false)}
            onConfirm={enterPoints}
          />
        )}
      </ParallaxScrollView>
      {isAdmin && !isLoading && (
        <GradientContainer>
          <ButtonComponent
            onSubmit={() => setShowModal(true)}
            text={button.enterPoints}
            variant='primary'
          />
        </GradientContainer>
      )}
    </>
  );
}
