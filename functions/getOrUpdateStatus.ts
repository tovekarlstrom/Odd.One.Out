import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

type Status = 'waiting' | 'active' | 'idle';

interface getOrUpdateStatusProps {
  documentId: string;
  changeStatus?: Status;
  setStatus?: (status: Status) => void;
}

export const getOrUpdateStatus = async ({
  documentId,
  changeStatus,
  setStatus,
}: getOrUpdateStatusProps) => {
  try {
    if (!documentId || typeof documentId !== 'string') {
      console.error('Invalid documentId provided:', documentId);
      return;
    }

    const gameRoomRef = doc(db, 'gameRooms', documentId);

    if (setStatus) {
      // Listen for changes to the status field
      const unsubscribe = onSnapshot(gameRoomRef, (snapshot) => {
        if (snapshot.exists()) {
          const gameRoomData = snapshot.data();
          const localStatus = gameRoomData.status as Status;
          setStatus(localStatus);
        } else {
          return;
          // console.error('No game room found!');
        }
      });
      return unsubscribe;
    }

    if (changeStatus) {
      // Update the status field explicitly
      await updateDoc(gameRoomRef, { status: changeStatus });
    }
  } catch (e) {
    console.error('Error updating or getting status:', e);
  }
};
