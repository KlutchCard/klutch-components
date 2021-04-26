import React, { useState } from "react"
import { Pressable, View, StyleSheet, StyleProp, ViewStyle } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';

export interface KExitButtonProps  {
  onPress?: () => void
  buttonRadius?: number
  style?: StyleProp<ViewStyle>
}

export const KExitButton: React.FC<KExitButtonProps> = ({onPress, buttonRadius, style}: KExitButtonProps) => {
  const [radius, setRadius] = useState<number>(buttonRadius || 25)

  return (
    <Pressable onPress={onPress}>
      <View style={[styles.button, {
        margin: (radius / 2),
        height: (2 * radius),
        width: (2 * radius),
        borderRadius: radius,
        elevation: (radius / 3)
      }, style]}>
        <Icon name="times" size={radius} color="black" style={{alignSelf: "center"}} />
      </View>
    </Pressable>
  )
}

export default KExitButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  }
})
