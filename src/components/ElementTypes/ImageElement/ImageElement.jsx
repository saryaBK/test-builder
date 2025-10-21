import React from "react";
import { Image } from "react-native";
import { setUpStyle } from "../../../utility/helper";
import useTheme from "../../../../contexts/useTheme/useTheme";
import usePage from "../../../../contexts/usePage/usePage";


const ImageElement = ({element , assignedVariables , component , currentItem}) => {
    const {theme} = useTheme()
    const {item} = usePage()

    var key = assignedVariables && component && component?.related_variables?.find(i => i.variable_code == element?.data_code)?.id

    var value = key ? currentItem?.[assignedVariables[key]]?.file_url : element?.data_code && item ? item?.[element?.data_code]?.file_url : null

    
    return(
        <Image 
            style={{
                width:80 , 
                ...(!setUpStyle(element , theme)?.height ?
                {height: 80}
                : {}),
                ...(!setUpStyle(element , theme)?.objectFit ?
                {objectFit: 'contain'}
                : {}),
                ...setUpStyle(element , theme),
            }}
            source={value || element?.image_url ? {
                uri: value || element?.image_url
            } : require('../../../../assets/no_image.jpg')}
        />
    )
}

export default ImageElement