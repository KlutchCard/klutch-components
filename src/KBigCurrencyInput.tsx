import React from "react"
import CurrencyInput from "react-native-currency-input";
import { StyleProp, TextStyle, StyleSheet } from "react-native";
import { KlutchTheme } from "./KlutchTheme";

export interface KBigCurrencyInputProps {
    style?: StyleProp<TextStyle>;
    amount: number,
    onAmountChanged?: (amount: number) => void
}


export const KBigCurrencyInput: React.FC<KBigCurrencyInputProps> = ({ amount, onAmountChanged, style, ...props }: KBigCurrencyInputProps) => {
    return (
        <CurrencyInput
            style={[styles.text, style]}
            value={amount}
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
