import { Colors, Sizes } from '@/constants/Theme';
import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from './ThemedText';
import { Href, useRouter } from 'expo-router';
import { useState } from 'react';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonComponentProps {
  text: string;
  variant: ButtonVariant;
  route?: Href<string | object>;
  onSubmit?: () => Promise<void> | void;
}
export function ButtonComponent({
  variant,
  text,
  route,
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
      await onSubmit();
      setDisable(false);
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
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
