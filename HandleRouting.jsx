import React from "react";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import useApp from "./contexts/useApp/useApp";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import useTheme from "./contexts/useTheme/useTheme";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DynamicScreen } from "./screens/DynamicScreen/DynamicScreen";
import Header, { CustomDrawerContent } from "./src/components/Header/Header";
import { useQueryClient } from "@tanstack/react-query";
import useLang from "./contexts/useLanguage/useLanguage";

const Tab = createBottomTabNavigator();


const HandleRouting = ({}) => {
    const {pages , navPages} = useApp()
    const {lang} = useLang()
    const {theme} = useTheme()
    const queryClient = useQueryClient()

    return(
        <View style={{direction: lang == 'ar' ? 'rtl' : 'ltr' , flex: 1 }}>
            <NavigationContainer
            theme={{ colors: { background: theme?.mobile_bg_color } }}
            >
                <CustomDrawerContent />
                <Tab.Navigator
                    screenOptions={{ animation: 'fade' , header: (props) => {
                        return <Header {...props} pages={pages}
                        />
                    } }}
                    backBehavior="history"
                    tabBar={(props) => <CustomTabBar {...props} navPages={navPages} />}
                >
                    {pages?.map((page) => (
                        <Tab.Screen
                            key={page?.id}
                            name={`${page?.page_name}-${page?.id}`}
                            component={PageContent}
                            initialParams={{ page, AllPages: pages }}
                        />
                    ))}
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    )
}

export default HandleRouting


const PageContent = ({route}) => {
    const {pages} = useApp()
    var currentPage = pages?.find(i => i?.id == route?.params?.page?.id)
    return(
        // <View>
        //     <Text>test</Text>
        // </View>
        <DynamicScreen page={currentPage} pages={pages}/>
    )
}

const CustomTabBar = ({state , navigation , navPages}) => {

    const {theme} = useTheme()

    return(
        <View style={{
            height: 60 , 
            flexDirection: 'row' , 
            justifyContent: 'space-around',
            marginHorizontal:10,
            marginBottom:5,
            backgroundColor: theme?.mobile_bg_color ,
            borderWidth: 1,
            borderColor: theme?.dark_color,
            borderRadius: 28,
            }}>
            {navPages?.map((page) => {
                var currentPage = page
                return(
                    <Pressable key={page?.id} 
                    onPress={() => navigation.navigate(`${page?.page_name}-${page?.id}`)}
                    style={{justifyContent: 'center'}}
                    >
                        {currentPage?.page_icon?.code == "home_icon" ?
                            <Entypo name="home" size={30} color={theme?.light_color} />
                        : 
                        currentPage?.page_icon?.code == "settings_icon" ?
                            <Ionicons name="settings" size={30} color={theme?.light_color} />
                        :
                        currentPage?.page_icon?.code == "profile_icon" ?
                            <FontAwesome name="user"  size={30} color={theme?.light_color} />
                        :
                        currentPage?.page_icon?.code == "login_icon" ?
                            <Entypo name="login" size={30} color={theme?.light_color} />
                        :
                        
                        <Text>{currentPage?.page_name}</Text>
                        }
                    </Pressable>
                )
            })}
        </View>
    )
}