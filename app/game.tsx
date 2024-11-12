import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import PlayerIcon from "@/components/PlayerIcon";
import { AddAnswer } from "@/components/AddAnswer";
import { getOrUpdateStatus } from "@/functions/getOrUpdateStatus";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useGameRoom } from "@/hooks/useGameRoom";
import { getQuestion } from "@/functions/getQuestion";

export default function Game() {
  const [status, setStatus] = useState<string>("");
  const { data: documentId, isLoading: isLoadingGame } = useGameRoom();
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
    <ParallaxScrollView>
      {status === "active" ? (
        <>
          <PlayerIcon size={80} />
          <AddAnswer question={question} />
        </>
      ) : (
        <Loading prelStatus="waiting" />
      )}
    </ParallaxScrollView>
  );
}
