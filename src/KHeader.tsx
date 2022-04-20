import * as Haptics from 'expo-haptics'; 
import React from "react";
import {Pressable, StyleProp, StyleSheet, TextStyle, View} from "react-native"
import Svg, { Path, SvgProps } from "react-native-svg";
import { useHistory } from 'react-router-native';
import KlutchTheme from "./KlutchTheme";
import KText, { KTextProps } from "./KText";

export interface KHeaderProps extends KTextProps {
    showBackArrow? : boolean
    onBackArrowPressed?: () => void
    textStyle?: StyleProp<TextStyle>
    size?: "small" | "large"
    align?: "left" | "center" 
    color?: string
    vibrationFeedback?: boolean
}

export const KHeader: React.FC<KHeaderProps> = ({style, showBackArrow, onBackArrowPressed, textStyle, align, size="small", color, vibrationFeedback = false, ...props}: KHeaderProps) => {
    
    const history = useHistory()

    const backArrowPressed = () => {
        if (onBackArrowPressed) {
            onBackArrowPressed()
            return
        }
        if (vibrationFeedback === true) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        history.goBack()
    }

    return (
        <View style={[styles.kheader, style]}>
            {showBackArrow ? (
                <Pressable style={styles.arrow} onPress={backArrowPressed} hitSlop={50}> 
                    <BackArrow color={color} />
                </Pressable>
            ): null}
            <KText style={[showBackArrow &&  {marginLeft: -16},   
                    {textAlign: align || "center"},
                    {fontSize: size === "large" ? KlutchTheme.header.size : KlutchTheme.header.smallSize},
                    {color: color || KlutchTheme.header.color},
                    styles.kheaderText, 
                    textStyle]} {...props} />    
        </View>
    )
}

const BackArrow = (props: SvgProps) => (
    <Svg
      width={16}
      height={16}
      fill="none"      
      {...props}
    >
      <Path d="M16 8H2M9 15L2 8l7-7" stroke={props.color || "#191919"} strokeWidth={2} />
    </Svg>
    )

export default KHeader

const styles = StyleSheet.create({
    kheader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20
    },
    kheaderText: {
        textTransform: "uppercase",
        fontFamily: KlutchTheme.header.fontFamily,
        letterSpacing: 0.7,

        flex: 1,            
    },
    arrow: {                
        flexBasis: 16,
        zIndex: 1        
    }
})