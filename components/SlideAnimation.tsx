import { Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { type ViewProps } from 'react-native';

export type SlideAnimationProps = ViewProps & {
  children: React.ReactNode;
  height: number;
  startHeight?: number;
  showSlider: boolean;
  onClose?: () => void;
  animateOpacity?: boolean;
};

export default function SlideAnimation({
  style,
  children,
  height,
  startHeight = 0,
  showSlider,
  onClose,
  animateOpacity,
}: SlideAnimationProps) {
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const opacityAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showSlider) {
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
      Animated.timing(opacityAnimation, {
        toValue: 1,
        duration: 300,
        delay: 100,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        if (onClose) {
          onClose();
        }
      });
      Animated.timing(opacityAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        if (onClose) {
          onClose();
        }
      });
    }
  }, [showSlider, slideAnimation, onClose]);

  const interpolatedHeight = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [startHeight, height],
  });

  const contentOpacity = opacityAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View
      style={[
        style,
        {
          height: interpolatedHeight,
          opacity: animateOpacity ? contentOpacity : 1,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
