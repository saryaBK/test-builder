import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { getFieldPropertyForRelatedGridFieldForFarFieldId, getFieldPropertyForRelatedGridFieldModel } from '../../../utility/typeAndStructure'
import { getElementData, getFieldById, getGridDataByFieldId } from '../../../apiCall/get'
import useTheme from '../../../../contexts/useTheme/useTheme'
import LoadingSection from '../../LoadingSection/LoadingSection'
import DataDisplay from '../DataDisplay/DataDisplay'
import useLang from '../../../../contexts/useLanguage/useLanguage'

const CategoryListItem = ({element}) => {
    const [selectedItem , setSelectedItem] = useState()
    const {theme} = useTheme()
    const {lang} = useLang()
    const {ref} = useRef()

    const {data: GridField} = useQuery({
        queryKey: [{fieldId: element?.grid_field}],
        queryFn: async () => {
            const res = await getFieldById({field_id: element?.grid_field})
            return res?.data || null
        },
        placeholderData: keepPreviousData,
        staleTime: Infinity
    })

    
    const {data: sectionData , isLoading , isFetching} = useQuery({
        queryKey: [{isCategory: true , elementId: `${element?.id}` , model: `${element?.data_source_model}`}],
        queryFn: async () => {
            const res = await getElementData({modelId: element?.data_source_model})  
            return res?.data?.data || null
        },
        staleTime: Infinity,
        placeholderData: keepPreviousData
    })


    var ModelOFRelatedGridField = getFieldPropertyForRelatedGridFieldModel(GridField)
    var FarRelatedField = getFieldPropertyForRelatedGridFieldForFarFieldId(GridField)
    
    const {data: items , isLoading: isLoadingItems} = useQuery({
        queryKey: [selectedItem?.id , element?.data_source_model?.id , GridField?.id],
        queryFn: async () => {
            var body = {
                [FarRelatedField.value] : selectedItem?.id
            }

            const res = await getGridDataByFieldId({body , modelId: ModelOFRelatedGridField?.value})
            return res?.data?.data || null
        },
        enabled: selectedItem?.id && GridField ? true : false,
    }) 

    useEffect(() => {
        
        if(!selectedItem && sectionData){
            setSelectedItem(sectionData?.[0])
        }
    },[sectionData])

    var fields = Array.from(element?.displayed_fields?.split(','), String)

    const handlePressCategory = (item) => {
        setSelectedItem(item)
    }

    useEffect(() => {
        if(lang == 'ar'){
            ref.current.scrollToEnd({animated: false})
        } 
    },[])

  return (
    <View
    style={{
        gap: 10
    }}
    >
        <ScrollView 
        style={{
            direction:'ltr'
        }}
        contentContainerStyle={{
            gap:10,
            flexDirection: lang == 'ar' ? 'row-reverse' : 'row'
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        >
            {sectionData && element?.data_display_component?.id ?
                <DataDisplay key={element?.id} handleClickOverwrite={handlePressCategory} is_category data={sectionData} element={element} /> 
                :
                sectionData?.map((item) => {
                return(
                    <TouchableOpacity
                    key={item?.id}
                    onPress={() => {
                        handlePressCategory(item)
                    }}
                    >
                    <View 
                    style={{
                        minWidth: 100,
                        flexDirection: 'row',
                        gap: 10,
                        alignItems:'center',
                        borderRadius: 28,
                        borderColor: theme?.dark_bg_color,
                        backgroundColor: selectedItem?.id == item?.id ? theme?.dark_bg_color : 'white',
                        borderWidth: 2,
                        paddingHorizontal: 5,
                    }}
                    >
                        <Image
                        style={{width: 40 , height: 40 , borderRadius: 25  , objectFit: 'cover'}}
                            source={{
                                uri: item[element?.image_field]?.file_url
                            }}
                        />
                        <Text style={{color: selectedItem?.id == item?.id ? 'white' : ''}}>
                            {item?.[fields[0]]}
                        </Text>
                    </View>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>

        {!selectedItem ? null : isLoadingItems ? 
        <LoadingSection/> : 
            <DataDisplay key={`${element?.id}-${element?.data_display_type?.code}`} ModelIdOFRelatedGridField={ModelOFRelatedGridField?.value} is_item_display data={items} element={element} />
        }

    </View>
  )
}

export default CategoryListItem