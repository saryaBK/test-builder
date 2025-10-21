import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from "@tanstack/react-query";
import { getSiteTheme } from "../../src/apiCall/get";
import { View } from "react-native";


const ThemeContext = createContext()

var defaultColor = {
    main:'#365ea8',
    fontColor: '#20202',
    backgroundColor: '#cfcfd4',
    fontLight: '#cfcfd4'
}

export const ThemeProvider = ({children}) => {
    const [themeType , setThemeType] = useState('light')
    const [theme , setTheme] = useState(null)
    const [openDrawer , setOpenDrawer] = useState(false)

    const {data , isLoading} = useQuery({
        queryKey: ['app-theme'],
        queryFn: async () => {
            const res = await getSiteTheme()
            if(res?.data?.data?.[0]){
                var newObj = {...res?.data?.data?.[0]}
                Object.keys(newObj).map((key) => {
                    if(newObj[key] && typeof newObj[key] == 'string' && newObj[key].includes('px')){
                        newObj[key] = parseInt(newObj[key]?.replace('px' , ''))
                    }
                })
                //parseInt(theme?.button_border_radius?.replace('px' , ''))
                newObj.mobile_bg_color = newObj.mobile_bg_color ? newObj.mobile_bg_color : 'white'
                AsyncStorage.setItem('theme' , JSON.stringify({...newObj , ...defaultColor , white_font: 'white'}))
                    setTheme({...newObj , ...defaultColor , white_font: 'white'})
                return res?.data?.data?.[0]
            }
            return null
        },
        staleTime: Infinity
    })

    const handleChangeMode = async () => {
        if(themeType == 'light'){
            setThemeType('dark')
            setTheme({
                main:'#365ea8',
                fontColor: '#cfcfd4',
                backgroundColor:'#202021',
                fontLight: '#cfcfd4',
            })
            try {
                await AsyncStorage.setItem('themeType', 'dark');
            }catch(e){}
        }else{
            setThemeType('light')
            setTheme({
                main:'#365ea8',
                fontColor: '#20202',
                backgroundColor: '#cfcfd4',
                fontLight: '#cfcfd4'
            })
            try {
                await AsyncStorage.setItem('themeType', 'light');
            }catch(e){}
        }
    }

    const setDefaultTheme = async () => {
        var th = await AsyncStorage.getItem('theme');
        if(th){
            th = JSON.parse(th)
        }
        return th || null
    }

    useEffect(() => {
        setDefaultTheme().then((res) => {
            setTheme(res)
        })
    },[])


    return(
        isLoading && !theme ? <View></View> : 
        <ThemeContext.Provider value={{
            theme , setTheme , themeType , setThemeType , handleChangeMode , setOpenDrawer , openDrawer
        }}>
            {children}
        </ThemeContext.Provider>
    )
}



const useTheme = () => useContext(ThemeContext)

export default useTheme