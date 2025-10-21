import React, { createContext, useContext, useEffect, useState } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18n from "i18next"
import { getLocalStorage } from "../../src/utility/get";
import ar from '../../languages/ar/ar.json'
import en from '../../languages/en/en.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from "react-native";
import LoadingSection from "../../src/components/LoadingSection/LoadingSection";

const LanguageContext = createContext()

export const LanguageProvider = ({children}) => {
    const [lang , setLang] = useState(null)
    const [lod , setLod] = useState(true)

    const changeLanguage = async (newLang) => {
        try {
            await AsyncStorage.setItem('lang', newLang || 'en');
            Initi18next({
                symbol: newLang || 'en',
                resourceLang: newLang === 'ar' ? ar : en,
                relode: true,
            });
        } catch (e) {
            console.error("Failed to change language:", e);
        }
    };
    
    const Initi18next = ({ symbol, resourceLang, relode }) => {
        setLang(symbol);
        i18n.use(initReactI18next).init({
            resources: {
                [symbol]: {
                    translation: resourceLang,
                },
            },
            interpolation: {
                escapeValue: false,
            },
            lng: symbol,
        });
    };
    
    const getDefaultLang = async () => {
        setLod(true)
        var tempLang = await getLocalStorage({key: 'lang'})
        if(tempLang){
            Initi18next({symbol: tempLang , resourceLang : tempLang == 'ar' ? ar : en})
        }else{
            Initi18next({symbol: 'en' , resourceLang: en})
        }
        setLod(false)
    }

    useEffect(() => {
        getDefaultLang()
    },[])


    return(
        !lod && lang ?
        <I18nextProvider i18n={i18n}>
            <LanguageContext.Provider value={{
                lang, setLang , changeLanguage
            }}>
                {children}
            </LanguageContext.Provider>
        </I18nextProvider>
        :
        <View style={{flex:1 , justifyContent:'center'}}>
            <LoadingSection /> 
        </View>
    )
}



const useLang = () => useContext(LanguageContext)

export default useLang