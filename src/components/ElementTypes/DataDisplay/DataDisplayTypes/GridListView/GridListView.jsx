import React from 'react'
import { Image, Text, View , TouchableOpacity} from 'react-native'
import useTheme from '../../../../../../contexts/useTheme/useTheme'
import { Button } from '@ant-design/react-native'
import { t } from 'i18next'

const GridListView = ({element , items , displayed_fields , imageField , handlePress}) => {
    const {theme} = useTheme()
  return (
        <View style={{gap: 15 , flexDirection: 'row' , flexWrap:'wrap' , justifyContent:'center'}}>
            {items?.map((item , index) => {
                return(
                    <TouchableOpacity 
                    key={item?.id} 
                    activeOpacity={1}
                    >
                        <View 
                        style={{
                            width:150,
                            minHeight: item?.[imageField]?.file_url ? 200 : 'auto',
                            borderRadius: 8,
                            backgroundColor: theme.light_bg_color,
                            overflow:'hidden',
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
                            </View>}
                            <View style={{padding: 15 , gap: 5 }}>
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
                                <Button 
                                onPress={(e) => {
                                    handlePress(e , item)
                                }}
                                style={{
                                    backgroundColor: theme?.light_color , 
                                    paddingLeft: 0 , 
                                    paddingRight: 0 , 
                                    width: 80 , 
                                    height: 30 , 
                                    marginTop: 'auto' , 
                                    borderRadius: theme?.button_border_radius
                                }}
                                >
                                    <Text style={{color: theme?.white_font}}>
                                        {t('See More')}
                                    </Text>
                                </Button>
                            </View>
                        </View>
                </TouchableOpacity>
                )
            })}
        </View>
  )
}

export default GridListView