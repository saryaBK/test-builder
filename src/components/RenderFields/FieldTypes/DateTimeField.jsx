import { DatePicker, Form, Input } from '@ant-design/react-native'
import React, { useState } from 'react'
import { Text , View , TouchableOpacity } from 'react-native'

const DateField = ({field , fieldInfo , trigger}) => {

  const [visible , setVisible] = useState(false)

  return (
    <View style={{gap: 0 , display: fieldInfo?.isVisible ? '' : 'none'}}>
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
              <DatePicker
              style={{
                height:200,
              }}
              renderLabel={labelRenderer}
              format="YYYY-MM-DD"
              value={getFieldValue(field?.code)}
              visible={visible}
              precision='second'
              onVisibleChange={(e) => fieldInfo?.isReadOnly ? null : setVisible(e)}
              onChange={(e) => {
                setFieldValue(field?.code , e)
              }}
              >
                <TouchableOpacity style={{opacity: fieldInfo?.isReadOnly ? 0.3 : 1 }} onPress={() => fieldInfo?.isReadOnly ? null : setVisible(true)}>
                  <View style={{borderWidth: 1 , borderColor: 'black' , padding: 12 , borderRadius: 8}}>
                    <Text>{getFieldValue(field?.code) ? `${getFieldValue(field?.code)?.toISOString()?.split("T")?.[0]}` : ''}</Text>
                  </View>
                </TouchableOpacity>
              </DatePicker>
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

export default DateField


const labelRenderer = (type, data) => {
  switch (type) {
    case 'year':
      return data
    case 'month':
      return data
    case 'day':
      return data
    case 'hour':
      return data
    case 'minute':
      return data
    case 'second':
      return data
    default:
      return data
  }
}