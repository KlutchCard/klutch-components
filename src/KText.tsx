import moment from "moment"
import React, { PropsWithChildren } from "react"
import { Text, TextProps, StyleSheet } from "react-native"
import KlutchTheme from "./KlutchTheme"

export interface KTextProps extends TextProps {
    format?: "currency" |  "currency-smallcents" | "from-now",         
    fontWeight?: "semibold" | "bold" 
}




export const KText: React.FC<KTextProps> = ({style,  format, children, fontWeight,...props}: PropsWithChildren<KTextProps>) => {
    
    var extraStyle = null    
    var fontWeightStyle = null


    if (fontWeight) {
        switch (fontWeight) {
            case "semibold" : fontWeightStyle = styles.semiBold; break;
            case "bold": fontWeightStyle = styles.bold; break;
        }
    }

    var normalizedChildren = children ?? ""
    if (typeof normalizedChildren === "number") {
        switch (format) {
            case "currency": 
                normalizedChildren =  normalizedChildren.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/gm, "$1,")
                break;
            case "currency-smallcents": 
                var dollars =  (Math.floor(normalizedChildren) + "").replace(/(\d)(?=(\d{3})+(?!\d))/gm, "$1,")
                var cents = (normalizedChildren.toFixed(2)  + "").slice(-2)
                normalizedChildren = (  
                    <>
                    {dollars}
                    <KText style={{fontSize: 10}}>.{cents}</KText>
                    </>
                )                    
                break;
        }                
    }
    
    if (normalizedChildren instanceof Date) {
        switch (format) {
            case "from-now": 
                normalizedChildren = moment(normalizedChildren).fromNow()
                break;
        }
    }

    return (        
        <Text style={[styles.ktext, extraStyle, style, fontWeightStyle]} {...props}>
            {normalizedChildren}
        </Text>
    )
}


export default KText

const styles = StyleSheet.create({
    ktext: {
        fontFamily: KlutchTheme.font.fontFamily,   
        color: KlutchTheme.font.color,
        fontSize: KlutchTheme.font.size  
    },
    semiBold: {
        fontFamily: KlutchTheme.font.semiBoldFontFamily
    },
    bold: {
        fontFamily: KlutchTheme.font.boldFontFamily
    }
})