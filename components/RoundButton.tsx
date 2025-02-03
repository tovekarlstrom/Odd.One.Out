import { type TextProps, Pressable, StyleSheet } from 'react-native';

import { Colors } from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export type RoundButtonProps = TextProps & {
  isAdding: boolean;
  onPress?: () => void;
};

export function RoundButton({ isAdding, onPress }: RoundButtonProps) {
  const handlePress = () => {
    Haptics.selectionAsync();
    if (onPress) {
      onPress();
    }
  };
  return (
    <Pressable style={styles.button} onPress={handlePress}>
      <Ionicons
        name={isAdding ? 'add-outline' : 'remove-outline'}
        size={30}
        color={Colors.light.text}
      />
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
