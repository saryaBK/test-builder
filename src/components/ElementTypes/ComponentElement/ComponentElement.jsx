import React from 'react'
import { Text, View } from 'react-native'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getPageData } from '../../../apiCall/get'
import { buildTree } from '../../../utility/helper'
import LoadingSection from '../../LoadingSection/LoadingSection'


const LazyRenderPage = React.lazy(() => import('../../RenderPage/RenderPage'));

const ComponentElement = ({element}) => {

    const {data , isFetching , isLoading} = useQuery({
        queryKey: ['component' , element?.related_component?.id],
        queryFn: async () => {
            const res = await getPageData({modelCode: 'wsb_pages' , pageId: element?.related_component?.id})
            if(res?.data?.data?.[0]){
                var newData = {...res?.data?.data?.[0]}
                newData.related_childrens = buildTree(newData?.related_childrens)
                return newData
            }
            return null
        },
        enabled: element?.related_component?.id ? true : false,
        placeholderData: keepPreviousData,
        staleTime: Infinity
    })


    const assignedVariables = element?.assigned_fields ? JSON.parse(element?.assigned_fields) : null

  return (
        isLoading ? <LoadingSection style={{marginTop: 20}} size={25}/> : data ?
        <LazyRenderPage component={data} assignedVariables={assignedVariables} elements={data?.related_childrens}/> 
        : null
  )
}

export default ComponentElement