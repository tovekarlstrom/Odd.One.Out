import { type TextProps, Pressable, StyleSheet } from 'react-native';

import { Colors } from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import data from '../public/content.json';

export type RoundButtonProps = TextProps & {
  isAdding: boolean;
  onPress?: () => void;
  disabled?: boolean;
};

export function RoundButton({ isAdding, onPress, disabled }: RoundButtonProps) {
  const labels = data.content.labels;

  return (
    <Pressable disabled={disabled} style={styles.button} onPress={onPress}>
      {disabled ? (
        <ThemedText type='defaultSmall'>{labels.admin}</ThemedText>
      ) : (
        <Ionicons
          name={isAdding ? 'add-outline' : 'remove-outline'}
          size={30}
          color={Colors.light.text}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.addButton,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    height: 55,
    borderRadius: 50,
  },
});
