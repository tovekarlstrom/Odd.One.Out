import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useEffect, useMemo, useState } from 'react';
import { Sizes } from '@/constants/Theme';
import { ThemedView } from '@/components/ThemedView';
import LoadingIcons from '@/components/LoadingIcons';
import { PlayerAnswer } from '@/app/answers';
import { useGameRoom } from '@/hooks/useGameRoom';
import { useSortedPlayers } from '@/hooks/useSortedPlayers';
import data from '../public/content.json';
import { getAnswers } from '@/utils/getAnswers';

export default function Loading({ initial }: { initial?: string }) {
  const [answers, setAnswers] = useState<PlayerAnswer[]>([]);
  const players = useSortedPlayers();
  const content = data.content.loading;

  const memoizedPlayers = useMemo(() => players, [players]);
  const { data: gameRoom } = useGameRoom();
  const documentId = gameRoom?.id;

  useEffect(() => {
    getAnswers(documentId, setAnswers);
  }, [documentId]);

  return (
    <>
      <ThemedView style={styles.outerBox}>
        <LoadingIcons />
        {initial === 'active' ? (
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
        ) : initial === 'waiting' ? (
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
