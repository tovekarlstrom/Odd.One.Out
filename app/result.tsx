import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { getPlayers } from "@/functions/getPlayers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { View, Vibration } from "react-native";
import { Player } from "./code";
import { GradientContainer } from "@/components/GradientContainer";
import { ButtonComponent } from "@/components/ButtonComponent";
import { getOrUpdateStatus } from "@/functions/getOrUpdateStatus";
import { router } from "expo-router";
import { updateIndex } from "@/functions/getOrUpdateIndex";
import { JoinedPlayers } from "@/components/JoinedPlayers";
import { getQuestion } from "@/functions/getQuestion";
export default function RoundResult() {
  const [scored, setScored] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [status, setStatus] = useState<string>();
  const [questionsLength, setQuestionsLength] = useState(0);
  const [countDown, setCountDown] = useState(5);
  const [index, setIndex] = useState(0);
  const [countdownStarted, setCountdownStarted] = useState(false);

  useEffect(() => {
    const getAllPlayers = async () => {
      const gameRoom = await AsyncStorage.getItem("gameRoom");
      if (gameRoom) {
        const unsubscribe = await getPlayers(gameRoom, setPlayers);
        return () => {
          if (unsubscribe) {
            unsubscribe();
          }
        };
      }
    };
    const getQuestionLength = async () => {
      const gameRoom = await AsyncStorage.getItem("gameRoom");
      if (gameRoom) {
        const unsubscribe = await getQuestion(
          gameRoom,
          undefined,
          setQuestionsLength
        );
        return () => {
          if (unsubscribe) {
            unsubscribe();
          }
        };
      }
    };
    const getAdmin = async () => {
      const admin = await AsyncStorage.getItem("isAdmin");
      if (admin) {
        const parsedAdmin = JSON.parse(admin);
        if (parsedAdmin === true) {
          setIsAdmin(parsedAdmin);
        } else {
          setIsAdmin(false);
        }
      }
    };
    const getStatusAndIndex = async () => {
      const documentId = await AsyncStorage.getItem("gameRoom");
      if (documentId) {
        await updateIndex(documentId, setIndex);
        const unsubscribe = await getOrUpdateStatus({
          documentId,
          setStatus,
        });
        return () => {
          if (unsubscribe) {
            unsubscribe();
          }
        };
      }
    };
    getQuestionLength();
    getAdmin();
    getStatusAndIndex();
    getAllPlayers();
  }, []);

  useEffect(() => {
    const checkScore = async () => {
      const playerId = await AsyncStorage.getItem("playerId");
      if (playerId && players) {
        const findUser = players.find((player) => player.playerId === playerId);
        if (findUser) {
          if (findUser.points[findUser.points.length - 1] === 1) {
            setScored(true);
          }
        }
      }
    };
    checkScore();
  }, [players]);

  useEffect(() => {
    if (status === "active") {
      setCountdownStarted(true);
      setCountDown(5);
      const vibrate = () => {
        const intervalId = setInterval(() => {
          setCountDown((prevCountDown) => {
            Vibration.vibrate(500);
            if (prevCountDown > 1) {
              return prevCountDown - 1;
            } else {
              clearInterval(intervalId);
              if (index === questionsLength) {
                router.push("/");
                return 0;
              } else {
                router.push("/game");
                return 0;
              }
            }
          });
        }, 1000);
      };
      vibrate();
    }
  }, [status, index]);

  const nextQuestion = async () => {
    const documentId = await AsyncStorage.getItem("gameRoom");
    if (documentId) {
      getOrUpdateStatus({ documentId, changeStatus: "active" });
      await updateIndex(documentId, undefined, true);
    }
  };

  return (
    <>
      <ParallaxScrollView>
        <View>
          <ThemedText style={{ paddingBottom: 57 }} type="heading32">
            {scored
              ? "You’re in sync with the group, points for you!"
              : "You went your own way, no points this time"}
          </ThemedText>

          <ThemedText style={{ marginBottom: 47 }} type="default">
            {scored ? 1 : 0} point added to your score
          </ThemedText>

          <JoinedPlayers
            heading="Top 3 players"
            players={players}
            showPoints
            topPlayers
            fullWidth
          />
        </View>
      </ParallaxScrollView>

      <GradientContainer>
        {index === questionsLength ? (
          <ButtonComponent variant="primary" text="End game" route="/" />
        ) : isAdmin && !countdownStarted ? (
          <ButtonComponent
            text="Next round"
            variant="primary"
            onSubmit={nextQuestion}
          />
        ) : countdownStarted ? (
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 10 }}>
            Game starts in {countDown}
          </ThemedText>
        ) : null}
      </GradientContainer>
    </>
  );
}
