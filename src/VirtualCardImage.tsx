import type { Card } from "@alloycard/alloy-js"
import React from "react"
import { StyleSheet, View, ViewProps, Image } from "react-native"
import KText from "./KText"
import Logo from "./Logo"


export interface VirtualCardImageProps extends ViewProps {
  card: Card
}

export const VirtualCardImage: React.FC<VirtualCardImageProps> = ({card, ...props}: VirtualCardImageProps) => (
  <View style={style.cardView} {...props}>
    <Image style={style.cardImage} source={GetCardImageSource(card)} />
    <Logo style={style.logo} color={"black"} />
    <View style={style.cardContent}>
        <KText style={{ textTransform: "uppercase", marginVertical: 3 }} numberOfLines={2}>{card.name}</KText>
        {[1, 2, 3].map((n) => (
            <View key={`hidden-numbers-bar-${n}`} style={style.hiddenBars} />
        ))}
        <KText style={{ fontSize: 12 }}>{card.lastFour}</KText>
    </View>
  </View>
)

const GetCardImageSource = ({lockState, color}: Card) => {
  if (lockState) return require(`../assets/card/virtual/BCBCBC.png`)

  switch(color.valueOf()){
    case "#FFB131": return require(`../assets/card/virtual/FFB131.png`)
    case "#5ED4DC": return require(`../assets/card/virtual/5ED4DC.png`)
    case "#EA3DEE": return require(`../assets/card/virtual/EA3DEE.png`)
    case "#F94651": return require(`../assets/card/virtual/F94651.png`)
    case "#4287FF": return require(`../assets/card/virtual/4287FF.png`)
    case "#FFF74A": return require(`../assets/card/virtual/FFF74A.png`)
    case "#88F0CC": return require(`../assets/card/virtual/88F0CC.png`)
    case "#BA93EC": return require(`../assets/card/virtual/BA93EC.png`)
    case "#03C09A": return require(`../assets/card/virtual/03C09A.png`)
    case "#FBEAC6": return require(`../assets/card/virtual/FBEAC6.png`)
    default: return require(`../assets/card/virtual/44FF4E.png`)
  }
}

export default VirtualCardImage

const style = StyleSheet.create({
  cardView: {
  },
  cardImage: {
  },
  cardContent: {
    position: "absolute",
    bottom: 60,
    marginHorizontal: 20,
  },
  hiddenBars: {
    height: 7,
    width: 28,
    backgroundColor: "black",
    marginVertical: 3,
  },
  logo: {
    position: "absolute",
    top: 20,
    left: 45,
  }
})
