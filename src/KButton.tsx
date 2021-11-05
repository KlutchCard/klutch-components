import React, { useState } from "react"
import { Pressable, StyleProp, ViewStyle, StyleSheet, TextStyle } from "react-native"
import { useHistory } from "react-router-native"
import KlutchTheme from "./KlutchTheme"
import KText from "./KText"
import * as Haptics from 'expo-haptics';
import KLoadingIndicator from "./KLoadingIndicator"

export interface KButtonProps  {
    style?: StyleProp<ViewStyle>
    label: string
    disabled?: boolean
    type?: "primary" | "cancel"  | "outline" | "outline-small" | "delete"
    onPress?: () => void
    loading?: boolean
    link?: string
    textStyle?: StyleProp<TextStyle>
    vibrationFeedback?: boolean
}

export const KButton: React.FC<KButtonProps> = ({label, style, disabled, type, onPress, loading, link, textStyle, vibrationFeedback = false, ...props}: KButtonProps) => {

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
        case "outline-small": {
            extraStyle = {backgroundColor: "transparent", borderWidth: 1, borderColor: KlutchTheme.colors.primary}
            extraLabelStyle = {color: KlutchTheme.colors.primary}
            textStyle = {fontSize: 11, letterSpacing: 0.3, fontFamily: KlutchTheme.font.semiBoldFontFamily}
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
        if (vibrationFeedback === true) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }

    return (
        <Pressable
            disabled={loading}
            style={[styles.kbutton,  extraStyle, style]}
            onPressOut={() => setPressed(false)}
            onPressIn={() => onPressIn()}
            onPress={onButtonPress}
            {...props}
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
