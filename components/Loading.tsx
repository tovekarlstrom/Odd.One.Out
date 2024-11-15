import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useEffect, useMemo, useState } from 'react';
import { Sizes } from '@/constants/Theme';
import { ThemedView } from '@/components/ThemedView';
import LoadingIcons from '@/components/LoadingIcons';
import { getOrUpdateStatus } from '@/functions/getOrUpdateStatus';
import { getAnswer } from '@/functions/getAnswer';
import { PlayerAnswer } from '@/app/answers';
import { useGameRoom } from '@/hooks/useGameRoom';
import { useSortedPlayers } from '@/hooks/useSortedPlayers';
import data from '../public/content.json';

export default function Loading() {
  const [answers, setAnswers] = useState<PlayerAnswer[]>([]);
  const [status, setStatus] = useState<string>('');
  const players = useSortedPlayers();
  const content = data.content.loading;

  const memoizedPlayers = useMemo(() => players, [players]);
  const { data: gameRoom } = useGameRoom();
  const documentId = gameRoom?.id;

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
        {status === 'active' ? (
          <>
            <ThemedView style={styles.textBox}>
              {content.title.active.map((text, index) => (
                <ThemedText
                  key={index}
                  type='heading24'
                  style={styles.textAlign}
                >
                  {text}
                </ThemedText>
              ))}
            </ThemedView>
            <ThemedView style={styles.progressBox}>
              <ThemedText type='heading24'>{`${answers.length}/${memoizedPlayers.length}`}</ThemedText>
            </ThemedView>
          </>
        ) : status === 'waiting' ? (
          <ThemedView style={styles.textBox}>
            {content.title.waiting.map((text, index) => (
              <ThemedText key={index} type='heading24'>
                {text}
              </ThemedText>
            ))}
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
    alignItems: 'center',
    justifyContent: 'center',
    gap: Sizes.Spacings.xxLarge,
    paddingTop: 100,
  },
  progressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Sizes.Spacings.small,
  },
  textBox: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Sizes.Spacings.small,
    width: '90%',
  },
  textAlign: {
    textAlign: 'center',
  },
});
