import { StyleSheet, ImageBackground, ImageSourcePropType } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ButtonComponent } from '@/components/ButtonComponent';
import { Sizes } from '@/constants/Theme';
import LearnMore from '@/components/LearnMore';
import data from '../public/content.json';
import startBackground from '../assets/images/startBackground.png';
import { useState } from 'react';
import { ModalComponent } from '@/components/Modal';
import BackdropContainer from '@/components/BackdropContainer';

export default function HomeScreen() {
  const [showModal, setShowModal] = useState(false);
  const labels = data.content.labels;
  const content = data.content.startPage;
  const button = data.content.buttons;

  const handleBackdropPress = () => {
    setShowModal(false);
  };

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
            onSubmit={() => setShowModal(true)}
          />
          <ButtonComponent
            text={button.createGame}
            variant='secondary'
            route='/create?mode=majority'
          />
        </ThemedView>
      </ParallaxScrollView>
      {showModal && (
        // <ThemedView style={styles.container}>
        <BackdropContainer handleOnPress={handleBackdropPress}>
          <ModalComponent heading={labels.enterCodeOptions}>
            <ButtonComponent
              text='Scan QR code'
              variant='primary'
              route={'/scanCode'}
              onSubmit={() => setShowModal(false)}
            />
            <ThemedText type='defaultSemiBold' style={{ paddingTop: 15 }}>
              {labels.or}
            </ThemedText>
            <ButtonComponent
              text='Enter code'
              variant='secondary'
              route='/join'
            />
          </ModalComponent>
        </BackdropContainer>
        // </ThemedView>
      )}
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
  },
  container: {},
});
