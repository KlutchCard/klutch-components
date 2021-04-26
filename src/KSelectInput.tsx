import React, { PropsWithChildren, useState } from "react"
import { Pressable, View, StyleSheet, ViewProps, ScrollView, StyleProp, TextStyle } from "react-native"
import KlutchTheme from "./KlutchTheme"
import KText from "./KText"


export interface KSelectInputProps extends ViewProps {
    label: string
    isOptional?: boolean,
    value: string,
    displayValue?: string,
    data: string[],
    selectStyle?: StyleProp<TextStyle>
    labelStyle?: StyleProp<TextStyle>
    valueStyle?: StyleProp<TextStyle>
    onSelectionChanged?: (value: string) => void
}


export const KSelectInput: React.FC<KSelectInputProps> = (
    {label, isOptional, style, labelStyle, selectStyle, valueStyle, value, data, onSelectionChanged, displayValue, children, ...props} : PropsWithChildren<KSelectInputProps>) => {
    
    const [expanded, setExpanded] = useState(false)


    const selectionPressed = (c: string) => {
        onSelectionChanged && onSelectionChanged(c)
        setExpanded(false)
    }

    const InputComponent = 
    <Pressable style={[styles.kSelectInput, style]} {...props} onPress={() =>setExpanded(!expanded)}>
        <View style={styles.labelContainer}>
            <KText style={[styles.label, labelStyle]}>{label}</KText>
            {isOptional ? <KText style={styles.optionalLabel}>{"\tOPTIONAL"}</KText> : null}
        </View>      
        <View style={[styles.textInputRow, selectStyle]}>
            <KText style={[styles.valueStyle, valueStyle]}>{displayValue ?? value }</KText>
        </View> 
        <KText style={styles.errorMessage} />             
    </Pressable>

    if (expanded) {
        return (
            <View style={styles.expandedView}>
                {InputComponent}
                <View style={styles.extraComponents}>
                    {children}
                </View>
                <View style={styles.expandedOptions}>
                    <ScrollView contentContainerStyle={{justifyContent: "flex-end", minHeight: "100%"}} bounces={false} showsVerticalScrollIndicator={false}>
                        {data.map(c => 
                            <Pressable onPress={() => selectionPressed(c)} key={c} style={[styles.options, c === value && styles.optionsSelected] }>
                                <KText style={[c === value && styles.optionsSelectedText]}>{c}</KText>
                            </Pressable>
                        )}
                    </ScrollView>
                </View>
            </View>
        )
    }

    return InputComponent
}

export default KSelectInput





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
        flex: 1,
        borderBottomColor: KlutchTheme.form.input.borderBottomColor,
        borderBottomWidth: KlutchTheme.form.input.borderBottomWidth
    },
    errorMessage: {
        color: "red"
    },
})