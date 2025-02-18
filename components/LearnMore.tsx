import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ButtonComponent } from '@/components/ButtonComponent';
import { Colors, Sizes } from '@/constants/Theme';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import SlideAnimation from './SlideAnimation';
import { useLanguage } from '@/hooks/useLanguage';

export default function LearnMore() {
  const [openLearnMore, setOpenLearnMore] = useState<boolean>(false);
  const { content, isLoading, error } = useLanguage();
  const pageContent = content?.learnMorePage;
  const majority = pageContent?.modes.majority;
  const button = content?.buttons;

  const clickLearnMore = () => {
    setOpenLearnMore(!openLearnMore);
  };

  if (isLoading || error) return null;

  return (
    <SlideAnimation
      startHeight={70}
      height={750}
      showSlider={openLearnMore}
      style={styles.learnMoreBoxOpen}
      onClose={() => {
        setOpenLearnMore(false);
      }}
    >
      <ThemedView>
        <Pressable onPress={clickLearnMore}>
          <ThemedView style={styles.learnMoreButton}>
            <Ionicons
              name={
                openLearnMore ? 'chevron-down-outline' : 'chevron-up-outline'
              }
              size={20}
              color={Colors.light.text}
            />
            <ThemedText type='link' style={styles.learnMoreText}>
              {button.learnMore}
            </ThemedText>
          </ThemedView>
        </Pressable>
        {openLearnMore && (
          <ThemedView style={styles.learnMoreContainer}>
            <ThemedText type='title'>{pageContent.title}</ThemedText>

            <ThemedView style={styles.textBox}>
              <ThemedText type='defaultLarge'>{majority.subHeading}</ThemedText>
              <ThemedText type='default'>{majority.description}</ThemedText>
              <ButtonComponent
                text={button.createGame}
                variant='primary'
                route={`/create?mode=${majority.route}`}
              />
            </ThemedView>
          </ThemedView>
        )}
      </ThemedView>
    </SlideAnimation>
  );
}

const styles = StyleSheet.create({
  learnMoreBoxOpen: {
    position: 'absolute',
    bottom: 0,
    height: 750,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.light.Card,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
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
  },
  textBox: {
    paddingTop: Sizes.Spacings.xLarge,
    gap: Sizes.Spacings.small,
  },
});
