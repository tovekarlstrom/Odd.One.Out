import { View, StyleSheet } from 'react-native';
import { CardComponent } from './CardComponent';
import PlayerIcon from './PlayerIcon';
import { TextField } from './TextField';

import { useEffect, useState } from 'react';
import { shape } from '@/utils/getIconColorAndShape';
import { RoundButton } from './RoundButton';
import { removePlayer } from '@/functions/removePlayer';
import { useGameRoom } from '@/hooks/useGameRoom';
import { Player } from '@/app/code';

interface JoinedPlayersProps {
  heading: string;
  players: Player[] | undefined;
  topPlayers?: boolean;
  handlePlayers?: boolean;
  showPoints?: boolean;
  showListLength?: boolean;
}
export function JoinedPlayers({
  heading,
  players,
  topPlayers,
  handlePlayers = false,
  showPoints = false,
  showListLength,
}: JoinedPlayersProps) {
  const [playerList, setPlayerList] = useState<Player[] | undefined>(undefined);
  const [listLength, setListLength] = useState<string>('');
  const { data: gameRoom } = useGameRoom();
  const documentId = gameRoom?.id;

  useEffect(() => {
    if (!players) return;

    if (topPlayers) {
      setPlayerList(players.slice(0, 3));
    } else {
      setPlayerList(players);
    }
  }, [topPlayers, players]);

  useEffect(() => {
    if (playerList && playerList.length > 0) {
      setListLength(`(${playerList.length})`);
    }
  }, [playerList]);

  const topHeading = showListLength ? `${heading} ${listLength}` : heading;

  const handleRemovePlayer = async (playerId: string) => {
    if (players && players.length <= 3) {
      alert('You need at least 3 players to continue the game');
    } else if (documentId) {
      await removePlayer(documentId, playerId);
    }
  };

  return (
    <CardComponent heading={topHeading} fullWidth={showPoints || handlePlayers}>
      {playerList &&
        playerList.map((player, index) => (
          <View style={styles.playerContainer} key={index}>
            <TextField
              key={index}
              value={player.playerName}
              points={showPoints ? player.totalPoints.toString() : ''}
            >
              <PlayerIcon
                size={20}
                color={player.playerIcon.color}
                shape={player.playerIcon.shape as shape}
              />
            </TextField>
            {handlePlayers && (
              <RoundButton
                onPress={() => handleRemovePlayer(player.playerId)}
                isAdding={false}
              />
            )}
          </View>
        ))}
    </CardComponent>
  );
}

const styles = StyleSheet.create({
  playerContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
});
