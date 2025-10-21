import react from "react";
import { useQuery, useQueryClient , keepPreviousData } from "@tanstack/react-query";
import { getElementData } from "../../../apiCall/get";
import { Button, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import LoadingSection from "../../LoadingSection/LoadingSection";
import styles from "../../../theme/theme";
import useTheme from "../../../../contexts/useTheme/useTheme";
import SliderView from "./DataDisplayTypes/SliderView/SliderView";
import GridListView from "./DataDisplayTypes/GridListView/GridListView";
import { useNavigation } from "@react-navigation/core";
import CustomComponent from "../../CustomComponent/CustomComponent";
import useLang from "../../../../contexts/useLanguage/useLanguage";

const DataDisplay = ({element , ModelIdOFRelatedGridField , data , is_item_display , handleClickOverwrite , is_category}) => {
    const queryClient = useQueryClient()
    const {theme} = useTheme()
    const {lang} = useLang()
    const navigation = useNavigation()

    const {data: componentData , isLoading , isFetching} = useQuery({
        queryKey: [{elementId: `${element?.id}` , model: `${element?.data_source_model}` , is_category : is_category ,lang} , is_item_display ? element?.item_display_component?.id : element?.data_display_component?.id ],
        queryFn: async () => {
            
            return await getElementData({modelId: element?.data_source_model})
        },
        staleTime: Infinity,
        placeholderData: keepPreviousData,
        enabled: (!is_item_display && element?.data_display_component?.id ) || (is_item_display && element?.item_display_component?.id) ? true : false
    })

    var items = data || componentData?.data?.data || componentData?.data || null
    
    var displayed_fields = is_item_display ? element?.items_displayed_fields?.split(',') : element?.displayed_fields?.split(',')

    var imageField = is_item_display ? element?.item_image_field : element?.image_field

    const handlePress = (e , item) => {
        
        if(handleClickOverwrite){
            handleClickOverwrite(item)
            return 
        }

        var isToDetailsPageAction = element?.related_events?.find(i => i?.event_action?.code == 'to_details')
        if(isToDetailsPageAction){
            if(isToDetailsPageAction?.to_page?.show_in_mobile_bar && isToDetailsPageAction?.to_page?.show_in_mobile_bar != '0'){
                navigation.navigate(`${isToDetailsPageAction?.to_page?.page_name}-${isToDetailsPageAction?.to_page?.id}` , {item: item , itemModelId: ModelIdOFRelatedGridField || element?.data_source_model})
            }else{
                navigation.navigate(isToDetailsPageAction?.to_page?.page_name , {item: item , itemModelId: ModelIdOFRelatedGridField || element?.data_source_model})
            }
        }

    }

    return(
        isLoading ? <LoadingSection /> : 
        !items ? <Text>empty</Text> :
        element?.data_display_type?.code == 'mobile_grid_list_items' && !is_category ? 
        <GridListView handlePress={handlePress} imageField={imageField} element={element} items={items} displayed_fields={displayed_fields} />
        :
        element?.data_display_type?.code == 'mobile_slider' && !is_category ?
        <SliderView handlePress={handlePress} imageField={imageField} element={element} items={items} displayed_fields={displayed_fields}/>
        :
        element?.data_display_type?.code == 'custom_component' || is_category ?
        <CustomComponent is_item_display={is_item_display} handlePress={handlePress} items={items} element={element}/>
        : null
    )
}

export default DataDisplay

{/* <TouchableOpacity style={{marginTop: 10}}>
    <Button onPress={() => queryClient.invalidateQueries({ queryKey: [{elementId: `${element?.id}` , model: `${element?.data_source_model}`}]  })} title="reset" />
</TouchableOpacity>  */}