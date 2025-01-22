import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ButtonComponent } from '@/components/ButtonComponent';
import { Colors, Sizes } from '@/constants/Theme';
import SlideAnimation from './SlideAnimation';
import data from '../public/content.json';

export default function Settings({
  openSettings,
  onClose,
}: {
  openSettings: boolean;
  onClose: () => void;
  paddingTop?: number;
}) {
  const content = data.content.learnMorePage;
  const button = data.content.buttons;

  return (
    <SlideAnimation
      startHeight={0}
      height={500}
      showSlider={openSettings}
      style={styles.settingsBoxOpen}
      onClose={() => onClose()}
    >
      <ThemedView>
        {openSettings && (
          <>
            <ThemedView style={styles.learnMoreContainer}>
              <ThemedText type='title'>{content.title}</ThemedText>
              {content.modes.map((mode, index) => (
                <ThemedView key={index} style={styles.textBox}>
                  <ThemedText type='defaultLarge'>{mode.subHeading}</ThemedText>
                  <ThemedText type='default'>{mode.description}</ThemedText>
                  <ButtonComponent
                    text={button.createGame}
                    variant='primary'
                    route={`/create?mode=${mode.route}`}
                  />
                </ThemedView>
              ))}
            </ThemedView>
          </>
        )}
      </ThemedView>
    </SlideAnimation>
  );
}

const styles = StyleSheet.create({
  settingsBoxOpen: {
    position: 'absolute',
    top: 0,
    height: 500,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.light.Card,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    zIndex: 100,
  },
  learnMoreButton: {
    marginTop: Sizes.Spacings.xSmall,
    justifyContent: 'center',
    alignItems: 'center',
  },
  learnMoreText: {
    textAlign: 'center',
  },
  learnMoreContainer: {
    padding: 30,
    paddingVertical: 40,
    // height: 530,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'scroll',
  },
  textBox: {
    paddingTop: Sizes.Spacings.xLarge,
    gap: Sizes.Spacings.small,
  },
});
