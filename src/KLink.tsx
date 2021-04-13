import React, { PropsWithChildren } from "react";
import { Pressable, PressableProps } from "react-native";
import { useHistory } from "react-router-native";
import * as Haptics from 'expo-haptics'; 


export interface KLinkProps  extends PressableProps {
    to: string
}

export const KLink: React.FC<KLinkProps> = ({to, children, ...props}: PropsWithChildren<KLinkProps>) => {
    var history = useHistory()

    const onPress = () => {        
        history.push(to)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }

    return (
        <Pressable onPress={onPress} {...props} >
            {children}
        </Pressable>
    )
}

export default KLink