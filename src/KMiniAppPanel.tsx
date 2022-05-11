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
            <View style={style.templateContainer}>
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
        width: "99.9%",
        backgroundColor: "white",
        paddingHorizontal: 16,
        elevation: 1,
        shadowOffset: {
            width: 2,
            height: 2,            
        },
        shadowOpacity: .1,
    },
    homePanel: {
        paddingVertical: 20,
        height: 225
    },
    recipeName: {
        textTransform: "uppercase",
        color: KlutchTheme.colors.primaryButtonColor
    },
    templateContainer: {
        flex: 1,
        marginTop: 18,
    },
})
