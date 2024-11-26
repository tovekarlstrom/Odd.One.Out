import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgStartIcon } from './SvgStartIcon';

export function StartAnimation({
  onAnimationEnd,
}: {
  onAnimationEnd: () => void;
}) {
  const [bgColor, setBgColor] = useState('#78A65A');
  const [textColor, setTextColor] = useState('#0058F3');

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    timers.push(
      setTimeout(() => {
        setBgColor('#FF96CE');
        setTextColor('#FF0000');
      }, 500),
    );

    timers.push(
      setTimeout(() => {
        setBgColor('#0058F3');
        setTextColor('#FFB6DD');
      }, 1200),
    );

    timers.push(
      setTimeout(() => {
        setBgColor('#F68B45');
        setTextColor('#EBDED6');
      }, 1800),
    );
    timers.push(
      setTimeout(() => {
        onAnimationEnd();
      }, 2800),
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [onAnimationEnd]);

  return (
    <>
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <SvgStartIcon color={textColor} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 30,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
