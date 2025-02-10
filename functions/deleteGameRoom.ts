import { db } from '@/firebaseConfig';
import { deleteDoc, doc } from 'firebase/firestore';

export const deleteGameRoom = async (documentId: string) => {
  console.log('Deleting game room...', documentId);
  try {
    const gameRoomRef = doc(db, 'gameRooms', documentId);
    await deleteDoc(gameRoomRef);
    console.log('Game room deleted successfully!');
  } catch (e) {
    console.error('ERROR deleting game room:', e);
  }
};
