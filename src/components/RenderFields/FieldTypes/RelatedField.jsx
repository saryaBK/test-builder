import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { getSearchItemData } from '../../../apiCall/get';
import { getValueFromSearchItemData } from '../../../utility/typeAndStructure';
import { Form, Input } from '@ant-design/react-native';

const RelatedField = ({field , fieldInfo , trigger}) => {
    const [value, setValue] = useState(false);

    const {data , isLoading , isFetching} = useQuery({
        queryKey: [{modelId: field?.related_relation?.[0]?.model , field: field?.id}],
        queryFn: async () => {
            var res =  await getSearchItemData({modelId: field?.related_relation?.[0]?.model })
            return res?.data?.data || []
        },
        enabled: field?.related_relation?.[0]?.model ? true : false,
        staleTime: Infinity,
    })


    var items = data?.map((item) => {
        return{
            label: getValueFromSearchItemData(item),
            value: Object.keys(item)?.[0]
        }
    })

  return (
    <View style={{
        gap:5,
        display: fieldInfo?.isVisible ? '' : 'none'
      }}>
        <Text style={{fontSize: 17}}>{fieldInfo?.isRequired ? <Text style={{color:'red'}}>* </Text> : ''}{fieldInfo?.label}</Text>
        <Form.Item 
        styles={{
          Line:{
            padding:0,
            paddingVertical:0,
            paddingRight:0,
            paddingTop:0
          }
        }}
        style={{
          paddingLeft:0,
          backgroundColor:'transparent'
        }} 
        shouldUpdate={(newValue , prevValue) => newValue?.[field?.code] != prevValue?.[field?.code]}
        // name={field?.code}
        >
          {({getFieldValue , setFieldValue}) => {
            return(
            <>
            <Form.Item
              style={{
                display:'none'
              }} 
              name={field?.code}
              rules={[
                ...(fieldInfo?.isRequired ? [fieldInfo?.isRequired] : []),
              ]}
              >
                <Input />
              </Form.Item>
            <Dropdown
              disable={fieldInfo?.isReadOnly}
                style={{
                    height: 50,
                    borderColor: 'black',
                    borderWidth: 0.5,
                    borderRadius: 10,
                    paddingHorizontal: 8,
                }}
                containerStyle={{
                    backgroundColor:'white',
                    width: '95%',
                    borderRadius: 8,
                    alignSelf:'center',
                }}
                showsVerticalScrollIndicator={true}
                data={items}
                labelField="label"
                valueField="value"
                placeholder="Select an item"
                value={getFieldValue(field?.code)}
                onChange={item => setFieldValue(field?.code , item.value)}
              />
              {trigger && fieldInfo?.isRequired && !getFieldValue(field?.code) ?
                <Text style={{color:'red', marginTop:5}}>this field is required</Text>
              : null}
            </>
            )
        }}
        </Form.Item>
    </View>
  )
}

export default RelatedField