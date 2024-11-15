import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgStartIcon } from './SvgStartIcon';

export function StartAnimation() {
  const [bgColor, setBgColor] = useState('#78A65A');
  const [textColor, setTextColor] = useState('#0058F3');
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    timers.push(
      setTimeout(() => {
        console.log(3);

        setBgColor('#FF96CE');
        setTextColor('#FF0000');
      }, 1600),
    );

    timers.push(
      setTimeout(() => {
        console.log(4);

        setBgColor('#0058F3');
        setTextColor('#FFB6DD');
      }, 2000),
    );

    timers.push(
      setTimeout(() => {
        console.log(5);

        setBgColor('#F68B45');
        setTextColor('#EBDED6');
      }, 2400),
    );
    timers.push(
      setTimeout(() => {
        console.log(5);
      }, 3000),
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);
  console.log('test');

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
