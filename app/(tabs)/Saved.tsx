import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

export default function Saved() {
  return (
    <View className='bg-primary flex-1 items-center justify-center'>
      <Image source={icons.save} />
      <Text className="text-light-200 font-bold text-xl mt-2">Saved</Text>
    </View>
  )
}