import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import Input from '../../Input/Input';
import { Form } from '@ant-design/react-native';

const NumberField = ({field , fieldInfo}) => {
    const [number , setNumber] = useState('')
    const handleChange = (event) => {
        event.persist()
        var text = event?.nativeEvent?.text
        const filteredText = text.replace(/[^0-9]/g, '');
        setNumber(filteredText);
    };

  return (
    <View style={{
      gap:5,
      display: fieldInfo?.isVisible ? '' : 'none'
    }}
    >
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
        label={fieldInfo?.label}
        layout='vertical'
        rules={[
          ...(fieldInfo?.isRequired ? [fieldInfo?.isRequired] : []),
        ]}
        >
           <Input disabled={fieldInfo?.isReadOnly} type='number' />
        </Form.Item>
    </View>
  )
}

export default NumberField