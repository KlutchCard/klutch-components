import { KText } from "./KText"
import { KlutchTheme } from "./KlutchTheme"
import React, { PropsWithChildren } from "react"
import { View, StyleSheet } from "react-native"
import { RecipePanelSize } from "@klutch-card/klutch-js"


export interface KTransactionPanelProps {
    recipeName: string,
    panelStyle?: "transaction" | "home"
    panelSize?: RecipePanelSize
}

export const KMiniAppPanel: React.FC<KTransactionPanelProps> = ({recipeName, children, panelStyle, panelSize} : PropsWithChildren<KTransactionPanelProps>) => {
    
    if (panelStyle === "home") {
        panelSize = RecipePanelSize.LARGE
    } else if (panelStyle === "transaction"){
        panelSize = RecipePanelSize.SMALL
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

const panelStyles = {
    SMALL: { height: 110, },
    MEDIUM: { height: 130, },
    LARGE: { height: 220, }
}

const style = StyleSheet.create({
    kTransactionPanel: {
        marginTop: 10,        
        height: panelStyles.SMALL.height,        
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
        overflow: "hidden",
    },
})
