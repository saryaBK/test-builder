import React from "react";
import { Text } from "react-native";
import useLang from "../../../../contexts/useLanguage/useLanguage";
import useTheme from "../../../../contexts/useTheme/useTheme";
import { useNavigation } from '@react-navigation/native'
import { setUpStyle } from "../../../utility/helper";
const LinkElement = ({element , assignedVariables , component}) => {
    const {lang} = useLang()
    const {theme} = useTheme()
    const navigation = useNavigation()

    var key = assignedVariables && component && component?.related_variables?.find(i => i.variable_code == element?.data_code)?.id
    var value = key ? assignedVariables[key] : element?.[`text${lang == 'ar' ? '_ar' : ''}`] || 'hi im link'

    return(
        <Text 
        onPress={() => {
            if(!element?.link_to_page) return
            navigation.navigate(`${element?.link_to_page?.page_name}-${element?.link_to_page?.id}`)
            // if(element?.link_to_page?.show_in_mobile_bar == '1'){
            //     navigation.navigate(`${element?.link_to_page?.page_name}-${element?.link_to_page?.id}`)
            // }
        }}
        style={{color: theme.font_dark , ...setUpStyle(element , theme)}}>
            {value}
        </Text>
    )
}

export default LinkElement