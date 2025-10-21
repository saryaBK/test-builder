import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { getAllPages } from '../../src/apiCall/post';
import { changeObjectIndex } from '../../src/utility/helper';
import LoadingSection from '../../src/components/LoadingSection/LoadingSection';
import { View } from 'react-native';
import { getFieldById } from '../../src/apiCall/get';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext()

export const AppProvider = ({children}) => {

    const [pages , setSortPages] = useState(null)
    const [navPages , setNavPages] = useState(null)

    const {data: content_type } = useQuery({
        queryKey: ['content_types'],
        queryFn: async () => {
            const res = await getFieldById({field_id: 'content_type'})
            return res?.data
        },
        staleTime: Infinity,
        placeholderData: keepPreviousData,
    })
    
    const {data , isFetching , isLoading} = useQuery({
        queryKey: ['all-pages'],
        queryFn: async () => {
            const res = await getAllPages({
                sendData: { content_type: content_type?.field_options?.find(i => i?.code == 'mobile_page')?.id}
            });
            if(res?.data?.data){
                var sortPages = changeObjectIndex(res?.data?.data , res?.data?.data?.findIndex(i => i?.is_home_page) , 0)
                AsyncStorage.setItem('pages' , JSON.stringify(changeObjectIndex(res?.data?.data , res?.data?.data?.findIndex(i => i?.is_home_page) , 0)) )
                setSortPages(sortPages)
                setNavPages(sortPages?.filter(i => i?.show_in_mobile_bar))
                return res?.data?.data
            }
            return null
        },
        staleTime: Infinity,
        placeholderData: keepPreviousData,
        enabled: content_type ? true : false
    })

    const getDefaultPages = async () => {
        var th = await AsyncStorage.getItem('pages');
        if(th){
            th = JSON.parse(th)
        }
        return th || null
    }

    useEffect(() => {
        getDefaultPages().then((res) => {
            setSortPages(res)
            setNavPages(res?.filter(i => i?.show_in_mobile_bar))
        })
    },[])

  return (
    (isFetching && !pages) || (isLoading && !pages) || (!content_type && !pages) ? 
    <View style={{flex:1 , justifyContent:'center'}}>
        <LoadingSection /> 
    </View>
    :
    <AppContext.Provider value={{
        pages,
        navPages,
        isFetching,
        isLoading
    }}>
        {children}
    </AppContext.Provider>
  )
}

const useApp = () => useContext(AppContext)

export default useApp