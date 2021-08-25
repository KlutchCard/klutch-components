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
}

export const KHeader: React.FC<KHeaderProps> = ({style, showBackArrow, onBackArrowPressed, textStyle, ...props}: KHeaderProps) => {
    
    const history = useHistory()

    const backArrowPressed = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        if (onBackArrowPressed) {
            onBackArrowPressed()
            return
        }
        history.goBack()
    }

    return (
        <View style={[styles.kheader, style]}>
            {showBackArrow ? (
                <Pressable style={styles.arrow} onPress={backArrowPressed} hitSlop={50}> 
                    <BackArrow />
                </Pressable>
            ): null}
            <KText style={[showBackArrow &&  {marginLeft: -16}, styles.kheaderText, textStyle]} {...props} />    
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
      <Path d="M16 8H2M9 15L2 8l7-7" stroke="#191919" strokeWidth={2} />
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
        fontSize: KlutchTheme.header.size,   
        letterSpacing: 0.7,
        textAlign: "center",
        flex: 1,            
    },
    arrow: {                
        flexBasis: 16,
        zIndex: 1        
    }
})