import React, {  RefAttributes, RefObject } from "react"
import {  TextInput, TextInputProps, View, StyleSheet, Pressable, StyleProp, TextStyle, ScrollView, findNodeHandle, NativeSyntheticEvent, TextInputFocusEventData } from "react-native"
import KlutchTheme from "./KlutchTheme"
import KText from "./KText"
import {validate, Validation, ValidationResult, ValidationState, ValidationType} from "./FormValidation"
import { Inter_900Black } from "@expo-google-fonts/inter"
import Svg, { Path } from "react-native-svg"
import KScrollScreen from "./KScrollScreen"

export interface KTextInputProps extends TextInputProps, RefAttributes<typeof KTextInput>  {
    label: string
    tabOrder?: number
    validations?: Array<Validation>
    value: string
    onValidationChanged?: (valid: ValidationState) => void
    showValid?: boolean
    textContainerStyle?: StyleProp<TextStyle>
    textStyle?: StyleProp<TextStyle>
    labelStyle?: StyleProp<TextStyle>
    autoScrollOnFocus?: ScrollView | null
    isOptional?: boolean
}

interface KTextInputState {
    valid: ValidationState,
    errorMessage?: string
}



export class KTextInput extends React.Component<KTextInputProps, KTextInputState> {


    constructor(props: KTextInputProps) {
        super(props)
        this.state = {            
            valid: (props.isOptional) ? ValidationState.VALID : ValidationState.PRISTINE
        }
    }


    private textInputFocused(event: any) {
        const {autoScrollOnFocus, onFocus}  = this.props
        if (autoScrollOnFocus) {
            event.target.measureLayout(findNodeHandle(autoScrollOnFocus as any ), (x: any, y: any, width: any, height: any) => {
                autoScrollOnFocus?.scrollTo({x: x, y:  y - 20})
            }, (f: any) => {
              
            })
        }
        onFocus && onFocus(event)
    }



    render() {

        const {style, label, children,  showValid, textContainerStyle, textStyle, labelStyle, multiline, isOptional, onBlur, ...textProps} = this.props
        const {valid, errorMessage} = this.state

        let validLabel = null
        switch (valid) {
            case ValidationState.ERROR: break;
            case ValidationState.VALID:
                if (showValid === false) {
                    break;
                }
                validLabel = <CheckMark />;
            break;
        }

        return (
            <Pressable style={[styles.ktextInput, style]} onPress={() => this.onPressed()}>
                <View style={styles.labelContainer}>
                    <KText style={[styles.label, labelStyle]}>{label}</KText>
                    {isOptional ? <KText style={styles.optionalLabel}>{"\tOPTIONAL"}</KText> : null}
                </View>
                <View style={[
                        styles.textInputRow,
                        textContainerStyle,
                        valid === ValidationState.ERROR ? styles.ktextInputError : null,
                        multiline ? styles.textInputRowMultiLine: null
                                ]}>
                    <TextInput
                        style={[styles.textInput, textStyle]}
                        blurOnSubmit={this.props.blurOnSubmit || false }
                        returnKeyType="next"
                        onBlur={this.componentBlurred}
                        onFocus={event => this.textInputFocused(event)}
                        multiline={multiline}
                        ref={this.textInputRef}
                        {...textProps as TextInputProps}/>
                    {validLabel}
                </View>
                <KText style={styles.errorMessage}>{errorMessage ?? ""}</KText>
                {children}
            </Pressable>
        )
    }


    componentDidUpdate(prevProps: KTextInputProps, prevState: KTextInputState) {

    }


    validateComponent() {
        const {label, value, onValidationChanged, onBlur, isOptional} = this.props
        var valid: ValidationResult
        if (isOptional && value.trim() == "")  {            
            valid = {valid: ValidationState.VALID, errorMessage: undefined}
        } else {
            valid = validate(value, this.props.validations)
        }       
        this.setState(valid, () => {
            onValidationChanged && onValidationChanged(valid.valid)
        })
    }

    private componentBlurred = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        const {onBlur} = this.props
        this.validateComponent()
        onBlur && onBlur(e)
    }


    private textInputRef = React.createRef<TextInput>()

    focus() {
        this.textInputRef.current?.focus()
    }

    blur() {
        this.textInputRef.current?.blur()
    }

    getValidationState() {
        if (!this.props.validations) {
            return ValidationState.VALID
        }
        return this.state.valid
    }

    setValidationState(state: ValidationState) {
        this.setState({valid: state})
    }





    private onPressed() {
        this.focus()
    }
}

export const CheckMark = ({color, ...props}: any) => (
  <Svg
    width={12}
    height={10}
    viewBox="0 0 12 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="M11 1L4.125 8 1 4.818" stroke={color || "#34865F"} strokeWidth={1.5} />
  </Svg>
)


const styles = StyleSheet.create({
    ktextInput: {
        height: 70,
        marginBottom: 10,
    },
    ktextInputError: {
        borderBottomColor: KlutchTheme.colors.failureColor
    },
    labelContainer: {
        flexDirection: "row"
    },
    label: {
        textTransform: "uppercase",
        color: KlutchTheme.form.label.color,
        fontSize: KlutchTheme.form.label.size
    },
    optionalLabel: {
        textTransform: "capitalize",
        fontSize: KlutchTheme.form.label.size
    },
    errorMessage: {
        color: KlutchTheme.colors.failureColor,
        fontSize: KlutchTheme.font.smallSize
    },
    textInputRow: {
        flexDirection: "row",
        marginBottom: 3,
        flex: 1
    },
    textInputRowMultiLine: {
        padding: 5,
        borderColor: KlutchTheme.form.input.borderBottomColor,
        borderWidth: KlutchTheme.form.input.borderBottomWidth
    },
    textInput: {
       fontSize: KlutchTheme.form.input.fontSize,
       borderBottomColor: KlutchTheme.form.input.borderBottomColor,
       borderBottomWidth: KlutchTheme.form.input.borderBottomWidth,
       textAlignVertical: "top",
       flex: 1,
       height: "100%"
    }
})

export default KTextInput
