import React from "react"
import { Pressable, StyleSheet, View, ViewProps } from "react-native"
import KlutchTheme from "./KlutchTheme"


export interface KToggleProps extends ViewProps {
    value: boolean
    onValueChanged?: (value: boolean) => void
}

export const KToggle: React.FC<KToggleProps> = ({value, onValueChanged, ...props}: KToggleProps) => {
    
    const togglePressed = () => {
        onValueChanged && onValueChanged(!value)
    }

    return (
        <Pressable style={[style.pressable, value && style.pressableEnabled]} hitSlop={20} onPress={togglePressed} {...props}>
            <View style={style.switch}></View>
        </Pressable>
    )
}

export default KToggle


const style = StyleSheet.create({
    pressable: {
        width: 50,
        height: 30,
        borderRadius: 6,
        backgroundColor: KlutchTheme.form.button.disabledBackGroundColor,
        flexDirection: "row",
        alignItems: "center",        
        padding: 5,        
    },
    switch: {
        width: 20,
        height: 20,
        borderRadius: 4,
        backgroundColor: KlutchTheme.colors.background
    },
    pressableEnabled: {
        backgroundColor: KlutchTheme.form.button.backgroundColor,
        justifyContent: "flex-end"
    }
})