import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";

const getPlayerIcon = async () => {
  const icon = await AsyncStorage.getItem("icon");
  const parsedIcon = JSON.parse(icon || "{}");
  return parsedIcon;
};
export const usePlayerIcon = () => {
  return useQuery("playerIcon", getPlayerIcon);
};
