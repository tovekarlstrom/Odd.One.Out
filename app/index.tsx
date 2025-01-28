import { StyleSheet, ImageBackground, ImageSourcePropType } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ButtonComponent } from '@/components/ButtonComponent';
import { Sizes } from '@/constants/Theme';
import LearnMore from '@/components/LearnMore';
import data from '../public/content.json';
import startBackground from '../assets/images/startBackground.png';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const content = data.content.startPage;
  const button = data.content.buttons;

  useEffect(() => {
    AsyncStorage.setItem('isAdmin', 'false');
  }, []);

  return (
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
  );
}

const styles = StyleSheet.create({
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
    overflow: 'hidden',
  },
});
