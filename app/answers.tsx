import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function Answers() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const getAdmin = async () => {
      const admin = await AsyncStorage.getItem("isAdmin");

      if (admin) {
        const parsedAdmin = JSON.parse(admin);
        setIsAdmin(parsedAdmin);
      } else {
        console.error("No roomId in storage");
        setIsAdmin(false);
      }
    };
    getAdmin();
  }, []);
  return (
    <>
      {isAdmin ? (
        <View>
          <Text>Admin</Text>
        </View>
      ) : (
        <View>
          <Text>Player</Text>
        </View>
      )}
    </>
  );
}
