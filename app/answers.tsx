import { ButtonComponent } from "@/components/ButtonComponent";
import { CardComponent } from "@/components/CardComponent";
import { GradientContainer } from "@/components/GradientContainer";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import PlayerIcon from "@/components/PlayerIcon";
import { TextField } from "@/components/TextField";
import { addPoints } from "@/functions/addPoints";
import { getAnswer } from "@/functions/getAnswer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Colors, Sizes } from "@/constants/Theme";
import { getOrUpdateStatus } from "@/functions/getOrUpdateStatus";
import Loading from "@/components/Loading";
import { router } from "expo-router";
import { useGameRoom } from "@/hooks/useGameRoom";
import { useSortedPlayers } from "@/hooks/useSortedPlayers";
import data from "../public/content.json";

export interface PlayerAnswer {
  playerId: string;
  playerAnswer: string;
}

export default function Answers() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [answers, setAnswers] = useState<PlayerAnswer[]>([]);
  const [status, setStatus] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const playerGetPoints: string[] = [];
  const { data: documentId } = useGameRoom();
  const players = useSortedPlayers();
  const labels = data.content.labels;
  const button = data.content.buttons;

  const getPlayerName = (playerId: string) => {
    if (!players.length) return "";
    const player = players.find((player) => player.playerId === playerId);
    return player ? player.playerName : "Unknown Player";
  };

  useEffect(() => {
    const getAnswers = async () => {
      if (documentId) {
        getAnswer(documentId, setAnswers);
      }
    };
    getAnswers();
  }, [documentId]);

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
      if (documentId) {
        await getOrUpdateStatus({ documentId, setStatus });
      }
    };
    getStatus();
    getAdmin();
  }, [documentId]);

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
    if (documentId) {
      getOrUpdateStatus({ documentId, changeStatus: "idle" });

      addPoints(documentId, playerGetPoints);
    }
  };

  return (
    <>
      <ParallaxScrollView>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <PlayerIcon size={80} />
            <View style={{ paddingTop: Sizes.Spacings.large }}>
              <CardComponent
                heading={isAdmin ? labels.answersAdmin : labels.answersPlayer}
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
                        <PlayerIcon size={17} />
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
                {labels.waitForAdmin}
              </Text>
            )}
          </>
        )}
      </ParallaxScrollView>
      {isAdmin && !isLoading && (
        <GradientContainer>
          <ButtonComponent
            onSubmit={enterPoints}
            text={button.enterPoints}
            variant="primary"
            route="/game"
          />
        </GradientContainer>
      )}
    </>
  );
}
