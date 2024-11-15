import { getDocs, query, where, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Function to get a specific game room from the roomId and returning the documentID used for fireStore
export const getGameRoom = async (roomId: string) => {
  const gameRoomsRef = collection(db, 'gameRooms');
  const q = query(gameRoomsRef, where('roomId', '==', roomId));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.error('No game room found');
    return;
  }

  const gameRoomDoc = querySnapshot.docs[0];
  console.log('getGame', gameRoomDoc.data());
  const id = gameRoomDoc.id;
  const mode = gameRoomDoc.data().mode;

  return { id, mode };
};
