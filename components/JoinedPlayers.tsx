import { View } from 'react-native';
import { CardComponent } from './CardComponent';
import PlayerIcon from './PlayerIcon';
import { TextField } from './TextField';

import { useEffect, useState } from 'react';
import { Player } from '@/app/code';
import { shape } from '@/utils/getIconColorAndShape';
import { useLanguage } from '@/hooks/useLanguage';

interface JoinedPlayersProps {
  heading: string;
  topPlayers?: boolean;
  showPoints?: boolean;
  showListLength?: boolean;
  players: Player[] | undefined;
}
export function JoinedPlayers({
  heading,
  topPlayers,
  showPoints,
  showListLength,
  players,
}: JoinedPlayersProps) {
  const [playerList, setPlayerList] = useState<Player[] | undefined>(undefined);
  const [listLength, setListLength] = useState<string>('');
  const [topHeading, setTopHeading] = useState<string>('');
  const { content, isLoading, error } = useLanguage();

  const labels = content?.labels;

  useEffect(() => {
    if (!players) return;

    const playersWithPoints = players.filter(
      (player) => player.totalPoints > 0,
    );

    if (topPlayers) {
      console.log(players);
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

  if (isLoading || error) return null;

  return (
    <CardComponent
      heading={topHeading || defaultHeading}
      fullWidth={showPoints || false}
    >
      {playerList &&
        playerList.map((player, index) => (
          <View key={index}>
            {showPoints ? (
              <TextField
                key={index}
                value={player.playerName}
                points={player.totalPoints.toString()}
              >
                <PlayerIcon
                  size={20}
                  color={player.playerIcon.color}
                  shape={player.playerIcon.shape as shape}
                />
              </TextField>
            ) : (
              <TextField key={index} value={player.playerName}>
                <PlayerIcon
                  size={20}
                  color={player.playerIcon.color}
                  shape={player.playerIcon.shape as shape}
                />
              </TextField>
            )}
          </View>
        ))}
    </CardComponent>
  );
}
