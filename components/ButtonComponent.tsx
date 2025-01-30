import { Colors, Sizes } from '@/constants/Theme';
import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from './ThemedText';
import { Href, useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonComponentProps {
  text: string;
  variant: ButtonVariant;
  route?: Href;
  icon?: keyof typeof Ionicons.glyphMap;
  onSubmit?: () => Promise<void> | void;
}
export function ButtonComponent({
  variant,
  text,
  route,
  icon,
  onSubmit,
}: ButtonComponentProps) {
  const [disable, setDisable] = useState(false);
  const router = useRouter();
  const buttonColor =
    variant === 'primary'
      ? Colors.light.primaryButton
      : Colors.light.secondaryButton;

  const handlePress = async () => {
    if (onSubmit) {
      setDisable(true);
      try {
        await onSubmit();
      } finally {
        setDisable(false);
      }
    }
    if (route) {
      router.push(route);
    }
  };

  return (
    <Pressable
      disabled={disable}
      style={[styles.button, { backgroundColor: buttonColor }]}
      onPress={handlePress}
    >
      <ThemedText style={styles.buttonText} type='defaultSemiBold'>
        {text}
      </ThemedText>
      {icon && <Ionicons name={icon} size={24} color={Colors.light.text} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    margin: 'auto',
    marginTop: Sizes.Spacings.medium,
    borderRadius: 80,
    width: 285,
    height: 55,
  },
  buttonText: {
    fontWeight: 600,
  },
});
