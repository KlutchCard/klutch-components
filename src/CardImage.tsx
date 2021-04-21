import { Card, CardColor, CardMedia } from "@alloycard/alloy-js"
import React from "react"
import { StyleSheet, View, ViewProps, Image } from "react-native"
import KText from "./KText"
import Logo from "./Logo"



export interface CardImageProps extends ViewProps {
  card: Card
  isLocked?: Boolean
}

export const CardImage: React.FC<CardImageProps> = ({card, isLocked, ...props}: CardImageProps) => {
  const style = buildStyles(card.color)

  return (
    <View style={{alignItems: 'center'}}>
      <View style={style.cardView} {...props}>
        <Image style={style.cardImage} source={GetCardImageSource(card, isLocked)} />
        <Logo style={style.logo} color={(card.color === CardColor.BLACK) ? "white" : "black"} />
        <KText style={style.cardName}>{card?.name}</KText>
      </View>
    </View>
  )
}

export const GetCardImageSource = (card: Card, isLocked?: Boolean) => {
  if ((isLocked === undefined && card.isLocked === true) || isLocked === true) {
    return require(`../assets/card/BCBCBC.png`)
  }

  switch(card.color.valueOf()){
    case "#44FF4E": return require(`../assets/card/44FF4E.png`)
    case "#FFB131": return require(`../assets/card/FFB131.png`)
    case "#5ED4DC": return require(`../assets/card/5ED4DC.png`)
    case "#EA3DEE": return require(`../assets/card/EA3DEE.png`)
    case "#F94651": return require(`../assets/card/F94651.png`)
    case "#4287FF": return require(`../assets/card/4287FF.png`)
    case "#FFF74A": return require(`../assets/card/FFF74A.png`)
    case "#88F0CC": return require(`../assets/card/88F0CC.png`)
    case "#BA93EC": return require(`../assets/card/BA93EC.png`)
    case "#03C09A": return require(`../assets/card/03C09A.png`)
    case "#FBEAC6": return require(`../assets/card/FBEAC6.png`)
    default: {
      if (card.media === CardMedia.VIRTUAL) {
        return require(`../assets/card/44FF4E.png`)
      }
      return require(`../assets/card/2B2B2B.png`)
    }
  }
}

export default CardImage

const buildStyles = (color: CardColor) => StyleSheet.create({
  cardView: {
  },
  cardImage: {
  },
  cardName: {
    position: "absolute",
    bottom: 60,
    right: 20,
    color: (color === CardColor.BLACK ? "white" : "black"),
    textTransform: "uppercase"
  },
  logo: {
    position: "absolute",
    top: 50,
    right: -7,
    transform: [
      { rotateZ: "270deg" }
    ]
  }
})
