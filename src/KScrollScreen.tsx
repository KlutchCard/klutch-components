import React, { ForwardRefRenderFunction, PropsWithChildren, PropsWithRef } from "react"
import type {ScrollView, ScrollViewProps } from "react-native"
import KScreen from "./KScreen"
import KScrollView from "./KScrollView"


export const KScrollScreen = React.forwardRef<ScrollView, PropsWithChildren<ScrollViewProps>>(({style, ...props}: PropsWithChildren<ScrollViewProps>, ref) => {



    return (
        <KScreen style={style}>
            <KScrollView ref={ref as any} {...props} />
        </KScreen>
    )
})

export default KScrollScreen

