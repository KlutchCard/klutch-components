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

export const KBetaPanel: React.FC<KBetaPanelProps> = ({headLine, body, onPress, ...props}: KBetaPanelProps) => {
  const dimensions = useWindowDimensions()
  const width = dimensions.width - 2 * KlutchTheme.screen.paddingHorizontal
  const height = width * 812 / 1332

  const textContainerMarginTop = 30
  const textContainerMarginBottom = 20
  const textContainerStyle = {
    width: `${100*251/width}%`,
    marginTop: textContainerMarginTop,
    marginBottom: textContainerMarginBottom,
    height: height - (textContainerMarginTop + textContainerMarginBottom)
  }

  const arrowStyle = {
    position: "absolute",
    right: `${100*22/width}%`,
    bottom: `${100*22/height}%`,
  }

  return (
    <Pressable style={{marginTop: 15}} onPress={onPress}>
      <Image style={{width, height, resizeMode: 'stretch'}} source={require(`../assets/betaPanel.png`)} />
      <View style={[styles.textContainer, textContainerStyle]}>
        <KText style={[styles.text, {color: "white", fontSize: 25, width: 161}]}>{headLine}</KText>
        <KText style={styles.text}>{body}</KText>
      </View>
      <Arrow style={[styles.arrow, arrowStyle]} />
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
  arrow: {},
})
