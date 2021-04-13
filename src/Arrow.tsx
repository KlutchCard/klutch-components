import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export interface ArrowProps extends SvgProps {
  color?: string
}

export const Arrow = ({color, ...props}: ArrowProps) => <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"    
    {...props}
  >
    <Path d="M0 8h14M7 15l7-7-7-7" stroke={color || "#fff"} strokeWidth={2} />
</Svg>

export default Arrow