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
        marginVertical: 10,
        height: 100,
        width: "100%",
        backgroundColor: "white",
        paddingVertical: 5,
        paddingHorizontal: 10       
    },
    homePanel: {
        height: 200
    },
    recipeName: {
        textTransform: "uppercase",
        color: KlutchTheme.colors.secondary
    }
})