import { View, StyleSheet, Pressable } from 'react-native';
import { Colors, Sizes } from '@/constants/Theme';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

interface TextFieldProps {
  value: string;
  children?: React.ReactNode;
  points?: string;
  isClickable?: boolean;
  answer?: string;
  onPress?: () => void;
  showStatus?: boolean;
  status?: boolean;
}

export function TextField({
  value,
  children,
  points,
  isClickable,
  answer,
  onPress,
  showStatus,
  status,
}: TextFieldProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const Wrapper: React.ElementType = isClickable ? Pressable : View;
  const { content, isLoading, error } = useLanguage();

  const labels = content?.labels;

  const handlePress = () => {
    setIsClicked(!isClicked);
    if (onPress) {
      onPress();
    }
  };

  const styling =
    children && (points || answer || showStatus)
      ? styles.threeItems
      : children
        ? styles.twoItems
        : styles.textContainer;

  if (isLoading || error) return null;

  return (
    <Wrapper
      onPress={isClickable ? handlePress : undefined}
      style={isClicked ? styles.clicked : styles.textBox}
    >
      <View style={styling}>
        {children ? (
          <ThemedView style={styles.innerBox}>
            {children}
            <ThemedText type={answer ? 'defaultSmall' : 'defaultSemiBold'}>
              {value}
            </ThemedText>
          </ThemedView>
        ) : (
          <ThemedText type='defaultSemiBold'>{value}</ThemedText>
        )}
        {points && (
          <ThemedText style={styles.points} type='defaultSemiBold'>
            {points}p
          </ThemedText>
        )}
        {answer && (
          <ThemedText style={styles.points} type='defaultSemiBold'>
            {answer}
          </ThemedText>
        )}
        {showStatus && (
          <ThemedText style={styles.status} type='defaultSmall'>
            {status === true ? labels.answered : labels.waiting}
          </ThemedText>
        )}
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  clicked: {
    borderRadius: 30,
    minHeight: 55,
    minWidth: 200,
    backgroundColor: Colors.light.activeTextField,
    padding: Sizes.Spacings.medium,
    flex: 1,
  },
  textBox: {
    borderRadius: 30,
    minHeight: 55,
    minWidth: 200,
    backgroundColor: Colors.light.background,
    padding: Sizes.Spacings.medium,
    flex: 1,
  },
  threeItems: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizes.Spacings.small,
  },
  twoItems: {
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: Sizes.Spacings.small,
  },
  innerBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: Sizes.Spacings.small,
  },
  points: {
    alignSelf: 'flex-start',
  },
  status: {
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
