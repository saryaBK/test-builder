import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator } from "react-native";
import useTheme from "../../../contexts/useTheme/useTheme";

const LoadingSection = ({size , style}) => {
    const {theme} = useTheme() || {}

    return(
        <ActivityIndicator style={style} size={size || 50} color={theme?.dark_bg_color}  />
    )
}

export default LoadingSection