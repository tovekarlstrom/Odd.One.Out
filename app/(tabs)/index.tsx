import { StyleSheet, Platform, Button, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ButtonComponent } from "@/components/ButtonComponent";
import { useRouter } from "expo-router";
import { CopyComponent } from "@/components/CopyComponent";
import { CardComponent } from "@/components/CardComponent";
import { TextField } from "@/components/TextField";
import PlayerIcon from "@/components/PlayerIcon";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Blend in or stand out - What's your strategy?
        </ThemedText>
        {/* <HelloWave /> */}
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="default">
          It's not about what's right, it's about what most people think. Let's
          get started!
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <CopyComponent gameCode="WBkdsoe56D" />
        <ButtonComponent text={"Join Game"} variant="primary" route="/game" />
        <ButtonComponent
          text={"Create Game"}
          variant="secondary"
          route="/create"
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <CardComponent heading="Test with all options">
          <View style={styles.addGap}>
            <TextField value="Klara" points={5}>
              <PlayerIcon size={20} />
            </TextField>
            <TextField value="Klara">
              <PlayerIcon size={20} />
            </TextField>
            <TextField value="Skriv ett land på K" />
            <TextField value="Orange (prova att klicka!)" isClickable={true} />
          </View>
        </CardComponent>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="defaultLarge">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="defaultLarge">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="defaultLarge">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  addGap: {
    gap: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
