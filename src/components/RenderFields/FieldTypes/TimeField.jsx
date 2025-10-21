import { DatePicker , PickerView , Modal, Form, Input} from '@ant-design/react-native'
import React, { useState } from 'react'
import { Text , View , TouchableOpacity } from 'react-native'


const hours = Array.from({ length: 24 }, (_, i) => ({ label: `${i}`, value: i }));
const minutes = Array.from({ length: 60 }, (_, i) => ({ label: `${i}`, value: i }));
const seconds = Array.from({ length: 60 }, (_, i) => ({ label: `${i}`, value: i }));

const TimeField = ({field , fieldInfo , trigger}) => {

    const [visible, setVisible] = useState(false);

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
          {({setFieldValue , getFieldValue}) => {
            return(
              <>
              <Form.Item 
              name={field?.code}
              style={{
                display:'none'
              }} 
              rules={[
                ...(fieldInfo?.isRequired ? [fieldInfo?.isRequired] : []),
              ]}
              >
                <Input />
              </Form.Item>
              <TouchableOpacity onPress={() => {
                if(!fieldInfo?.isReadOnly){
                  setVisible(true)
                }
              }} style={{ borderWidth: 1, padding: 10, borderRadius: 5 }}>
                  <Text style={{ fontSize: 16 }}>{`${getFieldValue(field?.code)?.map(i => i?.toString()?.length == 1 ? `0${i}` : i )?.join(':') || ''}`}</Text>
                </TouchableOpacity>
                <Modal
                  popup
                  visible={visible}
                  animationType="slide-up"
                  onClose={() => setVisible(false)}
                  maskClosable={true}
                >
                  <View style={{ padding: 20 }}>
                      <PickerView
                        data={[hours, minutes , seconds]}
                        value={getFieldValue(field?.code) || ''}
                        cascade={false}
                        onChange={(val) => {
                          setFieldValue(field?.code, val)
                        }}
                      />
                    <TouchableOpacity
                      onPress={() => setVisible(false)}
                      style={{ opacity: fieldInfo?.isReadOnly ? 0.3 : 1 , marginTop: 20, backgroundColor: "#1677ff", padding: 10, borderRadius: 5, alignItems: "center" }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "bold" }}>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
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

export default TimeField


const labelRenderer = (type, data) => {
    switch (type) {
        case 'hour':
        return data
        case 'minute':
        return data
        case 'second':
        return data
    }
}