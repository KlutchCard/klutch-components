import React from "react"
import { Rect } from 'react-native-svg'
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'


export const PanelLoading = () => (
    <SvgAnimatedLinearGradient height="90%">
        <Rect x="0" y="15" rx="2" ry="2" width="100%" height="15" />
        <Rect x="0" y="35" rx="2" ry="2" width="90%" height="15" />
        <Rect x="0" y="55" rx="2" ry="2" width="40%" height="15" />
    </SvgAnimatedLinearGradient>
)
