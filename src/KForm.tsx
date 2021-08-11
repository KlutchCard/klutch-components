import React, {  PropsWithChildren,  Ref,  RefAttributes,  SyntheticEvent  } from "react";
import { View, StyleSheet, StyleProp, ViewStyle,  } from "react-native";
import type KTextInput  from "./KTextInput";
import {ValidationState} from "./FormValidation"

export interface KFormProps extends RefAttributes<typeof KForm> {    
    style?: StyleProp<ViewStyle>;
    onValidationChanged?: (valid: ValidationState) => void
}

export class KForm extends React.Component<KFormProps> {

    constructor(props: KFormProps) {
        super(props)
    }
    
    private myRefs  = new Array<KTextInput>()    
        
    validate = () => {
        var isValid = true
        for (let ref of this.myRefs) {
            const result = ref.validateComponent()
            switch (result.valid) {
                case ValidationState.ERROR: return result.valid                
                case ValidationState.PRISTINE: isValid = false; break;
            }
        }
        return isValid ? ValidationState.VALID : ValidationState.PRISTINE
    }



    private renderChildren = ({children, onValidationChanged, ...props}: PropsWithChildren<KFormProps>) => {
        
        const onSubmitEditing = (event: SyntheticEvent, order: number) => {        
                if (order === undefined)  {
                    return
                }
                const nextRef = this.myRefs.find(c => c?.props.tabOrder === order + 1) 
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
    
            const isError = this.myRefs.find(r => r?.getValidationState() === ValidationState.ERROR)
            if (isError) {
                onValidationChanged(ValidationState.ERROR)
                return;            
            }
    
            const isValid = this.myRefs.every(r => r?.getValidationState() === ValidationState.VALID)        
            if (isValid) {
                onValidationChanged(ValidationState.VALID)
                return;
            }
            onValidationChanged(ValidationState.PRISTINE)
        }
    
        const setRefs = (ref: KTextInput, refProp: Ref<KTextInput>, order: number) => {
            if (!ref) return;
            this.myRefs[order] = ref
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

    render() {
        const {style, children} = this.props



        return (
            <View style={[styles.kform, style]}>
                {this.renderChildren(this.props)}
            </View>
        )    
    }
}





export default KForm


const styles = StyleSheet.create({
    kform: {
        flexGrow: 1,        
        flexShrink: 0
    }
})