import React, { useEffect, useState } from "react"
import KText from "./KText"
import KTextInput, { CheckMark, KTextInputProps } from "./KTextInput"
import {StyleSheet, View} from "react-native"
import KlutchTheme from "./KlutchTheme"


interface KPasswordInputProps extends KTextInputProps {
  checkMarkColor?: string
}

export const KPasswordInput: React.FC<KPasswordInputProps> = React.forwardRef(({value, onChangeText, checkMarkColor=undefined, ...props}: KPasswordInputProps, ref) => {
    const [currValue, setCurrValue] = useState(value)
    const [hasLetters, setHasLetters] = useState(false)
    const [hasUpper, setHasUpper] = useState(false)
    const [hasAtLeast8, setHasAtLeast8] = useState(false)


    const passwordChangeText = (text: string) => {
        setCurrValue(text)
        setHasAtLeast8(text.length >= 8)
        setHasUpper(/.*[A-Z]/.test(text))
        setHasLetters(/(?=.*[A-Za-z])(?=.*[0-9])/.test(text))
        if (onChangeText) {
            onChangeText(text)
        }
    }


    return (
        <KTextInput
        textContentType="password"
        secureTextEntry
        value={currValue}
        ref={ref as any}
        style={style.kpasswordInput}
        onChangeText={text => passwordChangeText(text)}
        {...props}>
            <View style={style.passwordTipRow}>
                <CheckMark color={checkMarkColor} />
                <KText style={[style.passwordHint, hasLetters ? style.green: null]}>
                    Must include letters and numbers
                </KText>
            </View>
            <View style={style.passwordTipRow}>
                <CheckMark color={checkMarkColor} />
                <KText  style={[style.passwordHint, hasUpper ? style.green: null]}>
                    Must include upper and lower cases
                </KText>
            </View>
            <View style={style.passwordTipRow}>
                <CheckMark color={checkMarkColor} />
                <KText  style={[style.passwordHint, hasAtLeast8 ? style.green: null]}>
                    Must be at least 8 characters
                </KText>
            </View>
        </KTextInput>
    )
})


export default KPasswordInput

const style = StyleSheet.create({
    passwordHint: {
        color: KlutchTheme.form.label.color,
        marginLeft: 10,
        fontSize: KlutchTheme.font.smallSize
    },
    green: {
        color: "green"
    },
    kpasswordInput: {
        height: 125,
    },
    passwordTipRow: {
        flexDirection: "row",
        alignItems: "center"
    }
})
