import { KText } from "./KText"
import { KlutchTheme } from "./KlutchTheme"
import React, { PropsWithChildren } from "react"
import { View, StyleSheet } from "react-native"


export interface KTransactionPanelProps {
    recipeName: string,
    panelStyle: "transaction" | "home"
}

export const KMiniAppPanel: React.FC<KTransactionPanelProps> = ({recipeName, children, panelStyle, ...props} : PropsWithChildren<KTransactionPanelProps>) => {
    

    return (
        <View style={[style.kTransactionPanel, (panelStyle == "home" && style.homePanel)]}>
            <KText style={style.recipeName} fontWeight="semibold">{recipeName}</KText>
            <View style={{flex: 1}}>                
                {children}
            </View>
        </View>
    )    
}

export default KMiniAppPanel

const style = StyleSheet.create({
    kTransactionPanel: {
        marginTop: 10,
        height: 100,
        width: "100%",
        backgroundColor: "white",
        paddingHorizontal: 16       
    },
    homePanel: {
        height: 225
    },
    recipeName: {
        marginTop: 10,
        marginBottom: 8,
        textTransform: "uppercase",
        color: KlutchTheme.colors.secondary,
    }
})