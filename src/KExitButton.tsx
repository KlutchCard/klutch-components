import React from "react"
import { StyleSheet, View, Pressable } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';


export interface KExitButtonProps {
  onPress: () => void
  buttonRadius?: number
}

const KExitButton: React.FC<KExitButtonProps> = ({ onPress, buttonRadius }: KExitButtonProps) => {
  const radius = buttonRadius || 25

  const buttonStyles = StyleSheet.create({
    button: {
      margin: (radius / 2),
      backgroundColor: "#FFFFFF",
      height: (2 * radius),
      width: (2 * radius),
      borderRadius: radius,
      elevation: (radius / 3),
      justifyContent: "center",
    }
  })

  return (
    <Pressable onPress={onPress}>
      <View style={buttonStyles.button}>
        <Icon name="times" size={radius} color="black" style={{alignSelf: "center"}} />
      </View>
    </Pressable>
  )
}

export default KExitButton
