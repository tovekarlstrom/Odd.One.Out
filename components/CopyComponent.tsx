import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Sizes } from '@/constants/Theme';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

export function CopyComponent({
  gameCode,
  addPadding,
}: {
  gameCode: string;
  addPadding?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const { content, isLoading, error } = useLanguage();
  const labels = content?.labels;

  const copyToClipboard = () => {
    Clipboard.setStringAsync(gameCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading || error) return null;

  return (
    <>
      <Pressable
        style={[
          styles.button,
          {
            padding: addPadding ? Sizes.Spacings.small : 0,
            justifyContent: addPadding ? 'center' : 'flex-end',
          },
        ]}
        onPress={copyToClipboard}
      >
        {copied ? (
          <ThemedText style={styles.buttonText} type='defaultSemiBold'>
            {labels.copied}
          </ThemedText>
        ) : (
          <ThemedText style={styles.buttonText} type='defaultSemiBold'>
            {gameCode}
          </ThemedText>
        )}
        <Ionicons
          name={copied ? 'checkmark-outline' : 'copy-outline'}
          size={18}
          color={Colors.light.text}
        />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 150,
    margin: 'auto',
  },
  buttonText: {
    color: Colors.light.text,
    paddingRight: Sizes.Spacings.small,
  },
});
