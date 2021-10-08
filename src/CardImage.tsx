import { Card, CardColor, CardMedia } from "@klutchcard/alloy-js"
import React from "react"
import { StyleSheet, View, ViewProps, Image, ActivityIndicator, Platform } from "react-native"
import KLoadingIndicator from "./KLoadingIndicator"
import KlutchTheme from "./KlutchTheme"
import KText from "./KText"
import Logo from "./Logo"



export interface CardImageProps extends ViewProps {
  card: Card
  isLocked?: boolean
  sensitiveData?: {
    cardNumber?: string
    cvv?: string
  }
  showSensitiveData?: boolean
  loading?: boolean
}

export const CardImage: React.FC<CardImageProps> = ({card, isLocked, sensitiveData: { cardNumber = "", cvv = "" } = {}, showSensitiveData = false, loading = false,  ...props}: CardImageProps) => {
  if (isLocked === undefined) isLocked = card.lockState == "LOCKED"
  const wordColor: string = (card.color === CardColor.BLACK && !(isLocked)) ? "white" : "black"

  return (
    <View style={{alignItems: 'center'}}>
      <View style={style.cardView} {...props}>
        <Image style={style.cardImage} source={GetCardImageSource(card, isLocked)} />
            {loading && (
              <View style={{position: "absolute", left: 130, top: 100}}>
                <KLoadingIndicator  />
              </View>
            )}      
            {(showSensitiveData  && cardNumber && cvv) ?
                <View style={[style.sensitiveData, { height: 210, justifyContent: "space-between" }]}>
                    <KText style={[style.sensitiveDataText, { color: wordColor }]}>
                        {`${cardNumber.substring(0, 4)}\n${cardNumber.substring(4, 8)}\n${cardNumber.substring(8, 12)}\n${cardNumber.substring(12, 16)}`}
                    </KText>
                    <View>
                        <KText style={[style.sensitiveDataText, { color: wordColor }]}>
                            {`CVV ${cvv}\nEXP ${card.expirationDate}`}
                        </KText>
                    </View>
                </View>
                :
                <View style={style.sensitiveData}>
                    {[1, 2, 3].map((n) => (
                        <View key={`hidden-numbers-bar-${n}`} style={{
                            height: 7,
                            backgroundColor: "black",
                            marginVertical: 3,
                        }} />
                    ))}
                    <KText style={[style.sensitiveDataText, { color: wordColor }]}>{card.lastFour}</KText>
                </View>
            }
        <Logo style={style.logo} color={wordColor} />
        <KText style={[style.cardName, {color: wordColor}]}>{card?.name}</KText>
      </View>
    </View>
  )
}

export const GetCardImageSource = (card: Card, isLocked: boolean) => {
  if (isLocked === true) {
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

const style = StyleSheet.create({
  cardView: {
  },
  cardImage: {
  },
  sensitiveData: {
    position: "absolute",
    paddingVertical: 20,
    paddingLeft: 20,
  },
  sensitiveDataText: {
    lineHeight: 20,
    fontFamily: Platform.OS === "ios" ? "Menlo":   "monospace",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.3
  },
  cardName: {
    position: "absolute",
    bottom: 60,
    right: 20,
    textTransform: "uppercase",
    fontSize: KlutchTheme.font.size,
    fontFamily: KlutchTheme.font.semiBoldFontFamily,
    letterSpacing: 0.3
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
