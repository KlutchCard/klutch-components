import React, { useState } from "react"
import { Pressable, View, StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';

export interface KExitButtonProps  {
  onPress?: () => void
  buttonRadius?: number
}

export const KExitButton: React.FC<KExitButtonProps> = ({onPress, buttonRadius}: KExitButtonProps) => {
  const [radius, setradius] = useState<number>(buttonRadius || 25)

  return (
    <Pressable onPress={onPress}>
      <View style={{
        margin: (radius / 2),
        height: (2 * radius),
        width: (2 * radius),
        borderRadius: radius,
        elevation: (radius / 3)
      }}>
        <Icon name="times" size={radius} color="black" style={{alignSelf: "center"}} />
      </View>
    </Pressable>
  )
}

export default KExitButton
