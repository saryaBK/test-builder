import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import useLang from '../../../../contexts/useLanguage/useLanguage'
import { t } from 'i18next'
import { useQuery } from '@tanstack/react-query';
import FormSignup from './FormSignup'
import { getElementData } from '../../../apiCall/get'
import LoginType from './LoginType'

const LoginForm = () => {
  const {lang} = useLang()
  const [formType , setFormType] = useState('login')

  const {data: configData ,  isLoading} = useQuery({
    queryKey: [`guest_config_model`, {lang: lang}],
    queryFn: async () => {
        const res = await getElementData({lang , modelId: 'guest_config_model'})
        return res?.data?.data?.[0] || null
    },
    staleTime: Infinity,
  })

  const onChange = () => {
    formType == 'signup' ? setFormType('login') : setFormType('signup')
  };

  return (
    configData &&
    <View>
      {formType == 'signup' ? <FormSignup configData={configData} setFormType={setFormType}/> :
      formType == 'login' ? <LoginType configData={configData}/> : null}

      <TouchableOpacity
      onPress={onChange} 
      style={{flex:1,flexDirection:"row",gap:"10",paddingTop:20}}>
        {formType == 'login' ? <Text>{t('Don’t have any account?')}</Text> : <Text>{t('Already Have Any Account?')}</Text>}
        <Text>{formType == 'login' ? t('signup') : t('login')}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginForm