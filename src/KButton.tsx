import React, { useState } from "react"
import { Pressable, StyleProp, ViewStyle, StyleSheet, ActivityIndicator, TextStyle } from "react-native"
import { useHistory } from "react-router-native"
import KlutchTheme from "./KlutchTheme"
import KText from "./KText"
import * as Haptics from 'expo-haptics';
import KLoadingIndicator from "./KLoadingIndicator"

export interface KButtonProps  {
    style?: StyleProp<ViewStyle>
    label: string
    disabled?: boolean
    type?: "primary" | "cancel"  | "outline" | "delete"
    onPress?: () => void
    loading?: boolean
    link?: string
    textStyle?: StyleProp<TextStyle>
}

export const KButton: React.FC<KButtonProps> = ({label, style, disabled, type, onPress, loading, link, textStyle, ...props}: KButtonProps) => {

    const [pressed, setPressed] = useState(false)

    const history = useHistory();

    var onButtonPress = onPress || (() => {
        if (link) {
            history.push(link)
        }
    })

    let extraStyle = null
    let extraLabelStyle = null

    let bg = KlutchTheme.form.button.backgroundColor
    let fg = KlutchTheme.form.button.foreGroundColor

    if (pressed) {
        bg = KlutchTheme.form.button.pressedBackground
    }

    if (disabled && !loading) {
        fg =  KlutchTheme.form.button.disabledForeGroundColor
        bg =  KlutchTheme.form.button.disabledBackGroundColor
    }

    switch (type) {
        case "primary" : {
            extraStyle = StyleSheet.flatten([styles.primary, {backgroundColor: bg}])
            extraLabelStyle = {color: fg}
            break;
        }
        case "cancel": {
            extraStyle =  {backgroundColor: fg}
            extraLabelStyle = {color: bg}
            break;
        }
        case "outline": {
            extraStyle = {backgroundColor: "transparent", borderWidth: 1, borderColor: bg}
            extraLabelStyle = {color: bg}
            break
        }
        case "delete": {
          extraStyle = StyleSheet.flatten([styles.primary, {backgroundColor: "transparent", borderWidth: 1, borderColor: "red"}])
          extraLabelStyle = {color: "red"}
          break;
        }
    }

    const onPressIn = () => {
        setPressed(true)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }

    return (
        <Pressable
            disabled={loading}
            style={[styles.kbutton,  extraStyle, style]}
            onPressOut={() => setPressed(false)}
            onPressIn={() => onPressIn()}
            onPress={onButtonPress}
        >
            {loading ?
                (<KLoadingIndicator color={extraLabelStyle?.color}  size="small" />) :
                (<KText style={[styles.label, extraLabelStyle, textStyle]}>{label}</KText>)}
        </Pressable>
    )
}

export default KButton

const styles = StyleSheet.create({
    kbutton: {
        flex: 0,        
        alignContent: "center",
        justifyContent: "center",   
        height: 50,
    },
    primary: {
        flex: 3
    },
    label: {
        textTransform: "uppercase",
        textAlign: "center"
    }
})
