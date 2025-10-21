import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useLang from "../../../../contexts/useLanguage/useLanguage";
import useTheme from "../../../../contexts/useTheme/useTheme";
import { setUpStyle } from "../../../utility/helper";
import useUser from "../../../../contexts/useUser/useUser";
import { useNavigation } from "@react-navigation/core";
import usePage from "../../../../contexts/usePage/usePage";

const ButtonElement = ({element , currentItem , componentParent}) => {
    const {lang} = useLang()
    const {theme} = useTheme()
    const {handleLogOut} = useUser()
    const navigation = useNavigation()
    const { HomePage , item , itemModelId } = usePage()

    const handlePress = () => {

        if(element?.eval_function){
            const functionString = element?.eval_function
            const evalAction = eval(`(${functionString})`);
            evalAction()
        }

        if(element?.related_events?.find(i => i?.event_action?.code == 'logout')){
            handleLogOut()
            navigation.navigate(HomePage)
        }

        
        if(element?.link_to_page){
            if(element?.link_to_page?.show_in_mobile_bar == '1'){
                navigation.navigate(`${element?.link_to_page?.page_name}-${element?.link_to_page?.id}`)
            }else{
                navigation.navigate(element?.link_to_page?.page_name)
            }
        }

        var isToDetailsPageAction = element?.related_events?.find(i => i?.event_action?.code == 'to_details')
        if(isToDetailsPageAction){
            if(currentItem && !item){
                if(isToDetailsPageAction?.to_page?.show_in_mobile_bar != '0'){
                    navigation.navigate(`${isToDetailsPageAction?.to_page?.page_name}-${isToDetailsPageAction?.to_page?.id}` , {item: currentItem , itemModelId: componentParent?.data_source_model})
                }else{
                    navigation.navigate(isToDetailsPageAction?.to_page?.page_name , {item: currentItem , itemModelId: componentParent?.data_source_model})
                }
            }else if(item && !currentItem){
                if(isToDetailsPageAction?.to_page?.show_in_mobile_bar != '0'){
                    navigation.navigate(`${isToDetailsPageAction?.to_page?.page_name}-${isToDetailsPageAction?.to_page?.id}` , {item: item , itemModelId: itemModelId})
                }else{
                    navigation.navigate(isToDetailsPageAction?.to_page?.page_name , {item: item , itemModelId: itemModelId})
                }
            }
        }

    }

    return(
        <TouchableOpacity 
        onPress={handlePress}
        style={{
            borderRadius: 5,
            backgroundColor: theme?.light_color,
            borderRadius: theme?.button_border_radius,
            width: 100,
            minWidth: 60,
            height: 35,
            display:'flex',
            justifyContent:'center',
            ...setUpStyle(element , theme),
            }}>
            <Text style={{color: setUpStyle(element , theme)?.color ? setUpStyle(element , theme)?.color : theme?.white_font , margin:0 , textAlign: 'center' , fontWeight: 'bold'}}>
                {element?.[`text${lang == 'en' ? '' : `_${lang}`}`] || 'hi im button'}
            </Text>
        </TouchableOpacity>
    )
}

export default ButtonElement