import { Form, Switch } from '@ant-design/react-native';
import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'

const BooleanFiled = ({field , fieldInfo}) => {
    const [isEnabled, setIsEnabled] = useState(false);
  return (
    <View style={{
      gap:5,
      display: fieldInfo?.isVisible ? '' : 'none'
    }}>
        {/* <Text>{fieldInfo?.label}</Text> */}
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
        name={field?.code}
        valuePropName='checked'
        label={fieldInfo?.label}
        layout='vertical'
        rules={[
          ...(fieldInfo?.isRequired ? [fieldInfo?.isRequired] : []),
        ]}
        >
          <Switch
            disabled={fieldInfo?.isReadOnly}
            style={{
              alignSelf:'flex-start'
            }}
          />
        </Form.Item>
    </View>
  )
}

export default BooleanFiled