import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useMemo, useState } from "react";
import { Sizes } from "@/constants/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedView } from "@/components/ThemedView";
import LoadingIcons from "@/components/LoadingIcons";
import { getOrUpdateStatus } from "@/functions/getOrUpdateStatus";
import { getAnswer } from "@/functions/getAnswer";
import { PlayerAnswer } from "@/app/answers";
import { useGameRoom } from "@/hooks/useGameRoom";
import { useSortedPlayers } from "@/hooks/useSortedPlayers";

type status = "active" | "waiting";

export default function Loading({ prelStatus }: { prelStatus?: status }) {
  const [answers, setAnswers] = useState<PlayerAnswer[]>([]);
  const [status, setStatus] = useState<string>(prelStatus || "");
  const players = useSortedPlayers();

  const memoizedPlayers = useMemo(() => players, [players]);
  const { data: documentId } = useGameRoom();

  useEffect(() => {
    const getAnswers = async () => {
      if (documentId) {
        getAnswer(documentId, setAnswers);
      }
    };
    getAnswers();
  }, [documentId]);

  const getStatus = async () => {
    if (documentId) {
      await getOrUpdateStatus({ documentId, setStatus });
    }
  };

  useEffect(() => {
    getStatus();
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
              <ThemedText type="heading24">{`${answers.length}/${memoizedPlayers.length}`}</ThemedText>
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
