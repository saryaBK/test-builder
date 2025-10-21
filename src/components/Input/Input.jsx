import React from 'react'
import {Input as TextInput} from '@ant-design/react-native'
import useTheme from '../../../contexts/useTheme/useTheme'

const Input = ({disabled , ...props}) => {

  const {theme} = useTheme()

  return (
      <TextInput
      style={{
          borderWidth: 1,
          borderRadius: theme.button_border_radius,
          borderColor: theme.dark_color,
          height: 45,
          width: '100%',
          opacity: disabled ? 0.3 : 1
      }}
      disabled={disabled}
      {...props}
      />
  )
}

export default Input
