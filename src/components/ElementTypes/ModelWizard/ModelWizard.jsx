import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { getModelDesign } from '../../../apiCall/get'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import RenderFields from '../../RenderFields/RenderFields';
import { Button, Form } from '@ant-design/react-native';
import { getFieldDefaultValue, isBooleanField, isDateField, isDateTimeField, isFileField, isTimeField } from '../../../utility/typeAndStructure';
import { postAddNewModelItem } from '../../../apiCall/post';
import usePage from '../../../../contexts/usePage/usePage';
import LoadingSection from '../../LoadingSection/LoadingSection';
import useLang from '../../../../contexts/useLanguage/useLanguage';
import { putAddNewModelItem } from '../../../apiCall/put';
import useTheme from '../../../../contexts/useTheme/useTheme';
import { useNavigation } from '@react-navigation/core';

const ModelWizard = ({element}) => {
    const [lod , setLod] = useState(false)
    const {ScrollViewRef , item , isFetchingItemData} = usePage()
    const [trigger , setTrigger] = useState()
    const [activeStep , setActiveStep] = useState(0)
    const [form] = Form.useForm();
    const fieldRef = useRef({})
    const queryClient = useQueryClient()
    const navigation = useNavigation()
    const {lang} = useLang()
    const {theme} = useTheme()

    const {data , isLoading , isFetching} = useQuery({
        queryKey: [{element_id: element?.id , model: element?.data_source_model}],
        queryFn: async () => {
            return await getModelDesign({model_id: element?.data_source_model})
        },
        enabled: element?.data_source_model ? true : false,
        staleTime: Infinity,
        placeholderData: keepPreviousData
    })

    const fields = useMemo(() => {
        var f = []
        data?.data?.containers?.map((tab) => {
            if(tab?.containers){
                tab?.containers?.map((container) => {
                    if(Array.isArray(container?.fields)){
                        f.push(...container.fields)
                    }
                    
                })
            }
        })
        return f
    },[data])

    const getTabFields = (tab) => {
        var fields = []
        tab?.containers?.map((container) => {
            if(Array.isArray(container?.fields)){
                fields.push(...container?.fields)
            }
        })
        return fields
    }


    const handleFinish = async (values) => {
        setLod(true)
        var sendData = {...values}
        fields?.map((field) => {
            if(isDateField(field)){
                sendData[field.code] =  sendData[field.code] ? sendData[field.code]?.toISOString()?.split("T")?.[0] : ''
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
            setActiveStep(0)
        }
        setLod(false)
    }

    const setUpDefaultValues = () => {
        var iniData = {}
        fields?.map((field) => {
            if(isDateField(field)){
                iniData[field.code] = element?.form_update_item?.code == "url_parameter" ? new Date(item?.[field.code])
                : getFieldDefaultValue(field?.properties) ? new Date(getFieldDefaultValue(field?.properties)) : ''
            }else if(isTimeField(field)){
                iniData[field.code] = element?.form_update_item?.code == "url_parameter" ? item?.[field.code]?.split(':')?.map(i => i)
                : getFieldDefaultValue(field?.properties)?.split(':')?.map(i => i)
            }else if(isDateTimeField(field)){
                iniData[field.code] = element?.form_update_item?.code == "url_parameter" ? new Date(item?.[field.code])
                : getFieldDefaultValue(field?.properties) ? new Date(getFieldDefaultValue(field?.properties)) : ''
            }else if(isBooleanField(field)){
                iniData[field.code] = element?.form_update_item?.code == "url_parameter" ? (item?.[field.code] || false) : getFieldDefaultValue(field?.properties)
            }else{
                iniData[field.code] = element?.form_update_item?.code == "url_parameter" ? item?.[field.code] : getFieldDefaultValue(field?.properties)
            }
        })
        return iniData

        
    }


    useEffect(() => {
        if(trigger){
            var gotField = form.getFieldsError()?.find(i => i?.errors?.length > 0)
            if(gotField){
                var fieldContainer = null 
                for(var tab = 0; tab <= data?.data?.containers?.length - 1; tab++){
                    for(var i = 0; i <= data?.data?.containers[tab]?.containers?.length - 1; i++){
                        if(data?.data?.containers[tab]?.containers[i]?.fields?.find(i => i?.code == gotField?.name?.[0])){    
                            fieldContainer = tab
                            break;
                        }
                    }
                    if(fieldContainer || fieldContainer === 0){
                        break;
                    }
                }
                
                if(fieldContainer || fieldContainer ===  0){
                    setActiveStep(fieldContainer)
                    setTimeout(() => {
                        var ref = fieldRef.current[gotField?.name?.[0]]
                        ref.measureLayout(ScrollViewRef.current, (x, y) => {
                        ScrollViewRef.current.scrollTo({ y: y -10, animated: true });
                        })               
                    }, 0);

                }
            }
        }
    },[trigger])


  return (
    <View>
        <Text style={{fontSize: 20 , marginBottom: 20 , fontWeight: 'bold'}}>
            {element?.[`text${lang != 'en' ? `_${lang}` : ''}`]}
        </Text>
        {data?.data?.containers ?
        <ProgressSteps topOffset={0} activeStep={activeStep}>
            {data?.data?.containers?.map((tab , index) => {
            return(
                <ProgressStep removeBtnRow={true} key={tab?.id} label={tab?.name}>
                </ProgressStep>
            )
        })}
        </ProgressSteps>
        : null}

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
            {data?.data?.containers?.map((tab , index) => {
                return(
                    <View key={tab?.id} style={{ flexDirection:'column' , display: activeStep == index  ? 'flex' : 'none'}}>
                        <RenderFields element={element} fieldRef={fieldRef} fields={getTabFields(tab)} trigger={trigger}/>
                    </View>
                )
            })}
            <View style={{flexDirection:'row' , gap: 10 , marginTop: 20 , justifyContent: 'flex-end'}}>
                {activeStep > 0 && <Button onPress={() => setActiveStep(activeStep - 1)} style={{width:`49%`}}>Back</Button>}
                {<Button 
                style={{width:`49%`, backgroundColor: lod ? 'lightgray' : theme?.light_color}}
                disabled={lod}
                loading={lod}
                onPress={() => {
                    if(activeStep == data?.data?.containers?.length - 1){
                        form.submit()
                        setTimeout(() => {
                            setTrigger(Date.now())
                        }, 0);
                    }else{
                        setActiveStep(activeStep + 1)
                    }
                }} 
                >
                    <Text style={{color: theme?.white_font , fontSize: 18}}>
                        {activeStep == data?.data?.containers?.length - 1 ? (element?.form_update_item?.code == "url_parameter" ? 'Save' : 'Submit') :  'Next'}
                    </Text>
                </Button>}
            </View>
        </Form>
        : null}
    </View>
  )
}

export default ModelWizard