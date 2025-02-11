import AsyncStorage from '@react-native-async-storage/async-storage';

const loadGameCode = async () => {
  try {
    const roomId = await AsyncStorage.getItem('roomId');

    if (!roomId) {
      console.log('No roomId in storage');
      return null;
    }

    return roomId;
  } catch (e) {
    console.error('Error loading from storage', e);
    return null;
  }
};

export const getGameCode = async (setGameCode: (code: string) => void) => {
  const roomCode = await loadGameCode();
  if (roomCode) {
    setGameCode(roomCode);
  }
};
