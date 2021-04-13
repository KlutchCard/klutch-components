import React, { PropsWithChildren } from "react"
import { View, ViewProps, StyleSheet  } from "react-native";
import KlutchTheme from "./KlutchTheme";

interface KScreenProps extends ViewProps {    
}

export const KScreen : React.FunctionComponent<KScreenProps> = ({style, ...props}: PropsWithChildren<KScreenProps>) => {
    return(
        <View style={[styles.kview, style]} {...props} />           
    )
}

export default KScreen


const styles = StyleSheet.create({
    kview: {        
        flexGrow: 1,
        flexShrink: 0,
        width: "100%",
        backgroundColor: KlutchTheme.backgroundColor,
        paddingHorizontal: 20,
        paddingTop: 70,   
        height: "100%"     
    }
})