import {
  StyleSheet,
  ImageBackground,
  ImageSourcePropType,
  Animated,
} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ButtonComponent } from '@/components/ButtonComponent';
import { Sizes } from '@/constants/Theme';
import LearnMore from '@/components/LearnMore';
import data from '../public/content.json';
import startBackground from '../assets/images/startBackground.png';
import { useEffect, useRef } from 'react';

export default function HomeScreen() {
  const fadeBackground = useRef(new Animated.Value(0)).current;
  const content = data.content.startPage;
  const button = data.content.buttons;

  useEffect(() => {
    Animated.timing(fadeBackground, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeBackground]);

  return (
    <Animated.View
      style={[styles.animatedContainer, { opacity: fadeBackground }]}
    >
      <ImageBackground
        source={startBackground as ImageSourcePropType}
        resizeMode='cover'
        style={styles.backGround}
      >
        <ParallaxScrollView isHomePage={true}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type='title'>{content.title}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type='default'>{content.description}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ButtonComponent
              text={button.joinGame}
              variant='primary'
              route='/join'
            />
            <ButtonComponent
              text={button.createGame}
              variant='secondary'
              route='/create?mode=majority'
            />
          </ThemedView>
        </ParallaxScrollView>
        <LearnMore />
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginVertical: Sizes.Spacings.medium,
  },
  backGround: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  },
});
