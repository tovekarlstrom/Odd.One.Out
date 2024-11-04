import { ButtonComponent } from "@/components/ButtonComponent";
import { StyleSheet } from "react-native";
import { GradientContainer } from "@/components/GradientContainer";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import PlayerIcon from "@/components/PlayerIcon";
import { getPlayers } from "@/functions/getPlayers";
import { Colors, Sizes } from "@/constants/Theme";
import { JoinedPlayers } from "@/components/JoinedPlayers";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Score() {
  const players = [
    { playerName: "Klara", points: 3, isAdmin: false, playerId: "jfe739s" },
    { playerName: "Tove", points: 5, isAdmin: false, playerId: "jfe7ksws" },
    { playerName: "Allan", points: 8, isAdmin: false, playerId: "o4e739s" },
    { playerName: "Ruben", points: 2, isAdmin: false, playerId: "jf9f39s" },
    { playerName: "Edvin", points: 0, isAdmin: false, playerId: "jfe73cf" },
  ];

  return (
    <>
      <ParallaxScrollView>
        <ThemedView style={styles.textBox}>
          <ThemedText type="heading32">Congratulations, Allan!</ThemedText>
          <ThemedText>You've claimed the top spot on the podium.</ThemedText>
        </ThemedView>
        <ThemedView style={styles.podiumWrapper}>
          <ThemedView style={styles.podiumContainer}>
            <ThemedView style={styles.playerBox}>
              <PlayerIcon size={20} />
              <ThemedText type="defaultSemiBold">
                {players[0].playerName}
              </ThemedText>
            </ThemedView>
            <ThemedView style={[styles.podiumBox, { height: 60 }]}>
              <ThemedText
                type="defaultSemiBold"
                textColor={Colors.light.contrastText}
              >
                2
              </ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedView style={styles.podiumContainer}>
            <ThemedView style={styles.playerBox}>
              <PlayerIcon size={20} />
              <ThemedText type="defaultSemiBold">
                {players[0].playerName}
              </ThemedText>
            </ThemedView>
            <ThemedView style={[styles.podiumBox, { height: 90 }]}>
              <ThemedText
                type="defaultSemiBold"
                textColor={Colors.light.contrastText}
              >
                1
              </ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedView style={styles.podiumContainer}>
            <ThemedView style={styles.playerBox}>
              <PlayerIcon size={20} />
              <ThemedText type="defaultSemiBold">
                {players[0].playerName}
              </ThemedText>
            </ThemedView>
            <ThemedView style={[styles.podiumBox, { height: 40 }]}>
              <ThemedText
                type="defaultSemiBold"
                textColor={Colors.light.contrastText}
              >
                3
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
        <JoinedPlayers players={players} heading="Players" showPoints={true} />
      </ParallaxScrollView>
      <GradientContainer>
        <ButtonComponent text="Create a new game" variant="primary" route="/" />
      </GradientContainer>
    </>
  );
}

const styles = StyleSheet.create({
  podiumWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: Sizes.Spacings.xxLarge,
  },
  podiumContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 6,
  },
  podiumBox: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.light.contrastBlue,
    width: 95,
    paddingTop: Sizes.Spacings.small,
    alignItems: "center",
  },
  playerBox: {
    flexDirection: "row",
    gap: 5,
  },
  textBox: {
    margin: "auto",
    gap: 15,
  },
});
