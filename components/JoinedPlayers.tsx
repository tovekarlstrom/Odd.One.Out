import { View } from "react-native";
import { CardComponent } from "./CardComponent";
import PlayerIcon from "./PlayerIcon";
import { TextField } from "./TextField";
import { ThemedText } from "./ThemedText";
import { Sizes } from "@/constants/Theme";
import { Key, useEffect, useState } from "react";
import { Player } from "@/app/code";

interface JoinedPlayersProps {
  heading: string;
  topPlayers?: boolean;
  showPoints?: boolean;
  players: Player[] | undefined;
}
export function JoinedPlayers({
  heading,
  topPlayers,
  showPoints,
  players,
}: JoinedPlayersProps) {
  const [playerList, setPlayerList] = useState<Player[] | undefined>(undefined);

  useEffect(() => {
    if (!players) return;

    if (topPlayers) {
      players.sort((a, b) => (a.points || 0) - (b.points || 0)).reverse();
      setPlayerList(players.slice(0, 3));
    } else {
      setPlayerList(players);
    }
  }, [topPlayers, players]);

  return (
    <CardComponent heading={heading}>
      {playerList ? (
        playerList.map((player, index) => (
          <View key={index}>
            {showPoints ? (
              <TextField
                key={index}
                value={player.playerName}
                points={player.points.toString()}
              >
                <PlayerIcon size={20} />
              </TextField>
            ) : (
              <TextField key={index} value={player.playerName}>
                <PlayerIcon size={20} />
              </TextField>
            )}
          </View>
        ))
      ) : (
        <View style={{ paddingVertical: Sizes.Spacings.medium }}>
          <ThemedText type="default">Waiting for players to join</ThemedText>
        </View>
      )}
    </CardComponent>
  );
}
