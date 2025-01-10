import { ButtonComponent } from '@/components/ButtonComponent';
import { StyleSheet } from 'react-native';
import { GradientContainer } from '@/components/GradientContainer';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import PlayerIcon from '@/components/PlayerIcon';
import { Colors, Sizes } from '@/constants/Theme';
import { JoinedPlayers } from '@/components/JoinedPlayers';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSortedPlayers } from '@/hooks/useSortedPlayers';
import Loading from '@/components/Loading';
import { useEffect, useState } from 'react';
import data from '../public/content.json';
import { shape } from '@/utils/getIconColorAndShape';
import { useGameRoom } from '@/hooks/useGameRoom';
import { Player } from './code';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TopPlayer {
  playerName: string;
  place: number;
  height: number;
  playerIcon: { color: string; shape: string };
}

export default function Score() {
  const [playerList, setPlayerList] = useState<TopPlayer[]>([]);
  const [player, setPlayer] = useState<Player | null>(null);
  const [label, setLabel] = useState({ title: '', description: '' });
  const players = useSortedPlayers();
  const content = data.content.results;
  const labels = data.content.labels;
  const button = data.content.buttons;
  const gameRoom = useGameRoom();
  const mode = gameRoom.data?.mode;

  const resultsLabel =
    mode === 'majority' ? content.majority : content.minority;

  useEffect(() => {
    const setResults = async (players: Player[]) => {
      if (players.length === 0) return;
      const topPlayers = players.slice(0, 3);

      const playerId = await AsyncStorage.getItem('playerId');
      const findUser = players.find((player) => player.playerId === playerId);

      if (findUser) {
        setPlayer(findUser);
      }

      // const playerIndex = players.indexOf(findUser as Player);

      // if (playerIndex === 0) {
      //   playerLabel = resultsLabel.winner;
      // } else if (playerIndex > 0 && playerIndex <= 2) {
      //   playerLabel = resultsLabel.podium;
      // } else {
      //   playerLabel = resultsLabel.loser;
      // }

      const formattedPlayers = topPlayers.map((player, index) => {
        let place, height;
        if (index === 0) {
          place = 1;
          height = 90;
        } else if (index === 1) {
          if (topPlayers[0].totalPoints === topPlayers[1].totalPoints) {
            place = 1;
            height = 90;
          } else {
            place = 2;
            height = 60;
          }
        } else {
          if (topPlayers[0].totalPoints === topPlayers[2].totalPoints) {
            place = 1;
            height = 90;
          } else if (
            topPlayers[1].totalPoints === topPlayers[2].totalPoints ||
            topPlayers[0].totalPoints === topPlayers[1].totalPoints
          ) {
            place = 2;
            height = 60;
          } else {
            place = 3;
            height = 40;
          }
        }
        return {
          ...player,
          place,
          height,
        };
      });

      const topThreePlayer = formattedPlayers.find(
        (player) => player.playerId === findUser?.playerId,
      );

      let playerLabel;

      if (topThreePlayer) {
        if (topThreePlayer?.place === 1) {
          playerLabel = resultsLabel.winner;
        } else {
          playerLabel = resultsLabel.podium;
        }
      } else {
        playerLabel = resultsLabel.loser;
      }

      setLabel(playerLabel);

      setPlayerList([
        formattedPlayers[1],
        formattedPlayers[0],
        formattedPlayers[2],
      ]);
    };

    setResults(players);
  }, [players]);

  return (
    <>
      {players.length > 0 ? (
        <>
          <ParallaxScrollView>
            <ThemedView style={styles.textBox}>
              <ThemedText type='heading32'>
                {label.title} {player?.playerName}
              </ThemedText>
              <ThemedText>{label.description}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.podiumWrapper}>
              {playerList.map((player, index) => (
                <ThemedView key={index} style={styles.podiumContainer}>
                  <ThemedView style={styles.playerBox}>
                    <PlayerIcon
                      size={20}
                      color={player.playerIcon.color}
                      shape={player.playerIcon.shape as shape}
                    />
                    <ThemedText type='defaultSemiBold'>
                      {player.playerName}
                    </ThemedText>
                  </ThemedView>
                  <ThemedView
                    style={[styles.podiumBox, { height: player.height }]}
                  >
                    <ThemedText
                      type='defaultSemiBold'
                      textColor={Colors.light.contrastText}
                    >
                      {player.place}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
              ))}
            </ThemedView>
            <JoinedPlayers
              players={players}
              heading={labels.players}
              showPoints={true}
            />
          </ParallaxScrollView>
          <GradientContainer>
            <ButtonComponent
              text={button.newGame}
              variant='primary'
              route='/'
            />
          </GradientContainer>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  podiumWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: Sizes.Spacings.xxLarge,
  },
  podiumContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
  },
  podiumBox: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.light.contrastBlue,
    width: 95,
    paddingTop: Sizes.Spacings.small,
    alignItems: 'center',
  },
  playerBox: {
    flexDirection: 'row',
    gap: 5,
  },
  textBox: {
    margin: 'auto',
    gap: 15,
  },
});
