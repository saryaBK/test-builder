import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { getPageData } from '../../apiCall/get'
import { buildTree } from '../../utility/helper'

const LazyRenderPage = React.lazy(() => import('../RenderPage/RenderPage'));

const CustomComponent = ({element , is_item_display , is_item_list_detils , items , handlePress}) => {
    var comId =  is_item_display ? element?.item_display_component?.id : element?.data_display_component?.id

    
    const {data , isFetching , isLoading} = useQuery({
        queryKey: ['component' , comId],
        queryFn: async () => {
            const res = await getPageData({modelCode: 'wsb_pages' , pageId: comId})
            if(res?.data?.data?.[0]){
                var newData = {...res?.data?.data?.[0]}
                newData.related_childrens = buildTree(newData?.related_childrens)
                return newData
            }
            return null
        },
        enabled: comId ? true : false,
        placeholderData: keepPreviousData,
        staleTime: Infinity
    })

    var assignedVariable = is_item_display ? element?.item_assigned_fields ? JSON.parse(element?.item_assigned_fields) : {} 
    : is_item_list_detils ? (JSON.parse(element?.items_displayed_fields) || {}) 
    :  element?.assigned_fields ? JSON.parse(element?.assigned_fields) : {}

  return (
    data ?
    items?.map((item) => {
        return(
            <TouchableOpacity activeOpacity={0.8} key={item?.id} onPress={(e) => handlePress(e , item)}>
                <LazyRenderPage 
                    elements={data?.related_childrens} 
                    assignedVariables={assignedVariable}
                    component={data}
                    currentItem={item}
                    parent={element}
                    componentParent={element}
                />
            </TouchableOpacity>
        )
    })
    : <View></View>
  )
}

export default CustomComponent