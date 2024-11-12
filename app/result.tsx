import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useCallback } from "react";
import { View, Vibration } from "react-native";
import { GradientContainer } from "@/components/GradientContainer";
import { ButtonComponent } from "@/components/ButtonComponent";
import { getOrUpdateStatus } from "@/functions/getOrUpdateStatus";
import { router } from "expo-router";
import { updateIndex } from "@/functions/getOrUpdateIndex";
import { JoinedPlayers } from "@/components/JoinedPlayers";
import { getQuestion } from "@/functions/getQuestion";
import { useGameRoom } from "@/hooks/useGameRoom";
import { useSortedPlayers } from "@/hooks/useSortedPlayers";
import data from "../public/content.json";

export const getRandomString = (arr: string[]): string => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export default function RoundResult() {
  const [scored, setScored] = useState<boolean | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState(false);
  const [status, setStatus] = useState<string>();
  const [questionsLength, setQuestionsLength] = useState<number>(0);
  const [countDown, setCountDown] = useState(5);
  const [index, setIndex] = useState<number | undefined>(undefined);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const { data: documentId } = useGameRoom();
  const players = useSortedPlayers();
  const labels = data.content.labels;
  const button = data.content.buttons;

  useEffect(() => {
    const getQuestionLength = async () => {
      if (documentId) {
        await getQuestion(documentId, undefined, setQuestionsLength);
      }
    };
    const getAdmin = async () => {
      const admin = await AsyncStorage.getItem("isAdmin");
      if (admin) {
        const parsedAdmin = JSON.parse(admin);
        if (parsedAdmin === true) {
          setIsAdmin(parsedAdmin);
        }
      }
    };
    const getStatusAndIndex = async () => {
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
  }, [documentId]);

  useEffect(() => {
    const checkScore = async () => {
      const playerId = await AsyncStorage.getItem("playerId");
      if (playerId && players) {
        const findUser = players.find((player) => player.playerId === playerId);
        if (findUser) {
          if (findUser.points[findUser.points.length - 1] === 1) {
            setScored(true);
          } else {
            setScored(false);
          }
        }
      }
    };
    checkScore();
  }, [players]);

  useEffect(() => {
    if (status === "active") {
      // setCountdownStarted(true);
      // setCountDown(5);
      // const vibrate = () => {
      //   const intervalId = setInterval(() => {
      //     setCountDown((prevCountDown) => {
      //       if (prevCountDown > 1) {
      //         Vibration.vibrate(500);
      //         return prevCountDown - 1;
      //       } else {
      //         clearInterval(intervalId);
      router.push("/game");
      //           return 0;
      //         }
      //       });
      //     }, 1000);
    }
    //   vibrate();
    // }
  }, [status]);

  const nextQuestion = useCallback(async () => {
    if (documentId) {
      await getOrUpdateStatus({ documentId, changeStatus: "active" });
      await updateIndex(documentId, undefined, true);
    }
  }, []);

  return (
    <>
      <ParallaxScrollView>
        {scored !== undefined && (
          <View>
            <ThemedText style={{ paddingBottom: 57 }} type="heading32">
              {scored
                ? getRandomString(labels.score.right)
                : getRandomString(labels.score.wrong)}
            </ThemedText>

            <ThemedText style={{ marginBottom: 47 }} type="default">
              {scored ? 1 : 0} {labels.pointsAdded}
            </ThemedText>

            <JoinedPlayers
              heading={labels.topThree}
              players={players}
              showPoints
              topPlayers
            />
          </View>
        )}
      </ParallaxScrollView>

      <GradientContainer>
        {countdownStarted ? (
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 10 }}>
            {labels.gameCountdown} {countDown}
          </ThemedText>
        ) : index && index === questionsLength - 1 ? (
          <ButtonComponent
            variant="primary"
            text={button.endGame}
            route="/scoreboard"
          />
        ) : isAdmin ? (
          <ButtonComponent
            text={button.nextRound}
            variant="primary"
            onSubmit={nextQuestion}
          />
        ) : null}
      </GradientContainer>
    </>
  );
}
