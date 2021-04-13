import React, { useEffect, useState } from "react"
import { TextInput, TextInputProps, StyleSheet, View } from "react-native"
import KlutchTheme from "./KlutchTheme"
import { validate, Validation, ValidationResult, ValidationState } from "./FormValidation"
import KText from "./KText"

export interface KBigTextInputProps extends TextInputProps {
    validations?: Array<Validation>
    onValidationChanged?: (valid: ValidationState) => void
}

export const KBigTextInput: React.FC<KBigTextInputProps> = ({style, onValidationChanged, validations, ...props}: KBigTextInputProps) => {

    const [valid, setValid] = useState<ValidationResult>()

    useEffect(() => {
        if (props.value) {
            const valid = validate(props.value, validations)
            onValidationChanged && onValidationChanged(valid.valid)
            setValid(valid)            
        }        
    }, [props.value])

    return (
        <View style={[style]}>
            <TextInput 
                style={[styles.kbigtextinput]}
                {...props}                          
            />
            <KText style={styles.error}>{valid?.errorMessage}</KText>
        </View>
    )
}


export default KBigTextInput

const styles = StyleSheet.create({
    kbigtextinput: {
        fontSize: 55,
        fontFamily: KlutchTheme.font.semiBoldFontFamily,        
    },
    error: {
      //color: "red"  
    }
})