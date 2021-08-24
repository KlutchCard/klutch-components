import React from "react"
import CurrencyInput, { CurrencyInputProps } from "react-native-currency-input";
import { StyleProp, TextStyle, StyleSheet } from "react-native";
import { KlutchTheme } from "./KlutchTheme";
import type { Validation, ValidationState } from "./FormValidation";
import type { KTextInputProps } from "./KTextInput";

export interface KBigCurrencyInputProps extends CurrencyInputProps {
    style?: StyleProp<TextStyle>;
    onAmountChanged?: (amount: number) => void
    onValidationChanged?: (valid: ValidationState) => void
    validations?: Array<Validation>
}


export const KBigCurrencyInput: React.FC<KBigCurrencyInputProps> = ({ value, onAmountChanged, style, ...props }: KBigCurrencyInputProps) => {
    return (
        <CurrencyInput
            style={[styles.text, style]}
            value={value}
            onChangeValue={onAmountChanged}
            prefix="$"
            delimiter=","
            separator="."
            precision={2}
            {...props}
        />
    );
}

export default KBigCurrencyInput

const styles = StyleSheet.create({
    text: {
        fontSize: 55,
        fontFamily: KlutchTheme.font.semiBoldFontFamily,
    },
})
