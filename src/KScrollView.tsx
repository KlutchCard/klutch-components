import { useKeyboard } from "@react-native-community/hooks";
import React, { PropsWithChildren, useContext } from "react"
import { Platform, ScrollView, ScrollViewProps, useWindowDimensions, View } from "react-native"
import KlutchTheme from "./KlutchTheme";
import { KModalContext } from "./KModal";



export const KScrollView = React.forwardRef<ScrollView, PropsWithChildren<ScrollViewProps>>(({children, ...props}: PropsWithChildren<ScrollViewProps>, ref) =>  {
    const height = useWindowDimensions().height -  KlutchTheme.scrollWindowMargin
    
    const keyboard = useKeyboard()

    const isModal = useContext(KModalContext)
    
    const scrollViewStyle = {
            minHeight: (Platform.OS === "ios" && keyboard.keyboardShown) ? height + keyboard.keyboardHeight + 30 : height,   
            flexGrow: 1,             
        }
    return (
        <ScrollView ref={ref as any} 
            contentContainerStyle={scrollViewStyle} 
            bounces={false} 
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}  {...props} >
            <View style={{minHeight: height, flexGrow: 1}}>
                {children}
            </View>
            { (isModal.modal || Platform.OS === "ios") && 
                <View style={{height: keyboard.keyboardShown ? (keyboard.keyboardHeight  + 30) : 0 }} />
            }
        </ScrollView>)
});

export default KScrollView