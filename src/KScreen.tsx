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
        flexBasis: "100%",
        width: "100%",
        backgroundColor: KlutchTheme.backgroundColor,
        paddingHorizontal: KlutchTheme.screen.paddingHorizontal,
        paddingTop: KlutchTheme.screen.paddingTop,
        //height: "100%"
    }
})
