import { Colors, Sizes } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

export function GradientContainer({ children }: { children: React.ReactNode }) {
  return (
    <LinearGradient
      colors={['rgba(235, 222, 214, 0)', Colors.light.background]}
      locations={[0.02, 0.41]}
      style={styles.buttonContainer}
    >
      {children}
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Sizes.Spacings.xLarge,
    paddingTop: Sizes.Spacings.medium,
    alignItems: 'center',
    maxWidth: Sizes.Widths.medium,
    marginHorizontal: 'auto',
  },
});
