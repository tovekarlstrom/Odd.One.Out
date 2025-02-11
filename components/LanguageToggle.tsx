import { useLanguage } from '@/hooks/useLanguage';
import React, { useState } from 'react';
import { Pressable, Animated, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Theme';

export default function LanguageToggle() {
  const { language, updateLanguage } = useLanguage();
  const [isEnglish, setIsEnglish] = useState(language === 'EN');
  const translateX = new Animated.Value(isEnglish ? 0 : 30);

  const toggleLanguage = () => {
    if (isEnglish) {
      updateLanguage('SV');
    } else {
      updateLanguage('EN');
    }
    Animated.timing(translateX, {
      toValue: isEnglish ? 30 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setIsEnglish((prev) => !prev);
  };

  return (
    <Pressable style={styles.toggle} onPress={toggleLanguage}>
      <Animated.View
        style={styles.slider}
        // style={[
        //   styles.slider,
        //   {
        //     backgroundColor: isEnglish
        //       ? Colors.light.primaryButton
        //       : Colors.light.contrastBlue,
        //   },
        // ]}
      >
        <Animated.View
          style={[
            styles.dot,
            {
              backgroundColor: isEnglish
                ? Colors.light.primaryButton
                : Colors.light.iconOrange,
              transform: [{ translateX }],
            },
          ]}
        />
        <ThemedText
          type='defaultSmall'
          style={[
            styles.text,
            { left: isEnglish ? 30 : 5, right: isEnglish ? 'auto' : 10 },
          ]}
        >
          {language}
        </ThemedText>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  toggle: {
    position: 'absolute',
    right: 0,
    top: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 80,
  },
  text: {
    top: 6,
    marginHorizontal: 5,
  },
  slider: {
    width: 60,
    height: 30,
    borderRadius: 20,
    backgroundColor: Colors.light.secondaryButton,
    position: 'relative',
    marginHorizontal: 5,
  },
  dot: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: Colors.light.Card,
    position: 'absolute',
    top: 2.5,
    left: 2.5,
  },
});
