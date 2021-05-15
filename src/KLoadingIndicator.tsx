import React, { useEffect, useRef } from "react";
import { View, StyleSheet,  Modal, Animated, Easing } from "react-native";


export const KLoadingIndicator = () => {

    const ball1 = useRef(new Animated.Value(0)).current;
    const ball2 = useRef(new Animated.Value(0)).current;
    const ball3 = useRef(new Animated.Value(0)).current;

    const s = StyleSheet.create({
        view: {
            flexDirection: "row"
        },
        dot: {        
            backgroundColor: 'black',
            width: 10,
            height: 10,
            borderRadius: 10,
            marginHorizontal: 5
        }
        
    })


    const animation  = (ball: Animated.Value) => Animated.loop(
        Animated.sequence([
            Animated.timing(ball, {
                toValue: -25,
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
