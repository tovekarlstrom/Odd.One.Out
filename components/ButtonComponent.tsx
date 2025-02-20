import { Colors } from '@/constants/Theme';
import { StyleSheet, Pressable, ViewStyle, Platform } from 'react-native';
import { ThemedText } from './ThemedText';
import { Href, useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
type ButtonVariant = 'primary' | 'secondary' | 'blue';

interface ButtonComponentProps {
  text: string;
  variant: ButtonVariant;
  route?: Href;
  icon?: keyof typeof Ionicons.glyphMap;
  onSubmit?: () => Promise<void> | void;
  buttonDisabled?: boolean;
  style?: ViewStyle;
}
export function ButtonComponent({
  variant,
  text,
  route,
  icon,
  onSubmit,
  buttonDisabled,
  style,
}: ButtonComponentProps) {
  const [disable, setDisable] = useState(false);
  const router = useRouter();

  const buttonColor = (() => {
    switch (variant) {
      case 'primary':
        return Colors.light.primaryButton;
      case 'secondary':
        return Colors.light.secondaryButton;
      case 'blue':
        return Colors.light.contrastBlue;
      default:
        return Colors.light.primaryButton;
    }
  })();

  const handlePress = async () => {
    if (Platform.OS !== 'web' && Haptics) {
      Haptics.selectionAsync();
    }
    if (onSubmit) {
      setDisable(true);
      try {
        await onSubmit();
      } finally {
        setDisable(false);
      }
    }
    if (route) {
      router.replace(route);
    }
  };

  return (
    <Pressable
      disabled={buttonDisabled || disable}
      style={[
        styles.button,
        {
          backgroundColor: buttonColor,
        },
        style,
      ]}
      onPress={handlePress}
    >
      <ThemedText
        style={[
          styles.buttonText,
          {
            color:
              variant === 'blue' ? Colors.light.addButton : Colors.light.text,
          },
        ]}
        type='defaultSemiBold'
      >
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
    borderRadius: 80,
    width: 285,
    height: 55,
  },
  buttonText: {
    fontWeight: 600,
  },
});
