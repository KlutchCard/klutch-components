import * as Haptics from 'expo-haptics'; 
import React from "react"
import { View, StyleSheet, useWindowDimensions, Pressable, ViewProps } from "react-native"
import Svg, { Path } from "react-native-svg"


export interface KFloatingButtonProps extends ViewProps {
    onPress: () => void
    vibrationFeedback?: boolean
}

export const KFloatingButton: React.FC<KFloatingButtonProps> = ({onPress, vibrationFeedback = false, ...props} : KFloatingButtonProps) => {
    const dimensions = useWindowDimensions()
    const left = (dimensions.width / 2) - 25

    var onButtonPress = (() => {
        if (vibrationFeedback === true) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        onPress && onPress()
    })


    return (
    
    <View style={[style.kfloatingButton, {left: left}]} {...props}>
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
        height: 50,
        width: 50,
        borderRadius: 50,
        elevation: 10,
        position: "absolute",
        bottom: 20,        
        zIndex: 2,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    }
})