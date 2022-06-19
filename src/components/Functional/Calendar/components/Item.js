import React from 'react'
import { View, Text } from 'react-native'

const Item = ({ item }) => {
  return (
    <Text>{item != -1 && item}</Text>
  )
}

export default Item