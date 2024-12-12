import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgStartIcon } from './SvgStartIcon';

export function StartAnimation({
  onAnimationEnd,
}: {
  onAnimationEnd: () => void;
}) {
  const [bgColor, setBgColor] = useState('#231F20');
  const [textColor, setTextColor] = useState('#F2F2F2');

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    timers.push(
      setTimeout(() => {
        setBgColor('#78A65A');
        setTextColor('#0058F3');
      }, 500),
    );

    timers.push(
      setTimeout(() => {
        setBgColor('#FF96CE');
        setTextColor('#FF0000');
      }, 1000),
    );

    timers.push(
      setTimeout(() => {
        setBgColor('#0058F3');
        setTextColor('#FFB6DD');
      }, 1300),
    );

    timers.push(
      setTimeout(() => {
        setBgColor('#F68B45');
        setTextColor('#EBDED6');
      }, 1900),
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
