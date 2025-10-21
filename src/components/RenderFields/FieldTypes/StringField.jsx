import React from 'react'
import { Text, TextInput, View } from 'react-native'
import Input from '../../Input/Input'
import { Form } from '@ant-design/react-native'
import { getFieldWidget, isWidgetEmail } from '../../../utility/typeAndStructure'

const StringField = ({field , fieldInfo}) => {
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
          backgroundColor:'transparent',
        }}
        label={fieldInfo?.label}
        name={field?.code}
        layout='vertical'
        rules={[
          ...(fieldInfo?.isRequired ? [fieldInfo?.isRequired] : []),
          ...(isWidgetEmail(getFieldWidget(field)) ? 
          [{type: 'email' , message: `not a valid email`}]
          : [])
        ]}
        >
           <Input disabled={fieldInfo?.isReadOnly}/>
        </Form.Item>
    </View>
  )
}

export default StringField