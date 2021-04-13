import React, { useState } from "react"
import { ValidationType } from "./FormValidation"
import KBigTextInput, { KBigTextInputProps } from "./KBigTextInput"

export interface KBigCurrencyInputProps extends KBigTextInputProps {
    amount: number,
    onAmountChanged?: (amount: number) => void
}


export const KBigCurrencyInput: React.FC<KBigCurrencyInputProps> = ({amount, value, onAmountChanged, onChangeText, ...props} : KBigCurrencyInputProps) => {
    
    const [lastPeriod, setLastPeriod] = useState(false)


    const normalizeAmount = (value: string) => {        
        const currValueMatch = value.match(/(\d+(\.\d{0,2})?)(.*)/m)
        var currValue = value
        if (!currValueMatch) {
            return {value: `$0`, amount: 0}
        }
        currValue = currValueMatch[1]
        
        

        setLastPeriod(currValue.endsWith("."))

        const number = +currValue 
        return {value: `$${currValue}`, amount: +currValue}
    }
    

    const onTextChanged = (text: string) => {
        const newAmount =  normalizeAmount(text) ?? text
        onAmountChanged && onAmountChanged(newAmount.amount)
        onChangeText && onChangeText(newAmount.value)
    }

    return (
    <KBigTextInput 
        value={"$" + amount + (lastPeriod ? ".": "")}        
        onChangeText={onTextChanged}
        keyboardType="numeric"
        placeholder="$0.00"         
        {...props}
                  
    />)
}

export default KBigCurrencyInput