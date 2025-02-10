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
// import data from '../public/content.json';
import startBackground from '../assets/images/startBackground.png';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { ModalComponent } from '@/components/Modal';
import { useLanguage } from '@/hooks/useLanguage';

export default function HomeScreen() {
  const fadeBackground = useRef(new Animated.Value(0)).current;
  const [showModal, setShowModal] = useState(false);
  const { content, isLoading, error } = useLanguage();
  const labels = content?.labels;
  const newcontent = content?.startPage;
  const button = content?.buttons;

  useEffect(() => {
    Animated.timing(fadeBackground, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeBackground]);

  const handleBackdropPress = () => {
    setShowModal(false);
  };

  if (isLoading || error) return null;

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
            <ThemedText type='title'>{newcontent.title}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type='default'>{newcontent.description}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ButtonComponent
              text={button.joinGame}
              variant='primary'
              onSubmit={() => {
                setShowModal(true);
              }}
            />
            <ButtonComponent
              text={button.createGame}
              variant='secondary'
              route='/create?mode=majority'
            />
          </ThemedView>
        </ParallaxScrollView>
        {showModal && (
          <ModalComponent
            onClose={handleBackdropPress}
            heading={labels.enterCodeOptions}
          >
            <ButtonComponent
              text='Scan QR code'
              variant='primary'
              route={'/scanCode'}
              icon='qr-code-outline'
              onSubmit={() => setShowModal(false)}
            />
            <ThemedText type='defaultSemiBold' style={{ paddingTop: 15 }}>
              {labels.or}
            </ThemedText>
            <ButtonComponent
              text='Enter code'
              variant='secondary'
              route='/join'
              onSubmit={() => {
                setTimeout(() => setShowModal(false), 30);
              }}
            />
          </ModalComponent>
        )}
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
  container: {},
});
