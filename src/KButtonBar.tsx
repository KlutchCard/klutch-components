import React, { PropsWithChildren } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

export interface KButtonBar {
    style?: StyleProp<ViewStyle>
}

export const KButtonBar: React.FC<KButtonBar> = ({style, children, ...props}: PropsWithChildren<KButtonBar>) => {

    const count = React.Children.count(children)

    

    return (
    <View style={[styles.kbuttonBar, style] }>
        {React.Children.map(children, (child: any, i) => 
             React.cloneElement(child, {style: [child.props.style, extraStyle(i)]})
        )}
    </View>
    )

    function extraStyle(i: number) {
        if (i == 0) {
            return styles.firstButton
        } 
        if (i == count -1) {
            return styles.lastButton
        } else {
            return styles.middleButton
        }
    }
}

export default KButtonBar


const styles = StyleSheet.create({
    kbuttonBar: {
        flexDirection: "row"        
    },
    firstButton: {
        marginRight: 5
    },
    lastButton: {
        marginLeft: 5
    },
    middleButton: {
        marginLeft: 5,
        marginRight: 5
    }
})