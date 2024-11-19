import React, { useEffect } from 'react'
import { Text, View } from 'react-native'

export default function Profile({ navigation, item }) {
  
  useEffect(() => {
    console.log(item)
  
  },[])
  
    return (
    <View>
        <Text>{item}asdasddasdasdasdad</Text>
    </View>
  )
}
