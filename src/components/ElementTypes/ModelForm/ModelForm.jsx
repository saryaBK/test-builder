import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import useLang from '../../../../contexts/useLanguage/useLanguage'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {  getModelFields } from '../../../apiCall/get'
import RenderFields from '../../RenderFields/RenderFields'
import { Button, Form } from '@ant-design/react-native'
import usePage from '../../../../contexts/usePage/usePage'
import { getFieldDefaultValue, isDateField, isDateTimeField, isFileField, isTimeField } from '../../../utility/typeAndStructure'
import { postAddNewModelItem } from '../../../apiCall/post'
import { useNavigation } from '@react-navigation/core'
import useTheme from '../../../../contexts/useTheme/useTheme'
import { putAddNewModelItem } from '../../../apiCall/put'
import LoadingSection from '../../LoadingSection/LoadingSection'


const ModelForm = ({element}) => {
    const {lang} = useLang()
    const [form] = Form.useForm();
    const [lod , setLod] = useState(false)
    const fieldRef = useRef({})
    const {ScrollViewRef} = usePage()
    const queryClient = useQueryClient()
    const navigation = useNavigation()
    const {theme} = useTheme()
    const {item , isFetchingItemData} = usePage()

    const [trigger , setTrigger] = useState(0)
    const {data , isFetching , isLoading} = useQuery({
        queryKey: ['model-fields' , {id: `${element?.data_source_model}`}],
        queryFn: async () => {
            var res = await getModelFields({modelId: element?.data_source_model})
            return res?.data || []
        },
        enabled: element?.data_source_model ? true : false,
        staleTime: Infinity
    })

    const handleFinish = async (values) => {
        setLod(true)
        var sendData = {...values}
        data?.map((field) => {
            if(isDateField(field)){
                sendData[field.code] = sendData[field.code] ? sendData[field.code]?.toISOString()?.split("T")?.[0] : ''
            }else if(isTimeField(field)){
                sendData[field.code] = sendData[field.code] ? sendData[field.code]?.map(i => i?.toString()?.length == 1 ? `0${i}` : i )?.join(':') : ''
            }else if(isDateTimeField(field)){
                sendData[field.code] = sendData[field.code] ? sendData[field.code]?.toISOString()?.split("T")?.[0] : ''
            }else if(isFileField(field)){
                if(sendData[field.code]?.file_id){
                    delete sendData[field.code]
                }else{
                    sendData[field.code] = sendData[field.code]
                }
            }
        })

        var res
        if(element?.form_update_item?.code == "url_parameter"){
            res = await putAddNewModelItem({model_id: element?.data_source_model , sendData , itemId: item?.id})
            
        }else{
            res = await postAddNewModelItem({model_id: element?.data_source_model , sendData})
        }
        
        if(res?.data){
            queryClient.invalidateQueries({queryKey: [`model-data` , {model: element?.data_source_model}]})
            queryClient.invalidateQueries({queryKey: ['itemData' , {id: item?.id}]})
        }

        if(element?.form_update_item?.code == "url_parameter" && res?.data){
            navigation.goBack()
        }else{
            form.resetFields()
        }
        setLod(false)
    }

    const setUpDefaultValues = () => {
        var iniData = {}
        data?.map((field) => {
            if(isDateField(field)){
                iniData[field.code] = element?.form_update_item?.code == "url_parameter" ? new Date(item?.[field.code])
                : getFieldDefaultValue(field?.properties) ? new Date(getFieldDefaultValue(field?.properties)) : ''
            }else if(isTimeField(field)){
                iniData[field.code] = element?.form_update_item?.code == "url_parameter" ? item?.[field.code]?.split(':')?.map(i => i)
                : getFieldDefaultValue(field?.properties)?.split(':')?.map(i => i)
            }else if(isDateTimeField(field)){
                iniData[field.code] = element?.form_update_item?.code == "url_parameter" ? new Date(item?.[field.code])
                : getFieldDefaultValue(field?.properties) ? new Date(getFieldDefaultValue(field?.properties)) : ''
            }else{
                iniData[field.code] = element?.form_update_item?.code == "url_parameter" ? item?.[field.code] : getFieldDefaultValue(field?.properties)
            }
        })
        return iniData
    }


    useEffect(() => {
        if(form && data && !isFetchingItemData){
            var gotField = form?.getFieldsError()?.find(i => i?.errors?.length > 0)
            if(gotField){
                var ref = fieldRef.current[gotField?.name?.[0]]
                    ref.measureLayout(ScrollViewRef.current, (x, y) => {
                      ScrollViewRef.current.scrollTo({ y: y -10, animated: true });
                    }
                );
            }
        }
    },[trigger])

  return (
    <View>
        <Text style={{fontSize: 20 , fontWeight: 'bold'}}>
            {element?.[`text${lang != 'en' ? `_${lang}` : ''}`]}
        </Text>
        {isFetchingItemData ? 
        <LoadingSection />
        : 
        data && setUpDefaultValues() ?
        <Form
        initialValues={setUpDefaultValues()}
        form={form}
        onFinish={handleFinish}
        style={{backgroundColor:'transparent' , padding:0 , flex: 1}}
        styles={{
            Body:{
                borderColor:'transparent'
            }
        }}
        >
            <RenderFields trigger={trigger} fieldRef={fieldRef} element={element} fields={data}/>
            <Button 
            style={{backgroundColor: lod ? 'lightgray' : theme?.light_color}}
            disabled={lod}
            loading={lod}
            onPress={() => {
                form.submit()
                setTimeout(() => {
                    setTrigger(Date.now())
                }, 0);
            }}>
               <Text style={{color: theme?.white_font , fontSize: 18}}>{element?.form_update_item?.code == "url_parameter" ? 'save' : 'submit' }</Text>
            </Button>
        </Form>
        : null}
    </View>
  )
}

export default ModelForm