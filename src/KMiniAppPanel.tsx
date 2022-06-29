import { KText } from "./KText"
import { KlutchTheme } from "./KlutchTheme"
import React, { PropsWithChildren } from "react"
import { View, StyleSheet } from "react-native"


export interface KTransactionPanelProps {
    recipeName: string,
    panelStyle?: "transaction" | "home"
    panelSize?: "small" | "medium" | "large"
}

export const KMiniAppPanel: React.FC<KTransactionPanelProps> = ({recipeName, children, panelStyle, panelSize} : PropsWithChildren<KTransactionPanelProps>) => {
    
    if (panelStyle === "home") {
        panelSize = "large"
    } else if (panelStyle === "transaction"){
        panelSize = "small"
    }

    return (
        <View style={[style.kTransactionPanel, panelSize && panelStyles[panelSize]]}>
            <KText style={style.recipeName} fontWeight="semibold">{recipeName}</KText>
            <View style={style.templateContainer}>
                {children}
            </View>
        </View>
    )    
}

export default KMiniAppPanel

const panelStyles = StyleSheet.create({
    small: { height: 105, },
    medium: { height: 130, },
    large: { height: 220, }
})

const style = StyleSheet.create({
    kTransactionPanel: {
        marginTop: 10,        
        height: panelStyles.small.height,        
        width: "99.9%",
        backgroundColor: "white",
        paddingHorizontal: 16,
        elevation: 1,
        shadowOffset: {
            width: 7,
            height: 5
        },
        shadowOpacity: 0.04,        
        marginRight: 1,
        paddingVertical: 20,
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
