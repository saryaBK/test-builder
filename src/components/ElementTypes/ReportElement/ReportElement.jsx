import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Dimensions , Text, View } from 'react-native'
import { BarChart, LineChart } from 'react-native-chart-kit'
import { getReportDataById, getreportFieldsById } from '../../../apiCall/get'
import { isBooleanField, isDateField, isFileField, isNumberField } from '../../../utility/typeAndStructure'
import LoadingSection from '../../LoadingSection/LoadingSection'
import { Dropdown } from 'react-native-element-dropdown'

const ReportElement = ({element}) => {

  const [params , setParams] = useState({filters: {} , page: 1})

  const {data: reportFields , isFetching: isFetchingreportFields , isLoading: isLoadingreportFields} = useQuery({
    queryKey: ['report_fields' , {id: element?.data_source_model}],
    queryFn: async () => {
      const res = await getreportFieldsById({reportId: element?.data_source_model})
      return res?.data || null
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    enabled: element?.data_source_model ? true : false
})

  

  const {data: reportData , isLoading: isLoadingreportData} = useQuery({
      queryKey: ['report_data' , {id: element?.data_source_model} , {page: params?.page} , {filters: params?.filters}],
      queryFn: async () => {
        var filters = ''
        Object.keys(params?.filters)?.map((key) => {
            filters += `&field_${key}=${params?.filters[key]}`
        })
        var res = await getReportDataById({reportId: element?.data_source_model , page: params?.page , filters: filters})
        if(res?.data?.data){
            var reportDataKeys = res?.data?.data?.map((item , index) => {
                return {...item , key: index}
            })
            res.data.data = reportDataKeys
        }
        return res
    },
    placeholderData: keepPreviousData,
    enabled: element?.data_source_model ? true : false
  })

  return (
    <View>
      {isLoadingreportData || isLoadingreportFields ? 
      <LoadingSection />
      : reportFields && reportData ?
      <ChartsView reportFields={reportFields} reportData={reportData}/>
      : <Text>empty</Text>
      }
      
    </View>
  )
}

export default ReportElement


const ChartsView = ({reportFields , reportData}) => {

  function handleChangeStringField (e , returnValue) {
    if(returnValue == 'value'){
        return e
    }
    setXField(e)
  }

  const StringFieldList = reportFields?.filter(i => !isNumberField(i?.field) && !isBooleanField(i?.field) && !isFileField(i?.field)  && !i?.is_sme && i.type == 1)
  const NumberFields = reportFields?.filter(i => isNumberField(i?.field) || i?.is_sme || i.type != 1)

  const [xField , setXField] = useState(StringFieldList?.length > 0 ? handleChangeStringField(StringFieldList[0]?.id , 'value') : null)
  const [yField , setYField] = useState(NumberFields?.length > 0 ? handleChangeStringField(NumberFields[0]?.id , 'value') : null)


  const data = {
    labels: reportData?.data?.data?.map((item) => {
      return item?.[xField] || ''
    }),
    datasets: [
      {
        data: reportData?.data?.data?.map((item) => {
          return item?.[yField] || 0
        })
      }
    ]
  }
    
  return(
    <View style={{gap:10}}>

    <View>
      <Text>String Field</Text>
      <Dropdown 
        style={{
          height: 40,
          borderRadius: 8,
          borderColor: 'black',
          borderWidth: 1
        }}
        data={StringFieldList?.map((field) => {
          return{
            value: field?.id,
            label: field?.override_name || field?.field?.name
          }
        })}
        labelField="label"
        valueField="value"
        placeholder="Select an item"
        onChange={(e) => {
          setXField(e?.value)
        }}
        value={xField}
      />
      </View>


      <View>
        <Text>Number Field</Text>
      <Dropdown 
        style={{
          height: 40,
          borderRadius: 8,
          borderColor: 'black',
          borderWidth: 1
        }}
        data={NumberFields?.map((field) => {
          return{
            value: field?.id,
            label: field?.override_name || field?.field?.name
          }
        })}
        value={yField}
        labelField="label"
        valueField="value"
        placeholder="Select an item"
        onChange={(e) => {
          setYField(e?.value)
        }}
      />
      </View>
    

     <LineChart
        data={data}
        width={Dimensions.get("window").width - 20} // from react-native
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#d0dff7",
          backgroundGradientFrom: "#1955b4",
          backgroundGradientTo: "#75a7f8",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
        }}
        bezier
        style={{
          borderRadius: 16
        }}
      />

      
      <BarChart
          data={data}
          width={Dimensions.get("window").width - 20} // from react-native
          height={220}
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#d0dff7",
            backgroundGradientFrom: "#1955b4",
            backgroundGradientTo: "#75a7f8",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          bezier
          style={{
            borderRadius: 16,
          }}
        />
      

    </View>
  )
}