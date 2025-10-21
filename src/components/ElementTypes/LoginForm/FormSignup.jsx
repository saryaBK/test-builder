import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Input from '../../Input/Input'
import { Form } from '@ant-design/react-native'
import { t } from 'i18next';
import useUser from '../../../../contexts/useUser/useUser';
import { postSignup } from '../../../apiCall/post';
import useTheme from '../../../../contexts/useTheme/useTheme';
import GlobalButton from '../../Button/GlobalButton';


const FormSignup = ({ setFormType, configData}) => {
    const [lod , setLod] = useState(false)
    const {user , setUser} = useUser()
    const [form] = Form.useForm();
    const {theme} = useTheme()

    const onFinish = async (values) => {
      setLod(true)
      var sendData = { ...values }
      const res = await postSignup({sendData})
      if(res?.res?.ok){
        setFormType('login')
      }
      setLod(false)
    }
   
  return (
    <Form
    onFinish={onFinish}
    form={form}
    style={{...styles.formWrapper}}
    styles={{Body:{...styles.formBody}}}
    layout='vertical'
    >
      <Form.Item 
        styles={{Line:{...styles.itemLine}}}
        style={{...styles.itemStyle}}
        labelStyle={{ marginBottom: 5 }}
        label={'Email'} 
        name={'email'} 
        rules={[{required:configData?.email_required ?? true} , {type: 'email' , message: 'email not valid'}]}>
          <Input />
      </Form.Item>

      <Form.Item 
        styles={{Line:{...styles.itemLine}}}
        style={{...styles.itemStyle}}
        labelStyle={{ marginBottom: 5 }}
        label={'mobile'} 
        name={'mobile'} 
        rules={[{required:configData?.mobile_required ?? true}]}>
          <Input />
      </Form.Item>

      <Form.Item 
        styles={{Line:{...styles.itemLine}}}
        style={{...styles.itemStyle}}
        labelStyle={{ marginBottom: 5 }}
        label={'Password'} 
        name={'password'}
        rules={[{required: true}]}
      >
        <Input type='password'/>
      </Form.Item>

      <GlobalButton
        onPress={() => form.submit()}
        loading={lod}
      >
        <Text style={{color: theme?.white_font , fontWeight:'bold'}}>
          {t('signup')}
        </Text>
      </GlobalButton>
    </Form>
  )
}
const styles = StyleSheet.create({
  formWrapper: {
    flex: 1,
    backgroundColor:'transparent' ,
    padding:0 ,
  },
  formBody: {
    borderColor:'transparent',
    gap:10
  },
  itemStyle:{
    paddingLeft:0,
    backgroundColor:'transparent',
  },
  itemLine: {
    padding:0,
    paddingVertical:0,
    paddingRight:0,
    paddingTop:0,
  },
});

export default FormSignup