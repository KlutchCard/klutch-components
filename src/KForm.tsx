import React, { Component, PropsWithChildren, ReactNode, Ref, RefObject, SyntheticEvent, useRef, useState } from "react";
import { View, StyleSheet, StyleProp, ViewStyle, TextInput } from "react-native";
import KPasswordInput from "./KPasswordInput";
import type KTextInput  from "./KTextInput";
import {ValidationState} from "./FormValidation"
import KText from "./KText";

export interface KFormProps {    
    style?: StyleProp<ViewStyle>;
    onValidationChanged?: (valid: ValidationState) => void
}

export const KForm: React.FC<KFormProps> = (props: PropsWithChildren<KFormProps>) => {
    
    const {style, children} = props

    return (
        <View style={[styles.kform, style]}>
            {renderChildren(props)}
        </View>
    )
}


const renderChildren = ({children, onValidationChanged, ...props}: PropsWithChildren<KFormProps>) => {

    const childCount = React.Children.count(children)
    const myRefs  = new Array<KTextInput>()
    

    const onSubmitEditing = (event: SyntheticEvent, order: number) => {        
            if (order === undefined)  {
                return
            }
            const nextRef = myRefs.find(c => c?.props.tabOrder === order + 1) 
            if (nextRef) {
                nextRef.focus()
            }
    }

    /**
     * Form is pristine if all fields are pristine
     * Form is valid if all fields are valid
     * Else form is in an error state 
     * @param valid 
     */
    const onItemValidationChanged = (valid: ValidationState) => {
        if (!onValidationChanged) {
            return;
        }

        const isError = myRefs.find(r => r?.getValidationState() === ValidationState.ERROR)
        if (isError) {
            onValidationChanged(ValidationState.ERROR)
            return;            
        }

        const isValid = myRefs.every(r => r?.getValidationState() === ValidationState.VALID)        
        if (isValid) {
            onValidationChanged(ValidationState.VALID)
            return;
        }
        onValidationChanged(ValidationState.PRISTINE)
    }

    const setRefs = (ref: KTextInput, refProp: Ref<KTextInput>, order: number) => {
        if (!ref) return;
        myRefs[order] = ref
        if (refProp) {
            if (typeof refProp === "function") {
                refProp(ref)
            } else if (refProp)  {
                (ref as unknown as React.MutableRefObject<KTextInput | null>).current = ref
            }
        }
        
    }

    return React.Children.map(children, (child: any, i) => {
        if (!child) {
            return child
        }         
        if (child.props.tabOrder !== undefined) {  
            const order = child.props.tabOrder
            const c = React.cloneElement(child, {
                onSubmitEditing: (event: SyntheticEvent) => onSubmitEditing(event, order), 
                ref: (ref: KTextInput) => setRefs(ref, child.ref, order),
                onValidationChanged: (valid: ValidationState) => onItemValidationChanged(valid)
            })            
            return c
        } else {
            return child;
        }
        
    })
}


export default KForm


const styles = StyleSheet.create({
    kform: {
        flexGrow: 1,        
        flexShrink: 0
    }
})