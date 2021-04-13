import React from "react"
import { Pressable, StyleSheet, View } from "react-native"
import KlutchTheme from "./KlutchTheme"

export interface KSwitchProps  {
    isDisabled: boolean
    isOff: boolean
    onPress: () => void
}

export const KSwitch: React.FC<KSwitchProps> = ({isDisabled, isOff, onPress}: KSwitchProps) => {
    let disabledStyle = { opacity: (isDisabled ? .5: 1) }
    let extraStyle = {}
    let extraSquareStyle = {}

    if (isOff) {
        extraSquareStyle = { alignSelf: "flex-end", right: 4, }
        extraStyle = { backgroundColor: KlutchTheme.form.button.backgroundColor}
    } else {
        extraSquareStyle = { alignSelf: "flex-start", left: 4, }
        extraStyle = { backgroundColor: KlutchTheme.form.button.disabledBackGroundColor}
    }

    return (
        <Pressable
            disabled={isDisabled}
            style={[styles.rectangule, extraStyle, disabledStyle]}
            onPress={onPress}
        >
            <View style={[styles.square, extraSquareStyle]} />
        </Pressable>
    )
}

export default KSwitch

const styles = StyleSheet.create({
    rectangule: {
        height: 29,
        width: 50,
        borderRadius: 6,
        justifyContent: "center",
    },
    square: {
        height: 21,
        width: 21,
        borderRadius: 4,
        backgroundColor: "white",
    },
})
