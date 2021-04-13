import { useKeyboard } from "@react-native-community/hooks";
import React, { PropsWithChildren, useContext } from "react"
import { Platform, ScrollView, ScrollViewProps, useWindowDimensions, View } from "react-native"
import KlutchTheme from "./KlutchTheme";
import { KModalContext } from "./KModal";



export const KScrollView = React.forwardRef<ScrollView, PropsWithChildren<ScrollViewProps>>(({children, ...props}: PropsWithChildren<ScrollViewProps>, ref) =>  {
    const height = useWindowDimensions().height -  KlutchTheme.scrollWindowMargin
    const keyboard = useKeyboard()

    const isModal = useContext(KModalContext)
    

    return (
        <ScrollView ref={ref as any} contentContainerStyle={{minHeight: height}} bounces={false} showsVerticalScrollIndicator={false} {...props} >
            {children}
            {(isModal.modal || Platform.OS === "ios") && 
                <View style={{height: keyboard.keyboardShown ? (keyboard.keyboardHeight  + 30) : 0 }} />
            }
        </ScrollView>)
});

export default KScrollView