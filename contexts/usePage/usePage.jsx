import { useRoute } from "@react-navigation/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useRef, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { getItemById } from "../../src/apiCall/get";
import useLang from "../useLanguage/useLanguage";
import LoadingSection from "../../src/components/LoadingSection/LoadingSection";
import useApp from "../useApp/useApp";

const PageContext = createContext()

export const PageProvider = ({children , HomePage}) => {

    const [page , setPage] = useState(null)
    const ScrollViewRef = useRef({})
    const router = useRoute()
    const {lang} = useLang()
    const { itemModelId , item } = router.params || {}
    const {isFetching , isLoading} = useApp()
    const queryClient = useQueryClient()

    const {data: itemData , isLoading: isLoadingItemData , isFetching: isFetchingItemData} = useQuery({
        queryKey: ['itemData' , {id: item?.id}],
        queryFn: async () => {
            const res = await getItemById({itemId: item?.id , modelId: itemModelId , lang})
            return res?.data?.data?.[0] || null
        },
        enabled: item?.id ? true : false
    })
    
    const onRefresh = () => {
        queryClient.invalidateQueries({ queryKey: ['all-pages'] })
    }

    return(
        <PageContext.Provider value={{
            page,
            setPage, 
            ScrollViewRef,
            HomePage,
            itemModelId,
            item: itemData,
            isLoadingItemData,
            isFetchingItemData
        }}>
            {isLoadingItemData ?
            <LoadingSection />
            : 
            <ScrollView 
            style={{marginTop: 10}}
            ref={ScrollViewRef}
            refreshControl={
                <RefreshControl refreshing={isFetching && !isLoading} onRefresh={onRefresh} />
              }
            >
                {children}
            </ScrollView>}
        </PageContext.Provider>
    )
}



const usePage = () => useContext(PageContext)

export default usePage