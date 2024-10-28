import { ButtonComponent } from "@/components/ButtonComponent";
import { CardComponent } from "@/components/CardComponent";
import { GradientContainer } from "@/components/GradientContainer";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import PlayerIcon from "@/components/PlayerIcon";
import { TextField } from "@/components/TextField";
import { addPoints } from "@/functions/addPoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { documentId } from "firebase/firestore";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Answers() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [playerAnswers, setPlayerAnswers] = useState([
    {
      playerName: "Vilma",
      playerId: "44",
      playerAnswer: "Orange",
    },
    {
      playerName: "Hanna",
      playerId: "23",
      playerAnswer: "Den runda söta frukten",
    },
    {
      playerName: "Karl",
      playerId: "23",
      playerAnswer: "Citrus",
    },
    {
      playerName: "Johannes",
      playerId: "4",
      playerAnswer: "Orange",
    },
  ]);

  useEffect(() => {
    const getAdmin = async () => {
      const admin = await AsyncStorage.getItem("isAdmin");

      if (admin) {
        const parsedAdmin = JSON.parse(admin);
        if (parsedAdmin === true) {
          console.log("admin", parsedAdmin);
          setIsAdmin(parsedAdmin);
        } else {
          console.log("adminFalse", parsedAdmin);
          setIsAdmin(false);
        }
      } else {
        console.error("No isAdmin in storage");
        setIsAdmin(false);
      }
    };
    getAdmin();
  }, []);

  const handleSelectedAnswers = async (playerId: string) => {
    const documentId = await AsyncStorage.getItem("gameRoom");
    if (documentId) {
      addPoints(documentId, playerId);
    }
  };

  return (
    <>
      <ParallaxScrollView>
        <View>
          <CardComponent
            heading={isAdmin ? "Mark the right answers" : "The answers"}
            fullWidth
          >
            {playerAnswers &&
              playerAnswers.map((answer, index) => (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() => handleSelectedAnswers(answer.playerId)}
                  >
                    <TextField
                      value={answer.playerName}
                      isClickable={isAdmin}
                      answer={answer.playerAnswer}
                    >
                      <PlayerIcon size={17} />
                    </TextField>
                  </TouchableOpacity>
                </View>
              ))}
          </CardComponent>
        </View>
      </ParallaxScrollView>
      {isAdmin && (
        <GradientContainer>
          <ButtonComponent text="Start Game" variant="primary" route="/game" />
        </GradientContainer>
      )}
    </>
  );
}
