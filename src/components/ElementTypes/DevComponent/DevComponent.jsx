import React from 'react'
import { Text, View } from 'react-native'

const DevComponent = ({element}) => {
  return (
    <View>

        {element?.id == '' ?
            <Text>
                handle
            </Text>
        : <Text>
                DevComponent {element?.id}
            </Text>}


    </View>
  )
}

export default DevComponent