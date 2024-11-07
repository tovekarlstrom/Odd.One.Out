import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useState } from "react";
import { Sizes } from "@/constants/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedView } from "@/components/ThemedView";
import LoadingIcons from "@/components/LoadingIcons";
import { getPlayers } from "@/functions/getPlayers";
import { Player } from "../app/code";
import { getOrUpdateStatus } from "@/functions/getOrUpdateStatus";
import { getAnswer } from "@/functions/getAnswer";
import { PlayerAnswer } from "@/app/answers";
import { useGameRoom } from "@/hooks/useGameRoom";

export default function Loading() {
  const [answers, setAnswers] = useState<PlayerAnswer[]>([]);
  const [status, setStatus] = useState<string>("");
  const [players, setPlayers] = useState<Player[]>([]);
  const { data: documentId } = useGameRoom();

  useEffect(() => {
    const getAnswers = async () => {
      if (documentId) {
        getAnswer(documentId, setAnswers);
      }
    };
    getAnswers();
  }, [documentId]);

  const getGameRoomPlayers = async () => {
    if (documentId) {
      const unsubscribe = await getPlayers(documentId, setPlayers);
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  };

  const getStatus = async () => {
    if (documentId) {
      await getOrUpdateStatus({ documentId, setStatus });
    }
  };

  useEffect(() => {
    getStatus();
    getGameRoomPlayers();
  }, []);

  return (
    <>
      <ThemedView style={styles.outerBox}>
        <LoadingIcons />
        {status === "active" ? (
          <>
            <ThemedView style={styles.textBox}>
              <ThemedText type="heading24">Patience!</ThemedText>
              <ThemedText type="heading24">
                Someone is still thinking..
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.progressBox}>
              <ThemedText type="heading24">{`${answers.length}/${players.length}`}</ThemedText>
            </ThemedView>
          </>
        ) : status === "waiting" ? (
          <ThemedView style={styles.textBox}>
            <ThemedText type="heading24">Hold tight!</ThemedText>
            <ThemedText type="heading24">The fun is about to start</ThemedText>
          </ThemedView>
        ) : (
          <></>
        )}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  outerBox: {
    alignItems: "center",
    justifyContent: "center",
    gap: Sizes.Spacings.xxLarge,
    paddingTop: 100,
  },
  progressBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Sizes.Spacings.small,
  },
  textBox: {
    alignItems: "center",
    justifyContent: "center",
    gap: Sizes.Spacings.small,
    width: "90%",
  },
});
