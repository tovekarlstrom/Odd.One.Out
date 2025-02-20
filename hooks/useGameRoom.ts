import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useQueryClient } from 'react-query';

const getGameRoom = async () => {
  const gameRoom = await AsyncStorage.getItem('gameRoom');
  return gameRoom ? JSON.parse(gameRoom) : null;
};

export const useGameRoom = () => {
  const queryClient = useQueryClient();

  return useQuery('gameRoom', getGameRoom, {
    onError: () => {
      queryClient.invalidateQueries('gameRoom');
    },
  });
};
