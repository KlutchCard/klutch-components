import { KText } from "./KText"
import { KlutchTheme } from "./KlutchTheme"
import React, { PropsWithChildren } from "react"
import { View, StyleSheet } from "react-native"


export interface KTransactionPanelProps {
    recipeName: string
}

export const KTransactionPanel: React.FC<KTransactionPanelProps> = ({recipeName, children, ...props} : PropsWithChildren<KTransactionPanelProps>) => {


    return (
        <View style={style.kTransactionPanel}>
            <KText style={style.recipeName} fontWeight="semibold">{recipeName}</KText>
            <View>                
                {children}
            </View>
        </View>
    )    
}

export default KTransactionPanel

const style = StyleSheet.create({
    kTransactionPanel: {
        marginVertical: 10,
        height: 100,
        width: "100%",
        backgroundColor: "white",
        paddingVertical: 5,
        paddingHorizontal: 10       
    },
    recipeName: {
        textTransform: "uppercase",
        color: KlutchTheme.colors.secondary
    }
})