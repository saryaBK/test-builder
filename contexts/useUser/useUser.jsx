import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingSection from "../../src/components/LoadingSection/LoadingSection";
import { View } from "react-native";

const UserContext = createContext()

export const UserProvider = ({children}) => {

    const [user , setUser] = useState(null)
    const [lod , setLod] = useState(true)

    const handleLogOut = async () => {
        await AsyncStorage.removeItem('user')
        setUser(null)
    }

    const getUser = async () => {
        setLod(true)
        const tempUser = await AsyncStorage.getItem('user');
        if(tempUser && typeof tempUser == 'string'){
            setUser(JSON.parse(tempUser))
        }
        
        setLod(false)
    }

    useEffect(() => {
        getUser()
    },[])

    return(
        lod ? 
        <View style={{flex:1 , justifyContent:'center'}}>
            <LoadingSection /> 
        </View>
         : 
        <UserContext.Provider value={{
            user , setUser , handleLogOut
        }}>
            {children}
        </UserContext.Provider>
    )
}



const useUser = () => useContext(UserContext)

export default useUser