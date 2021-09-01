import { DateTime } from 'luxon';
import React, { PropsWithChildren } from "react"
import { Text, TextProps, StyleSheet } from "react-native"
import KlutchTheme from "./KlutchTheme"

//@ts-ignore
if (Text.defaultProps == null) Text.defaultProps = {};
//@ts-ignore
Text.defaultProps.allowFontScaling = false; 

export interface KTextProps extends TextProps {
    format?: "currency" |  "currency-smallcents" | "from-now" | "long-datetime",         
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
                var wholeDollars = normalizedChildren > 0 ? Math.floor(normalizedChildren): Math.ceil(normalizedChildren)
                var dollars =  (wholeDollars + "").replace(/(\d)(?=(\d{3})+(?!\d))/gm, "$1,")
                var cents = (normalizedChildren.toFixed(2)  + "").slice(-2)
                normalizedChildren = (  
                    <>
                    {dollars}
                    <KText style={[styles.ktext, extraStyle, style, fontWeightStyle, {fontSize: 10}]}>.{cents}</KText>
                    </>
                )                    
                break;
        }                
    }
    
    if (normalizedChildren instanceof Date) {
        switch (format) {
            case "from-now": 
                normalizedChildren = DateTime.fromJSDate(normalizedChildren).toRelative() || ""
                break;
            case "long-datetime": 
                normalizedChildren = DateTime.fromJSDate(normalizedChildren).toLocaleString(DateTime.DATETIME_MED)
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