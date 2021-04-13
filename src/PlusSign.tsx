
import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export const PlusSign =  ({color, ...props}: SvgProps) =>     <Svg
width={16}
height={16}
viewBox="0 0 16 16"
fill="none"
{...props}
>
<Path d="M8 0v16M0 8h16" stroke={color || "#191919"} strokeWidth={2} />
</Svg>

export default PlusSign