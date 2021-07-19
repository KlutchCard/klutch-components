import { CardColor, CardMedia } from "@alloycard/alloy-js"
import React, { PropsWithChildren, useState } from "react"
import { Pressable, View, StyleSheet, ViewProps, ScrollView, StyleProp, TextStyle } from "react-native"
import KlutchTheme from "./KlutchTheme"
import CardImage from "./CardImage"
import KText from "./KText"


export const ValidColors = Object.keys(CardColor).filter(c => (![CardColor.GRAY, CardColor.BLACK].includes(CardColor[c as keyof typeof CardColor])))

export interface KCardColorPickerInputProps extends ViewProps {
    label: string
    isOptional?: boolean,
    squareStyle?: StyleProp<TextStyle>
    labelStyle?: StyleProp<TextStyle>
    value: string,
    displayValue?: string,
    onSelectionChanged?: (value: string) => void
}


export const KCardColorPickerInput: React.FC<KCardColorPickerInputProps> = (
    {label, isOptional, style, labelStyle, squareStyle, value, onSelectionChanged, displayValue, children, ...props} : PropsWithChildren<KCardColorPickerInputProps>) => {
    
    const [expanded, setExpanded] = useState(false)


    const selectionPressed = (c: string) => {
        onSelectionChanged && onSelectionChanged(c)
        setExpanded(false)
    }

    const squareColor = CardColor[value.toUpperCase() as keyof typeof CardColor]
    

    const InputComponent = 
    <Pressable style={[styles.kSelectInput, style]} {...props} onPress={() =>setExpanded(!expanded)}>
        <View style={styles.labelContainer}>
            <KText style={[styles.label, labelStyle]}>{label}</KText>
            {isOptional ? <KText style={styles.optionalLabel}>{"\tOPTIONAL"}</KText> : null}
        </View>      
        <View style={[styles.textInputRow, squareStyle]}>
            <View style={[styles.colorSquare,{backgroundColor: squareColor}]}/>
        </View> 
        <KText style={styles.errorMessage}></KText>             
    </Pressable>

    if (expanded) {
        return (
            <View style={styles.expandedView}>
                {InputComponent}
                <View style={styles.extraComponents}>
                    {children}
                </View>
                <View style={styles.expandedOptions}>
                    <ScrollView contentContainerStyle={{justifyContent: "flex-end", minHeight: "100%"}} bounces={false} showsHorizontalScrollIndicator={false}  horizontal>
                        {ValidColors.map(c => (
                                <Pressable onPress={() => selectionPressed(c)}>
                                    <CardImage key={c} style={styles.cardImage} card={{                                    
                                        color: CardColor[c as keyof typeof CardColor],                                        
                                    } as any}  />
                                </Pressable>
                        ))}
                    </ScrollView>
                </View>
            </View>
        )
    }

    return InputComponent
}

export default KCardColorPickerInput





const styles = StyleSheet.create({
    kSelectInput: {
        height: 70
    },
    expandedView: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: KlutchTheme.backgroundColor,
        zIndex: 2        
    },
    label: {
        textTransform: "uppercase",
        color: KlutchTheme.form.label.color,
        fontSize: KlutchTheme.form.label.size
    },    
    labelContainer: {
        flexDirection: "row"
    },
    optionalLabel: {
        textTransform: "capitalize",
        fontSize: KlutchTheme.form.label.size
    },
    textInputRow: {
        flexDirection: "row",
        marginBottom: 3,
        flex: 1,        
    },
    expandedOptions: {
        flex: 2,
        justifyContent: "flex-end",        
    },
    extraComponents: {
        flex: 1
    },
    options: {
        borderBottomColor: KlutchTheme.form.input.borderBottomColor,
        borderBottomWidth: KlutchTheme.form.input.borderBottomWidth,                
        paddingVertical: 15,
        paddingHorizontal: 10 
    },
    optionsSelected: {
        backgroundColor: KlutchTheme.form.button.backgroundColor,        
    },
    optionsSelectedText: {
        color: KlutchTheme.form.button.foreGroundColor
    },
    valueStyle: {
        flex: 1
    },
    errorMessage: {
        color: "red"
    },
    colorSquare: {
        height: 20,
        width: 40,        
    },
    cardImage: {        
        width: 100,        
    }
})
