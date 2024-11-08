import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import PlayerIcon from "@/components/PlayerIcon";
import { AddAnswer } from "@/components/AddAnswer";
import { getOrUpdateStatus } from "@/functions/getOrUpdateStatus";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useGameRoom } from "@/hooks/useGameRoom";
import { getQuestion } from "@/functions/getQuestion";
import { shape } from "@/utils/getIconColorAndShape";
import { usePlayerIcon } from "@/hooks/usePlayerIcon";
import { ThemedText } from "@/components/ThemedText";

export default function Game() {
  const [status, setStatus] = useState<string>("");
  const { data: documentId, isLoading: isLoadingGame } = useGameRoom();
  const { data: playerIcon, isLoading: isLoadingPlayerIcon } = usePlayerIcon();
  const [question, setQuestion] = useState<string>("");

  useEffect(() => {
    const ListenAndGetStatus = async () => {
      if (documentId) {
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

    const fetchQuestion = async () => {
      if (documentId) {
        const unsubscribe = await getQuestion(
          documentId,
          setQuestion,
          undefined
        );

        return () => {
          if (unsubscribe) {
            unsubscribe();
          }
        };
      }
    };

    ListenAndGetStatus();
    fetchQuestion();
  }, [documentId]);

  return (
    <ParallaxScrollView paddingTop={20}>
      {status === "waiting" || isLoadingPlayerIcon ? (
        <Loading />
      ) : (
        <>
          <PlayerIcon
            paddingBottom={120}
            size={80}
            color={playerIcon.color}
            shape={playerIcon.shape}
          />
          <AddAnswer question={question} />
        </>
      )}
    </ParallaxScrollView>
  );
}
