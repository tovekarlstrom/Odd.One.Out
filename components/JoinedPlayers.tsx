import { CardComponent } from "./CardComponent";
import PlayerIcon from "./PlayerIcon";
import { TextField } from "./TextField";

export function JoinedPlayers() {
  return (
    <CardComponent heading="Joined Players">
      <TextField value="Klara">
        <PlayerIcon size={20} />
      </TextField>
    </CardComponent>
  );
}
