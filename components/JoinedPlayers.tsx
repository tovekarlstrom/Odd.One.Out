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
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [topHeading, setTopHeading] = useState<string>('');
  const [clickedPlayer, setClickedPlayer] = useState<string>('');

  const { data: gameRoom } = useGameRoom();
  const documentId = gameRoom?.id;

  const labels = data.content.labels;

  useEffect(() => {
    if (!players) return;

    const playersWithPoints = players.filter(
      (player) => player.totalPoints > 0,
    );

    if (topPlayers) {
      setPlayerList(playersWithPoints.slice(0, 3));
    } else {
      setPlayerList(players);
    }
  }, [topPlayers, players]);

  useEffect(() => {
    if (playerList && playerList.length > 0) {
      setListLength(`(${playerList.length})`);
    }
    if (topPlayers) {
      if (playerList) {
        if (playerList.length === 1) {
          setTopHeading(labels.topPlayer);
        } else if (playerList.length > 1) {
          setTopHeading(heading);
        }
      } else {
        setTopHeading(labels.noPoints);
      }
    }
  }, [playerList, topPlayers]);

  const defaultHeading = showListLength ? `${heading} ${listLength}` : heading;

  const handleRemovePlayer = async (playerId: string) => {
    if (documentId) {
      await removePlayer(documentId, playerId);
    }
  };

  const handleModals = (player: string) => {
    if (players && players.length <= 3) {
      setShowWarningModal(true);
    } else {
      setClickedPlayer(player);
      setShowQuestionModal(true);
    }
  };

  return (
    <CardComponent
      heading={topHeading || defaultHeading}
      fullWidth={showPoints || handlePlayers}
    >
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
                disabled={player.isAdmin === true}
                onPress={() => handleModals(player.playerId)}
                isAdding={false}
              />
            )}
          </View>
        ))}
      {showWarningModal && (
        <ModalComponent
          onClose={() => setShowWarningModal(false)}
          heading={labels.cantRemove.title}
          description={labels.cantRemove.description}
          oneButton={true}
        />
      )}
      {showQuestionModal && (
        <ModalComponent
          onClose={() => setShowQuestionModal(false)}
          onContinue={() => {
            handleRemovePlayer(clickedPlayer);
          }}
          heading={labels.areYouSureRemove.title}
          description={labels.areYouSureRemove.description}
          twoButtons={true}
        />
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
