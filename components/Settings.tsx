import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors, Sizes } from '@/constants/Theme';
import SlideAnimation from './SlideAnimation';
import { Ionicons } from '@expo/vector-icons';
import { JoinedPlayers } from './JoinedPlayers';
import { useSortedPlayers } from '@/hooks/useSortedPlayers';
import { useEffect, useState } from 'react';
import { Player } from '@/app/code';
import { CopyComponent } from './CopyComponent';
import { useGameRoom } from '@/hooks/useGameRoom';
import { getStatus } from '@/utils/getStatus';
import { getAnswers } from '@/utils/getAnswers';
import { PlayerAnswer } from '@/app/answers';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import { getGameCode } from '@/utils/getGameCode';
import { useLanguage } from '@/hooks/useLanguage';

export default function Settings() {
  const [gameCode, setGameCode] = useState<string>('');
  const [openSettings, setOpenSettings] = useState(false);
  const [renderSettings, setRenderSettings] = useState<boolean>(false);
  const [status, setStatus] = useState<string>();
  const [answers, setAnswers] = useState<PlayerAnswer[]>([]);
  const [updatedPlayers, setUpdatedPlayers] = useState<Player[]>([]);
  const [showText, setShowText] = useState<boolean>(false);

  const players = useSortedPlayers();
  const { data: gameRoom } = useGameRoom();
  const { content, isLoading, error } = useLanguage();

  const labels = content?.labels;
  const documentId = gameRoom?.id || undefined;
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  useEffect(() => {
    if (documentId) {
      getStatus(documentId, setStatus);
      getAnswers(documentId, setAnswers);
      getGameCode(setGameCode);
    }
  }, [documentId]);

  useEffect(() => {
    if (status === 'active') {
      const newPlayers = players.map((player) => ({
        ...player,
        hasAnswered: answers.some(
          (answer) => answer.playerId === player.playerId,
        ),
      }));
      setUpdatedPlayers(newPlayers);
      setShowText(true);
    } else {
      setUpdatedPlayers(players);
      setShowText(false);
    }
  }, [status, players, answers]);

  useEffect(() => {
    if (!renderSettings) {
      setOpenSettings(false);
    }
  }, [renderSettings]);

  if (isLoading || error) return null;

  return (
    <>
      <Pressable
        onPress={() => {
          setOpenSettings(true);
          setRenderSettings(true);
        }}
        style={styles.settings}
      >
        <Ionicons name={'settings-sharp'} size={30} color={Colors.light.text} />
      </Pressable>
      {renderSettings && (
        <SlideAnimation
          height={840}
          showSlider={openSettings}
          style={styles.settingsBoxOpen}
          animateOpacity={true}
          onClose={() => {
            setRenderSettings(false);
          }}
        >
          <ThemedView style={styles.relativeWrapper}>
            <Pressable
              onPress={() => setOpenSettings(false)}
              style={styles.closeButton}
            >
              <Ionicons
                name={'close-outline'}
                size={40}
                color={Colors.light.text}
              />
            </Pressable>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
              <ThemedView style={styles.settingsContainer}>
                <ThemedText type='heading32'>{labels.settings}</ThemedText>
                <ThemedView style={styles.cardWrapper}>
                  <ThemedView style={styles.textBox}>
                    <ThemedText type='defaultLarge'>
                      {labels.gameRoom}
                    </ThemedText>
                    <CopyComponent gameCode={gameCode} />
                  </ThemedView>
                  <View style={styles.cardContainer}>
                    {showText && (
                      <ThemedView style={styles.smallTextBox}>
                        <Ionicons
                          name={'information-circle-outline'}
                          size={20}
                          color={Colors.light.text}
                        />
                        <ThemedText type='defaultSmall'>
                          {labels.statusText}
                        </ThemedText>
                      </ThemedView>
                    )}
                    <JoinedPlayers
                      players={updatedPlayers}
                      handlePlayers={true}
                      heading={labels.handlePlayers}
                      showListLength={true}
                    />
                  </View>
                </ThemedView>
              </ThemedView>
            </Animated.ScrollView>
            {/* <GradientContainer>
              <ButtonComponent
                text='Quit game'
                variant='primary'
                // route='/'
                onSubmit={handleQuitGame}
              />
            </GradientContainer> */}
          </ThemedView>
        </SlideAnimation>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  settings: {
    position: 'absolute',
    top: 45,
    right: 10,
    zIndex: 10,
  },
  settingsBoxOpen: {
    position: 'absolute',
    top: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    zIndex: 100,
  },
  settingsWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: -25,
    zIndex: 100,
  },
  settingsContainer: {
    padding: 20,
    paddingVertical: 40,
    marginTop: 60,
    width: '100%',
  },
  cardContainer: {
    marginTop: 35,
    marginBottom: 70,
  },
  textBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Sizes.Spacings.large,
    paddingHorizontal: Sizes.Spacings.small,
    paddingVertical: Sizes.Spacings.small,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.text,
  },
  smallTextBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: Sizes.Spacings.xSmall,
    paddingVertical: Sizes.Spacings.small,
    marginLeft: Sizes.Spacings.large,
    width: '80%',
  },
  cardWrapper: {
    paddingTop: Sizes.Spacings.xLarge,
    gap: Sizes.Spacings.small,
  },
  copyText: {
    position: 'absolute',
    right: 10,
    top: -5,
  },
  relativeWrapper: {
    flex: 1,
    display: 'flex',
    height: '100%',
  },
  button: {
    margin: 'auto',
  },
});
