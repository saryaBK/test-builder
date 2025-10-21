import React, { useEffect, useRef, useState } from "react"
import useTheme from "../../../contexts/useTheme/useTheme"
import AntDesign from '@expo/vector-icons/AntDesign'
import { Animated, Image, Text, TouchableOpacity, View } from "react-native"
import useLang from "../../../contexts/useLanguage/useLanguage"
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { t } from "i18next"
import useUser from "../../../contexts/useUser/useUser"
import { Entypo } from "@expo/vector-icons"

const Header = ({navigation , route , pages}) => {
    const {theme , setOpenDrawer} = useTheme()
    
    const {lang} = useLang()
    var HomePage = pages?.find(i => i?.is_home_page)
    return(
        <View 
        style={{
            backgroundColor: theme?.light_color,
            height:70,
            justifyContent:'space-between',
            flexDirection:'row',
            alignItems:'center',
            paddingHorizontal:15,
            // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            direction: lang == 'ar' ? 'rtl' : 'ltr',
            zIndex: -1
        }}
        >
            <View style={{gap:20 , flexDirection: 'row' , alignContent:'center'}}>
        
                {!route?.params?.page?.is_home_page &&
                    <AntDesign
                    onPress={() => {
                        if(navigation?.canGoBack){
                            navigation?.goBack()
                        }else{
                            navigation.reset(({
                                index: 0,
                                routes: [{ name: `${HomePage?.page_name}-${HomePage?.id}` }],
                              }))
                        }
                        
                    }} 
                    name={lang == 'ar' ? "arrowright" : 'arrowleft'}
                    size={24} 
                    color="black" 
                    style={{color: theme?.white_font , marginTop:2}}
                    />
                }
                <Text style={{
                    color: theme?.white_font,
                    fontSize: 20,
                    fontWeight:'bold'
                }}>
                    {route?.params?.page?.page_name}
                </Text>
            </View>
            <View>
            
            <SimpleLineIcons 
                onPress={() => setOpenDrawer(true)}
                color={theme?.white_font} 
                name="menu" 
                size={24} 
            />
                {/* {themeType == 'dark' ? 
                    <MaterialIcons onPress={handleChangeMode} name="dark-mode" size={24} color={theme?.fontLight} /> :
                    <Entypo onPress={handleChangeMode} name="light-up" size={24} color={theme?.fontLight} />
                } */}
            </View>
        </View>
    )
}

export default Header


export const CustomDrawerContent = ({navigation , navPages , ...props}) => {
    const {lang , changeLanguage} = useLang()
    const {theme , openDrawer , setOpenDrawer} = useTheme()
    const {user , handleLogOut} = useUser()
    const langs = ['en' , 'ar']
    const translateX = useRef(new Animated.Value(lang == 'ar' ? 0 : 400)).current;

    useEffect(() => {
        Animated.timing(translateX, {
        toValue: lang == 'ar' ? openDrawer ? 310 : 0 : openDrawer ? 0 : 400, // slide in or out
        duration: 300,
        useNativeDriver: true,
        }).start();
  }, [openDrawer , lang]);

    return(
        <View 
        style={{
            backgroundColor: openDrawer ? "rgba(0,0,0,0.5)" : 'transparent',
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: 100,
            pointerEvents: openDrawer ? 'auto' : 'none'
        }}
        >
            <Animated.View 
            style={{
                flex: 1 , 
                backgroundColor: theme?.light_bg_color ,
                padding: 20,
                gap: 20 , 
                direction: lang == 'ar' ? 'rtl' : 'ltr',
                position: 'absolute',
                zIndex: 1000,
                height: '100%',
                width: '80%',
                right: lang == 'en' ? 0 : '100%',
                transform: [{ translateX }]
            }}
            >
                <TouchableOpacity 
                    onPress={() => setOpenDrawer(false)}
                >
                    <View style={{padding: 5}}>
                        <AntDesign name="close" size={24} color="black" />
                    </View>
                </TouchableOpacity>

                <View style={{width:'100%' , alignItems:'center' }}>
                    <Image style={{width:150 , height: 50 , objectFit:'contain'}} source={theme?.mobile_main_logo?.file_url ? 
                    {uri: theme?.mobile_main_logo?.file_url}
                    : require('../../../assets/logo.png')}/>
                </View>

                <View style={{gap: 10}}>
                    <Text style={{fontWeight:'bold' , fontSize: 16}}>
                        {t('languages')}
                    </Text>
                    <View style={{flexDirection:'row' , gap: 10}}>
                    {langs.map((l) => {
                        return(
                            <TouchableOpacity 
                            onPress={() => changeLanguage(l)}
                            key={l}
                            >
                            <View 
                            style={{
                                flexDirection:'row' , 
                                justifyContent:'space-between',
                                gap: 10 , 
                                alignItems:'center' , 
                                backgroundColor: lang == l ?  theme?.light_color : theme?.white_font , 
                                paddingHorizontal: 10 , 
                                paddingVertical:2,
                                width: 80 , 
                                borderRadius: 12,
                                borderColor: 'white',
                                borderWidth: 1
                                }}>
                                <Text style={{fontWeight:'bold' , color: lang == l ? theme?.white_font : 'black' , textTransform: 'uppercase'}}>{l}</Text>
                                <Image style={{
                                    width:30 , 
                                    height: 30 , 
                                    objectFit:'contain',
                                    borderRadius: 15,
                                    }} 
                                    source={l == 'ar' ? require('../../../assets/AR.png') : require('../../../assets/US.png') }
                                    />
                            </View>
                        </TouchableOpacity>
                    )
                    })}
                    </View>
                </View>

                <View>
                    {user ? 
                    <View style={{gap: 10 , flexDirection: 'row' , }}>
                        <Text style={{fontWeight:'bold' , fontSize: 16}}>{t('logOut')}</Text>
                        <Entypo name="log-out" size={24} color="red" onPress={async() => {
                            await handleLogOut()
                            var pageName = `${navPages?.find(i => i?.is_home_page)?.page_name}-${navPages?.find(i => i?.is_home_page)?.id}`
                            navigation.navigate('Tabs', {
                                screen: pageName || 'HOME',
                            });
                            
                        }}/>
                    </View> 
                    : null}
                </View>

            </Animated.View>
        </View>
    )
}