import React from 'react'
import { Image, Text, View } from 'react-native';
import useLang from '../../../../contexts/useLanguage/useLanguage';
import { setUpStyle } from '../../../utility/helper';
import useTheme from '../../../../contexts/useTheme/useTheme';
import usePage from '../../../../contexts/usePage/usePage';

const ItemDetils = ({element}) => {
    const {lang} = useLang()
    const {theme} = useTheme()
    const {item} = usePage()

    var displayed_fields = element?.displayed_fields?.split(',')

    return (
    <View
    style={{
        ...setUpStyle(element , theme),
    }}
    >
        <Text style={{fontSize: 24 , marginBottom: 10 , fontWeight:'bold'}}>
            {(lang == 'en' ? (element?.text || 'hi im Title') : (element?.[`text_${lang}`] || element?.text || 'hi im Title') )}
        </Text>

        <View>
                <View
                style={{
                    width:'100%',
                    height: 150,
                    borderRadius:8,
                    backgroundColor:'white'
                }}
                >
                    <Image 
                        style={{
                            width:'100%',
                            height:'100%',
                            objectFit: 'contain',
                        }}
                        source={{
                            uri: item?.[element?.image_field]?.file_url
                        }}
                    />
                </View>
            
            <View style={{marginTop: 20 , gap: 5}}>
                {displayed_fields?.map((key) => {
                    return(
                        <Text 
                            key={key}
                            ellipsizeMode="tail"
                            style={{fontWeight: 500}}
                        >
                            {item?.[key] ? `${item?.[key]}` : ''}
                        </Text>
                    )
                })}
            </View>
            
        </View>

    </View>
  )
}

export default ItemDetils