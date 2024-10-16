import { View } from "react-native";
import { CardComponent } from "./CardComponent";
import PlayerIcon from "./PlayerIcon";
import { TextField } from "./TextField";
import { ThemedText } from "./ThemedText";
import { Sizes } from "@/constants/Theme";

export function JoinedPlayers({ heading }: { heading: string }) {
  const players = [
    { name: "Klara", points: undefined },
    { name: "Johannes", points: undefined },
    { name: "Sara", points: undefined },
    { name: "Kalle", points: 4 },
    { name: "Sara", points: undefined },
  ];

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
