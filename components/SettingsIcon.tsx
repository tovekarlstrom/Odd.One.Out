import React from 'react';
import { TouchableOpacity, ViewProps } from 'react-native';
import Icon from '../assets/settings-sharp.svg';
// import { router } from 'expo-router';
import { ThemedView } from './ThemedView';

export type IconProps = ViewProps & {
  size: number;
  onPress: () => void;
};

export default function SettingsIcon({ size, style, onPress }: IconProps) {
  return (
    <ThemedView style={[style]}>
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <Icon width={size} height={size} />
      </TouchableOpacity>
    </ThemedView>
  );
}
