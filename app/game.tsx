import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import PlayerIcon from "@/components/PlayerIcon";
import { AddAnswer } from "@/components/AddAnswer";
import { getOrUpdateStatus } from "@/functions/getOrUpdateStatus";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { getQuestion } from "@/functions/getQuestion";

export default function Game() {
  const [status, setStatus] = useState<string>("");
  const [question, setQuestion] = useState<string>("");

  const fetchQuestion = async () => {
    const gameRoom = await AsyncStorage.getItem("gameRoom");
    if (gameRoom) {
      const unsubscribe = await getQuestion(gameRoom, setQuestion, undefined);

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  };

  useEffect(() => {
    const ListenAndGetStatus = async () => {
      const documentId = await AsyncStorage.getItem("gameRoom");
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
    ListenAndGetStatus();
    fetchQuestion();
  }, []);

  return (
    <ParallaxScrollView>
      {!!status && (
        <>
          {status === "waiting" ? (
            <Loading />
          ) : (
            <>
              <PlayerIcon size={80} />
              <AddAnswer question={question} />
            </>
          )}
        </>
      )}
    </ParallaxScrollView>
  );
}
