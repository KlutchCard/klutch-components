import { Card, CardColor } from "@alloycard/alloy-js"
import React from "react"
import { StyleSheet, View, ViewProps, Image } from "react-native"
import KText from "./KText"
import Logo from "./Logo"


export interface VirtualCardImageProps extends ViewProps {
  card: Card
}

export const VirtualCardImage: React.FC<VirtualCardImageProps> = ({card, ...props}: VirtualCardImageProps) => {
  const style = buildStyles(card.color)

  return (
    <View style={style.cardView} {...props}>
      <Image style={style.cardImage} source={GetCardImageSource(card)} />
      <Logo style={style.logo} color={"black"} />
      <KText style={style.cardName}>{card?.name}</KText>
    </View>
  )
}

const GetCardImageSource = ({isLocked, color}: Card) => {
  if (isLocked) return require(`../assets/card/virtual/BCBCBC.png`)

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

const buildStyles = (color: string = CardColor.BLACK) => StyleSheet.create({
  cardView: {
  },
  cardImage: {
  },
  cardName: {
    position: "absolute",
    bottom: 60,
    right: 20,
    color: "black",
    textTransform: "uppercase"
  },
  logo: {
    position: "absolute",
    top: 50,
    left: -10,
    transform: [
      { rotateZ: "270deg" }
    ]
  }
})
