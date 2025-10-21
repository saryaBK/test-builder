import React from "react";
import useLang from "../../../../contexts/useLanguage/useLanguage";
import { Text } from "react-native";
import useTheme from "../../../../contexts/useTheme/useTheme";
import { setUpStyle } from "../../../utility/helper";
import usePage from "../../../../contexts/usePage/usePage";


const TextElement = ({element , assignedVariables , component , currentItem}) => {
    const {lang} = useLang()
    const {theme} = useTheme()
    const {item} = usePage()

    var key = assignedVariables && component && component?.related_variables?.find(i => i.variable_code == element?.data_code)?.id
    
    var value = key ? currentItem?.[assignedVariables[key]] : element?.data_code && item ? item?.[element?.data_code] :  element?.[`text${lang == 'ar' ? '_ar' : ''}`] || 'hi im text'

    return(
        <Text style={{
            color: theme.font_dark,
            ...setUpStyle(element , theme)
        }}>
            {value || ''}
        </Text>
    )
}

export default TextElement