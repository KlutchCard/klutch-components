import React, { useState } from "react"
import KText from "./KText"
import KTextInput, { CheckMark, KTextInputProps } from "./KTextInput"
import { Pressable, StyleSheet, View } from "react-native"
import KlutchTheme from "./KlutchTheme"


interface KPasswordInputProps extends KTextInputProps {
  checkMarkColor?: string
  hideCheckMark?: boolean
}

export const KPasswordInput: React.FC<KPasswordInputProps> = React.forwardRef(({value, onChangeText, checkMarkColor=undefined, hideCheckMark=false, ...props}: KPasswordInputProps, ref) => {
    const [currValue, setCurrValue] = useState(value)
    const [hasLetters, setHasLetters] = useState(false)
    const [hasUpper, setHasUpper] = useState(false)
    const [hasAtLeast8, setHasAtLeast8] = useState(false)
    const [hidePass, setHidePass] = useState(true)

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
      <View>
        <View>
          <KTextInput
            textContentType="password"
            secureTextEntry={hidePass}
            value={currValue}
            ref={ref as any}
            onChangeText={text => passwordChangeText(text)}
            {...props}
          />
          <Pressable onPress={() => setHidePass(!hidePass)} style={style.button} >
            <KText style={style.buttonTitle}>Show</KText>
          </Pressable>
        </View>
        {hideCheckMark ||
          <>
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
          </>
        }
      </View>
    )
})

export default KPasswordInput

const style = StyleSheet.create({
  button: {
    position: 'absolute',
    height: 50,
    width: 50,
    right: 0,
    marginRight: 40,
  },
  buttonTitle: {
    position: 'absolute',
    bottom: 5
    },
    passwordHint: {
        color: KlutchTheme.form.label.color,
        marginLeft: 10,
        fontSize: KlutchTheme.font.smallSize
    },
    green: {
        color: "green"
    },
    passwordTipRow: {
        flexDirection: "row",
        alignItems: "center"
    }
})
