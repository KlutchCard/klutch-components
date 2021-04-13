import {StyleSheet, useWindowDimensions} from "react-native"

const Colors =  {
    primary: "#191919",
    secondary: "#6B6B6B",
    background: "#F5F5F5",
    successColor: "#34865F",
    failureColor: "#E51A30",
    primaryButtonColor: "#687A87"
    
}

 

export const KlutchTheme = {    
    colors: Colors,
    backgroundColor: Colors.background,
    font: {
        color: Colors.primary,
        fontFamily: "Inter_400Regular",
        semiBoldFontFamily: "Inter_600SemiBold",
        boldFontFamily: "Inter_700Bold",
        size: 15,
        smallSize: 13
    },
    header: {
        color: Colors.primary,
        fontFamily: "Inter_700Bold",
        size: 30
    },
    form: {
        label: {
            color: Colors.secondary,
            size: 13
        },
        input: {
            borderBottomColor: Colors.secondary,
            borderBottomWidth:  StyleSheet.hairlineWidth,
            fontSize: 13
        },
        button: {
            backgroundColor: Colors.primaryButtonColor,
            foreGroundColor: Colors.background,
            disabledForeGroundColor: "white",
            disabledBackGroundColor: "#B3BABF",
            pressedBackground: "#4A5A66"
        },        
    },
    panel: {
        backgroundColor: "white"
    },
    darkBox: {
        background: Colors.primary,
        titleColor: "white",
        descriptionColor: Colors.secondary
    },
    scrollWindowMargin: 100
}

export default KlutchTheme