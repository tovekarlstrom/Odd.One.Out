import { ButtonComponent } from "@/components/ButtonComponent";
import { CardComponent } from "@/components/CardComponent";
import { GradientContainer } from "@/components/GradientContainer";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import PlayerIcon from "@/components/PlayerIcon";
import { TextField } from "@/components/TextField";
import { addPoints } from "@/functions/addPoints";
import { getAnswer } from "@/functions/getAnswer";
import { getPlayers } from "@/functions/getPlayers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Player } from "./code";
import { Colors, Sizes } from "@/constants/Theme";
import { getOrUpdateStatus } from "@/functions/getOrUpdateStatus";
import Loading from "@/components/Loading";
import { router } from "expo-router";

export interface PlayerAnswer {
  playerId: string;
  playerAnswer: string;
}

export default function Answers() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [answers, setAnswers] = useState<PlayerAnswer[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [status, setStatus] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const playerGetPoints: string[] = [];

  const getPlayerName = (playerId: string) => {
    if (!players.length) return "";
    const player = players.find((player) => player.playerId === playerId);
    return player ? player.playerName : "Unknown Player";
  };

  useEffect(() => {
    const getAnswers = async () => {
      const documentId = await AsyncStorage.getItem("gameRoom");
      if (documentId) {
        getAnswer(documentId, setAnswers);
        getPlayers(documentId, setPlayers);
      }
    };
    getAnswers();
  }, []);

  useEffect(() => {
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
    const getStatus = async () => {
      const gameRoom = await AsyncStorage.getItem("gameRoom");
      if (gameRoom) {
        await getOrUpdateStatus({ documentId: gameRoom, setStatus });
      }
    };
    getStatus();
    getAdmin();
  }, []);

  useEffect(() => {
    if (status === "active") {
      if (players.length !== 0 && answers.length === players.length) {
        setIsLoading(false);
      }
    }
    if (status === "idle") {
      router.push("/result");
    }
  }, [status, answers, players]);

  const handleSelectedAnswers = (playerId: string) => {
    playerGetPoints.push(playerId);
  };

  const enterPoints = async () => {
    const documentId = await AsyncStorage.getItem("gameRoom");

    if (documentId) {
      getOrUpdateStatus({ documentId, changeStatus: "idle" });

      addPoints(documentId, playerGetPoints);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ParallaxScrollView>
            <PlayerIcon size={80} color="red" />
            <View style={{ paddingTop: Sizes.Spacings.large }}>
              <CardComponent
                heading={isAdmin ? "Mark the right answers" : "The answers"}
                fullWidth
              >
                {answers &&
                  answers.map((answer, index) => (
                    <View key={index}>
                      <TextField
                        value={getPlayerName(answer.playerId)}
                        isClickable={isAdmin}
                        answer={answer.playerAnswer}
                        onPress={() => {
                          handleSelectedAnswers(answer.playerId);
                        }}
                      >
                        <PlayerIcon size={17} color="white" />
                      </TextField>
                    </View>
                  ))}
              </CardComponent>
            </View>
            {!isAdmin && (
              <Text
                style={{
                  textAlign: "center",
                  paddingVertical: 50,
                  color: Colors.light.placeholder,
                }}
              >
                Waiting for admin to enter points..
              </Text>
            )}
          </ParallaxScrollView>
          {isAdmin && (
            <GradientContainer>
              <ButtonComponent
                onSubmit={enterPoints}
                text="Enter points"
                variant="primary"
              />
            </GradientContainer>
          )}
        </>
      )}
    </>
  );
}
