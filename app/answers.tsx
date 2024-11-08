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
import { Player } from "./code";
import { Colors, Sizes } from "@/constants/Theme";
import { getOrUpdateStatus } from "@/functions/getOrUpdateStatus";
import Loading from "@/components/Loading";
import { router } from "expo-router";
import { useGameRoom } from "@/hooks/useGameRoom";
import { useSortedPlayers } from "@/hooks/useSortedPlayers";
import { usePlayerIcon } from "@/hooks/usePlayerIcon";
import { shape } from "@/utils/getIconColorAndShape";

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
  const { data: playerIcon } = usePlayerIcon();
  const players = useSortedPlayers();

  const getPlayerAnswer = (playerId: string) => {
    if (!answers.length) return "";
    const answer = answers.find((answer) => answer.playerId === playerId);
    return answer ? answer.playerAnswer : "Unknown Answer";
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
      <ParallaxScrollView paddingTop={20}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <PlayerIcon
              paddingBottom={20}
              size={80}
              color={playerIcon.color}
              shape={playerIcon.shape}
            />
            <View style={{ paddingTop: Sizes.Spacings.large }}>
              <CardComponent
                heading={isAdmin ? "Mark the right answers" : "The answers"}
                fullWidth
              >
                {players &&
                  players.map((player, index) => (
                    <View key={index}>
                      <TextField
                        value={player.playerName}
                        isClickable={isAdmin}
                        answer={getPlayerAnswer(player.playerId)}
                        onPress={() => {
                          handleSelectedAnswers(player.playerId);
                        }}
                      >
                        <PlayerIcon
                          size={17}
                          color={player.playerIcon.color}
                          shape={player.playerIcon.shape as shape}
                        />
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
          </>
        )}
      </ParallaxScrollView>
      {isAdmin && !isLoading && (
        <GradientContainer>
          <ButtonComponent
            onSubmit={enterPoints}
            text="Enter points"
            variant="primary"
            route="/game"
          />
        </GradientContainer>
      )}
    </>
  );
}
