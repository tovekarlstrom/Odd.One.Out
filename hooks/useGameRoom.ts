import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";

const getGameRoom = async () => {
  const gameRoom = await AsyncStorage.getItem("gameRoom");
  return gameRoom;
};

export const useGameRoom = () => {
  return useQuery("gameRoom", getGameRoom);
};
