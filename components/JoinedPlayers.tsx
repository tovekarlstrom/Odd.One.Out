import { View } from "react-native";
import { CardComponent } from "./CardComponent";
import PlayerIcon from "./PlayerIcon";
import { TextField } from "./TextField";
import { ThemedText } from "./ThemedText";
import { Sizes } from "@/constants/Theme";
import { useEffect, useState } from "react";

interface Player {
  name: string;
  points?: number;
}

interface JoinedPlayersProps {
  heading: string;
  topPlayers?: boolean;
}
export function JoinedPlayers({ heading, topPlayers }: JoinedPlayersProps) {
  const [players, setPlayers] = useState<Player[] | undefined>(undefined);

  useEffect(() => {
    const players: Player[] = [
      { name: "Klara", points: 2 },
      { name: "Johannes", points: 1 },
      { name: "Sara", points: undefined },
      { name: "Kalle", points: 4 },
      { name: "Sara", points: undefined },
    ];
    if (topPlayers) {
      players.sort((a, b) => (a.points || 0) - (b.points || 0)).reverse();
      setPlayers(players.slice(0, 3));
    } else {
      setPlayers(players);
    }
  }, [topPlayers]);

  return (
    <CardComponent heading={heading}>
      {players ? (
        players.map((player, index) => (
          <TextField key={index} value={player.name} points={player.points}>
            <PlayerIcon size={20} />
          </TextField>
        ))
      ) : (
        <View style={{ paddingVertical: Sizes.Spacings.medium }}>
          <ThemedText type="default">Waiting for players to join</ThemedText>
        </View>
      )}
    </CardComponent>
  );
}
