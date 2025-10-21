import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import useTheme from '../../../../contexts/useTheme/useTheme';
import { setUpStyle } from '../../../utility/helper';

const DropdownElement = ({element}) => {

      const [value, setValue] = useState(null);
      const {theme} = useTheme()
      console.log(element)
      const items = element?.items?.map((item , index) => {
        return{
            value: item?.id,
            label: item?.item_name,
        }
    }) || []

  return (
    <View>
        <Dropdown
            style={{
                height: 50,
                borderColor: theme.dark_color,
                borderWidth: 1,
                borderRadius: theme.button_border_radius,
                paddingHorizontal: 8,
                minWidth:150,
                ...setUpStyle(element , theme)
            }}
            itemTextStyle={{
              color: theme.font_dark
            }}
            placeholderStyle={{
              color: theme.font_dark
            }}
            data={items}
            labelField="label"
            valueField="value"
            placeholder="Select an item"
            value={value}
            onChange={item => setValue(item.value)}
        />
    </View>
  )
}

export default DropdownElement