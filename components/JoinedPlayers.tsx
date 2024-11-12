import { View } from "react-native";
import { CardComponent } from "./CardComponent";
import PlayerIcon from "./PlayerIcon";
import { TextField } from "./TextField";

import { useEffect, useState } from "react";
import { Player } from "@/app/code";
import { shape } from "@/utils/getIconColorAndShape";

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
  const [listLength, setListLength] = useState<string>("");

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

  return (
    <CardComponent heading={topHeading} fullWidth={showPoints || false}>
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
