import { View, Text } from 'react-native'
import React from 'react'

export default function LoginScreen() {
  return (
    <View className="bg-white h-full w-full">
        <Image className="h-full w-full absolute" source={require('../assets/images/loginimage.jpg')} />
      <Text>LoginScreen</Text>
    </View>
  )
}