import { Colors } from '@/constants/Theme';
import { useLanguage } from '@/hooks/useLanguage';
import React, { useState } from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';

const Toggle = () => {
  const { language, updateLanguage } = useLanguage();
  const [isEnglish, setIsEnglish] = useState(language === 'en');

  const toggleLanguage = () => {
    if (isEnglish) {
      updateLanguage('se');
    } else {
      updateLanguage('en');
    }
    setIsEnglish((prev) => !prev);
  };

  return (
    <View style={styles.toggle}>
      <Text>SV</Text>
      <Switch
        trackColor={{
          false: 'FF0000',
          true: Colors.light.primaryButton,
        }}
        thumbColor={Colors.light.Card}
        value={isEnglish}
        onValueChange={toggleLanguage}
      />
      <Text>EN</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toggle: {
    position: 'absolute',
    right: 15,
    top: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 110,
  },
});

export default Toggle;
