import * as Haptics from 'expo-haptics'; 
import React from "react"
import { View, StyleSheet, useWindowDimensions, Pressable, ViewProps } from "react-native"
import Svg, { Path } from "react-native-svg"


export interface KFloatingButtonProps extends ViewProps {
    onPress: () => void
    vibrationFeedback?: boolean
    size?: "large" | "small"
}

export const KFloatingButton: React.FC<KFloatingButtonProps> = ({onPress, vibrationFeedback = false, size = "small", ...props} : KFloatingButtonProps) => {
    const dimensions = useWindowDimensions()
    const width = size == "small" ? 50 : 60
    const height = width
    const left = (dimensions.width / 2) - width/2

    var onButtonPress = (() => {
        if (vibrationFeedback === true) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        onPress && onPress()
    })


    return (
    <View style={[style.kfloatingButton, {left , width, height, borderRadius: width/2}]} {...props}>
        <Pressable onPress={onButtonPress} hitSlop={20}>
        <Svg width={16} height={16} fill="none" >
            <Path d="M15 15L8 8l7-7M1 15l7-7-7-7" stroke="#191919" strokeWidth={2} />
        </Svg>
        </Pressable>
    </View>
    )
}

export default KFloatingButton

const style = StyleSheet.create({
    kfloatingButton:{
        // height: 50,
        // width: 50,
        // borderRadius: 50,
        elevation: 10,
        position: "absolute",
        bottom: 30,        
        zIndex: 2,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    }
})
