import React, { useEffect, useRef } from 'react'
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import useTheme from '../../../../../../contexts/useTheme/useTheme'
import useLang from '../../../../../../contexts/useLanguage/useLanguage'


const SliderView = ({items , element , displayed_fields , imageField ,handlePress}) => {
    const {theme} = useTheme()
    const {lang} = useLang()
    const ref = useRef()

    useEffect(() => {
        if(lang == 'ar'){
            ref.current.scrollToEnd({animated: false})
        } 
    },[])

  return (
    <View>
        <ScrollView
        ref={ref}
        style={{
            direction:'ltr'
        }}
        contentContainerStyle={{
            gap:10,
            padding:10,
            flexDirection: lang == 'ar' ? 'row-reverse' : 'row'
        }}
        horizontal
        >
        {items?.map((item) => {
            return(
            <TouchableOpacity 
            key={item?.id} 
            onPress={(e) => {
                handlePress(e , item)
            }}
            activeOpacity={1}
            style={{
                direction: lang == 'ar' ? 'rtl' : 'ltr'
            }}
            >
                <View 
                style={{
                    width:150,
                    minHeight: item?.[imageField]?.file_url ? 200 : 'auto',
                    borderRadius: 8,
                    backgroundColor: theme.light_bg_color,
                    justifyContent:'space-between'
                }}
                >
                    {item?.[imageField] &&
                    <View>
                        <Image 
                            style={{width: '100%' , objectFit: 'fill' , height: 100}}
                            source={{
                                uri: item?.[imageField]?.file_url || ''
                            }}
                        />
                    </View>
                    }
                    <View style={{padding: 15 }}>
                        {displayed_fields?.map((key) => {
                            return(
                                <Text 
                                    key={key}
                                    style={{color: theme?.font_dark }}
                                    numberOfLines={2} 
                                    ellipsizeMode="tail"
                                >
                                    {`${item?.[key]}`}
                                </Text>
                            )
                        })}
                    </View>
                </View>
            </TouchableOpacity>
            )
            })}
        </ScrollView>      
    </View>
  )
}

export default SliderView