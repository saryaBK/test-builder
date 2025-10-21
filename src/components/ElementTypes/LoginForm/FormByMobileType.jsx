import React, { useEffect, useState } from 'react'
import { Form } from "@ant-design/react-native";
import { t } from 'i18next';
import useUser from '../../../../contexts/useUser/useUser';
import { postLogin } from '../../../apiCall/post';
import { StyleSheet, Text, View } from 'react-native';
import Input from '../../Input/Input'
import GlobalButton from '../../Button/GlobalButton';
import useTheme from '../../../../contexts/useTheme/useTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePage from '../../../../contexts/usePage/usePage';
import { useNavigation } from '@react-navigation/native';

const FormByMobileType = ({sign_in_mobile_opt}) => {
    var showPassInput = sign_in_mobile_opt == 'guest_sign_mobile_pass_otp_both_req' || sign_in_mobile_opt == 'guest_sign_mobile_pass_only'
    var showOtpInput = sign_in_mobile_opt == 'guest_sign_mobile_pass_otp_both_req' || sign_in_mobile_opt == 'guest_sign_mobile_otp_only'

    const {setUser ,user} = useUser()
    const [lod , setLod] = useState(false)
    const [otpInputShow , setOtpInputShow] = useState(false)
    const [data , setData] = useState({})
    const [form] = Form.useForm();
    const {theme} = useTheme()
    const { HomePage } = usePage()
    const navigation = useNavigation()

    const onFinish = async (values) => {
      setLod(true)
      var sendData = !otpInputShow
      ? { ...data, 
          sign_in_type: sign_in_mobile_opt === "guest_sign_mobile_pass_only" 
          ? "mobile_password" 
          : "mobile_sms_otp" 
        }
      : { ...values, ...data, sign_in_type: "mobile_sms_otp" };


      if(!otpInputShow &&  sign_in_mobile_opt == 'guest_sign_mobile_pass_only'){
        const res = await postLogin({ sendData: sendData });
        if(res?.data?.data){
          var s_id = res?.res?.headers?.get('s_id')
          var jwt = res?.data?.meta?.token
          var newUser = {...res?.data?.data , jwt , s_id}
          setUser(newUser)
          await AsyncStorage.setItem('user', JSON.stringify(newUser));
          navigation.reset({index: 0,routes: [{ name: HomePage }]});
        }
      }else if(!otpInputShow &&  sign_in_mobile_opt != 'guest_sign_mobile_pass_only'){
        const res = await postLogin({ sendData: sendData });
        if(res?.res?.ok){
          setOtpInputShow(true)
        }
      }else{
        const res = await postLogin({ sendData: sendData });
          if(res?.data?.data){
          var s_id = res?.res?.headers?.get('s_id')
          var jwt = res?.data?.meta?.token
          var newUser = {...res?.data?.data , jwt , s_id}
          setUser(newUser)
          await AsyncStorage.setItem('user', JSON.stringify(newUser));
          navigation.reset({index: 0,routes: [{ name: HomePage }]});
        }
      }
      setLod(false)
    }
        
  return (
    sign_in_mobile_opt != 'guest_sign_mobile_none' &&
    <Form  
      style={{...styles.formWrapper}}
      styles={{Body:{...styles.formBody}}} 
      form={form} 
      onFinish={onFinish}
      layout="vertical" >
      <>

        {!otpInputShow ?
        <>
        <Form.Item 
        styles={{Line:{...styles.itemLine}}}
        style={{...styles.itemStyle}} 
        labelStyle={{ marginBottom: 5 }}
        label={t('mobile')} name={'mobile'} rules={[{required: true}]}>
          <Input onChange={(e) => setData({ ...data, mobile: e.target.value })}/>
        </Form.Item>

        {showPassInput?
        <Form.Item 
        styles={{Line:{...styles.itemLine}}}
        style={{...styles.itemStyle}}
        labelStyle={{ marginBottom: 5 }} 
        label={t('password')} name={'password'} rules={[{required: true}]}>
          <Input type='password' onChange={(e) => setData({ ...data, password: e.target.value })}/>
        </Form.Item>
        :null }
        </>
        :null}

        {otpInputShow && showOtpInput ?
        <Form.Item 
        styles={{Line:{...styles.itemLine}}}
        style={{...styles.itemStyle}} 
        labelStyle={{ marginBottom: 5 }}
        label={t('verification_code')} name={'verification_code'} rules={[{required: true}]}>
            <Input />
        </Form.Item>
        :null}

      </>

      <GlobalButton
        onPress={() => form.submit()}
        loading={lod}
      >
        <Text style={{color: theme?.white_font , fontWeight:'bold'}}>
          {t('login')}
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

export default FormByMobileType