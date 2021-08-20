import {StyleSheet, useWindowDimensions} from "react-native"

const Colors =  {
    primary: "#191919",
    secondary: "#6B6B6B",
    background: "#F5F5F5",
    successColor: "#34865F",
    failureColor: "#E51A30",
    primaryButtonColor: "#687A87",
    failureonBlackColor: "FD475A"

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
        size: 30,
        smallSize: 25
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
            disabledBackGroundColor: Colors.primaryButtonColor,
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
    scrollWindowMargin: 100,
    screen: {
      paddingHorizontal: 20,
      paddingTop: 70,
    },
}

export default KlutchTheme
