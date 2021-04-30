import React from "react";
import { ViewProps, Image, Pressable, View, useWindowDimensions, StyleSheet } from "react-native";
import { Arrow } from "./Arrow";
import KText from "./KText"
import KlutchTheme from "./KlutchTheme";


interface KBetaPanelProps extends ViewProps {
  headLine: string
  body: string
  onPress: () => void
}

export const KBetaPanel: React.FC<KBetaPanelProps> = ({headLine, body, onPress}: KBetaPanelProps) => {
  const dimensions = useWindowDimensions()
  const width = dimensions.width - 2 * KlutchTheme.screen.paddingHorizontal
  const height = width * 812 / 1332

  const textContainerStyle: any = {
    width: "67%",
    marginTop: 30,
    marginBottom: 20,
  }
  textContainerStyle.height = height - (textContainerStyle.marginTop + textContainerStyle.marginBottom)

  return (
    <Pressable style={{marginTop: 15}} onPress={onPress}>
      <Image style={{width, height, resizeMode: 'stretch'}} source={require(`../assets/betaPanel.png`)} />
      <View style={[styles.textContainer, textContainerStyle]}>
        <KText style={[styles.text, {color: "white", fontSize: 25, width: 161}]}>{headLine}</KText>
        <KText style={styles.text}>{body}</KText>
      </View>
      <Arrow style={styles.arrow} />
    </Pressable>
  )
}

export default KBetaPanel

const styles = StyleSheet.create({
  textContainer: {
    position: "absolute",
    marginLeft: 20,
    justifyContent: "space-between"
  },
  text: {
    color: "white",
  },
  arrow: {
    position: "absolute",
    right: "6%",
    bottom: "10%",
  },
})
