import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Player } from '@/app/code';

export const removePlayer = async (documentId: string, playerId: string) => {
  try {
    const gameRoomRef = doc(db, 'gameRooms', documentId);

    const gameRoomSnap = await getDoc(gameRoomRef);

    if (gameRoomSnap.exists()) {
      const players = gameRoomSnap.data().players || [];
      const updatedPlayers = players.filter(
        (player: Player) => player.playerId !== playerId,
      );
      await updateDoc(gameRoomRef, {
        players: updatedPlayers,
      });
    }
  } catch (e) {
    console.error('ERROR removing player:', e);
  }
};
