import { Player } from '@/app/code';
import { getPlayers } from '@/functions/getPlayers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

export function useSortedPlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);

  const getAllPlayers = useCallback(async () => {
    const gameRoom = await AsyncStorage.getItem('gameRoom');
    if (gameRoom) {
      const parsedGameRoom = JSON.parse(gameRoom);
      await getPlayers(parsedGameRoom.id, setPlayers);
    }
  }, []);

  useEffect(() => {
    getAllPlayers();
  }, [getAllPlayers]);

  useEffect(() => {
    if (!players || players.length === 0) return;

    const playersWithTotalPoints = players.map((player) => ({
      ...player,
      totalPoints: player.points.reduce((acc, point) => acc + point, 0),
    }));

    const sorted = playersWithTotalPoints.sort(
      (a, b) => b.totalPoints - a.totalPoints,
    );

    setSortedPlayers(sorted);
  }, [players]);

  return sortedPlayers;
}
