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
import { ModalComponent } from './Modal';
import { ButtonComponent } from './ButtonComponent';
import { ThemedText } from './ThemedText';
import data from '../public/content.json';

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
  const [showModal, setShowModal] = useState(false);

  const { data: gameRoom } = useGameRoom();
  const documentId = gameRoom?.id;

  const labels = data.content.labels;
  const buttons = data.content.buttons;

  const handleBackdropPress = () => {
    setShowModal(false);
  };

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
      setShowModal(true);
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
              showStatus={'hasAnswered' in player ? true : false}
              status={'hasAnswered' in player ? player.hasAnswered : undefined}
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
      {showModal && (
        <ModalComponent
          onClose={handleBackdropPress}
          heading={labels.cantRemove.title}
        >
          <ThemedText type='default' style={{ padding: 15 }}>
            {labels.cantRemove.description}
          </ThemedText>
          <ButtonComponent
            text={buttons.ok}
            variant='primary'
            onSubmit={() => setShowModal(false)}
          />
        </ModalComponent>
      )}
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
