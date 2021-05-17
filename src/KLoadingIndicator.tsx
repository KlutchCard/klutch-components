import React, { useEffect, useRef } from "react";
import { View, StyleSheet,  Modal, Animated, Easing, ColorValue } from "react-native";


export interface KLoadingIndicatorProps {
    color?: ColorValue
    size?: "small" | "large"
}

export const KLoadingIndicator = ({color, size, ...props}: KLoadingIndicatorProps ) => {

    const ball1 = useRef(new Animated.Value(0)).current;
    const ball2 = useRef(new Animated.Value(0)).current;
    const ball3 = useRef(new Animated.Value(0)).current;

    var ballSize = (size === "small") ? 5: 10


    const s = StyleSheet.create({
        view: {
            flexDirection: "row",
            alignSelf: "center"
        },
        dot: {        
            backgroundColor: color || 'black',
            width: ballSize,
            height: ballSize,
            borderRadius: ballSize,
            marginHorizontal: 5
        }
        
    })


    const animation  = (ball: Animated.Value) => Animated.loop(
        Animated.sequence([
            Animated.timing(ball, {
                toValue: size == "small" ? -10 : -25,
                duration: 200,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease)
            }),
            Animated.timing(ball, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease)
            }),
            Animated.delay(200)            
        ]))

    useEffect(() => {
        Animated.stagger(100, [
            animation(ball1),
            animation(ball2),
            animation(ball3)
        ]).start()
    })

    return (
        <View style={s.view}>
            <Animated.View style={[s.dot, {transform: [{translateY: ball1}]}]} />
            <Animated.View style={[s.dot, {transform: [{translateY: ball2}]}]}/>
            <Animated.View style={[s.dot, {transform: [{translateY: ball3}]}]}/>
        </View>
    )
}

export default KLoadingIndicator
