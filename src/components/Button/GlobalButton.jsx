import React from 'react'
import { Button, Form } from '@ant-design/react-native'
import useTheme from '../../../contexts/useTheme/useTheme'

const GlobalButton = ({children, loading ,onPress,disabled , ...props }) => {

  const {theme} = useTheme()

  return (
    <Button 
      style={{
        backgroundColor: loading ? 'lightgray' : theme?.light_color , 
        paddingLeft: 0 , 
        paddingRight: 0 , 
        marginTop: 10 , 
        borderRadius: theme?.button_border_radius,
      }}
      onPress={onPress}
      loading={loading}
      disabled={loading}
      >
      {children}
    </Button>
  )
}

export default GlobalButton
