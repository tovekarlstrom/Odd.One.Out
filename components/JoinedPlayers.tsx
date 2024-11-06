import { View } from "react-native";
import { CardComponent } from "./CardComponent";
import PlayerIcon from "./PlayerIcon";
import { TextField } from "./TextField";

import { useEffect, useState } from "react";
import { Player } from "@/app/code";

interface JoinedPlayersProps {
  heading: string;
  topPlayers?: boolean;
  showPoints?: boolean;
  players: Player[] | undefined;
  fullWidth?: boolean;
}
export function JoinedPlayers({
  heading,
  topPlayers,
  showPoints,
  players,
  fullWidth,
}: JoinedPlayersProps) {
  const [playerList, setPlayerList] = useState<Player[] | undefined>(undefined);
  const [listLength, setListLength] = useState<string>("");

  useEffect(() => {
    if (!players) return;

    const playersWithTotalPoints = players.map((player) => ({
      ...player,
      totalPoints: player.points.reduce((acc, point) => acc + point, 0),
    }));

    const sortedPlayers = playersWithTotalPoints.sort(
      (a, b) => b.totalPoints - a.totalPoints
    );

    if (topPlayers) {
      setPlayerList(sortedPlayers.slice(0, 3));
    } else {
      setPlayerList(sortedPlayers);
    }
  }, [topPlayers, players]);

  useEffect(() => {
    if (playerList && playerList.length > 0) {
      setListLength(`(${playerList.length})`);
    }
  }, [playerList]);

  return (
    <CardComponent
      heading={`${heading} ${listLength}`}
      fullWidth={fullWidth ? true : false}
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
                <PlayerIcon size={20} color="green" />
              </TextField>
            ) : (
              <TextField key={index} value={player.playerName}>
                <PlayerIcon size={20} color="blue" />
              </TextField>
            )}
          </View>
        ))}
    </CardComponent>
  );
}
