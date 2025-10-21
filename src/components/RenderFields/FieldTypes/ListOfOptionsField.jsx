import { Form, Input } from '@ant-design/react-native';
import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

const ListOfOptionsField = ({field , fieldInfo , trigger}) => {
    const [value, setValue] = useState(false);
    var items = field?.field_options?.map((item) => {
        return {
            label: item?.text,
            value: item?.id
        }
    }) || []

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

export default ListOfOptionsField