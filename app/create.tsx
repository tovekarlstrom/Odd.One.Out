import { Keyboard, Platform, StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { AddQuestion } from '@/components/AddQuestion';
import { AddedQuestions } from '@/components/AddedQuestions';
import { Colors } from '@/constants/Theme';
import { ButtonComponent } from '@/components/ButtonComponent';
import { GradientContainer } from '@/components/GradientContainer';
import AddAdmin from '@/components/AddAdmin';
import { useEffect, useState } from 'react';
import BackdropContainer from '@/components/BackdropContainer';
import { useLanguage } from '@/hooks/useLanguage';

export default function TabThreeScreen() {
  const [openAddAdmin, setOpenAddAdmin] = useState<boolean>(false);
  const [renderAdmin, setRenderAdmin] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const { content, isLoading, error } = useLanguage();
  const pageContent = content?.createGame;
  const button = content?.buttons;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handlePress = () => {
    setOpenAddAdmin(true);
    setRenderAdmin(true);
  };

  const handleBackdropPress = () => {
    setOpenAddAdmin(false);
  };

  const handleAnimation = () => {
    setRenderAdmin(false);
  };

  if (isLoading || error) return null;

  return (
    <View style={styles.container}>
      <ParallaxScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type='heading32'>{pageContent.title}</ThemedText>
        </ThemedView>
        <AddQuestion />

        <AddedQuestions heading={pageContent.subHeading} />
      </ParallaxScrollView>
      {(Platform.OS === 'ios' || !keyboardVisible) && (
        <GradientContainer>
          <ButtonComponent
            onSubmit={handlePress}
            text={button.next}
            variant='primary'
          />
        </GradientContainer>
      )}
      {renderAdmin && (
        <BackdropContainer handleOnPress={handleBackdropPress}>
          <AddAdmin showAddAdmin={openAddAdmin} onClose={handleAnimation} />
        </BackdropContainer>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 70,
    width: '90%',
  },
  titleSpan: {
    color: Colors.light.contrastBlue,
  },
});
