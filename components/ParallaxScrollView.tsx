import { StyleSheet } from 'react-native';
import Animated, { useAnimatedRef } from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { Colors, Sizes } from '@/constants/Theme';
import LogoIcon from './LogoIcon';
import Settings from './Settings';
import { useIsAdmin } from '@/hooks/useIsAdmin';

export default function ParallaxScrollView({
  children,
  isHomePage,
  paddingTop,
  scroll = true,
}: {
  children: React.ReactNode;
  isHomePage?: boolean;
  paddingTop?: number;
  scroll?: boolean;
}) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const { data: isAdmin } = useIsAdmin();

  return (
    <ThemedView
      style={[
        styles.container,
        {
          backgroundColor: isHomePage ? 'transparent' : Colors.light.background,
        },
      ]}
    >
      <LogoIcon style={styles.header} size={60} />
      {isAdmin && <Settings />}
      {scroll ? (
        <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
          <ThemedView
            style={[
              styles.content,
              { paddingTop: paddingTop ? paddingTop : 100 },
            ]}
          >
            {children}
          </ThemedView>
        </Animated.ScrollView>
      ) : (
        <ThemedView
          style={[
            styles.content,
            { paddingTop: paddingTop ? paddingTop : 100 },
          ]}
        >
          {children}
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: Sizes.Widths.medium,
    paddingTop: 80,
    marginHorizontal: 'auto',
    width: '100%',
  },
  header: {
    position: 'absolute',
    top: 30,
    left: 0,
    zIndex: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: Sizes.Spacings.large,
    marginVertical: 80,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});
