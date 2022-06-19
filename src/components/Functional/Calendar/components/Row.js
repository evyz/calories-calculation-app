import React from 'react'
import { View, Text } from 'react-native'
import Item from './Item'

const Row = ({ row }) => {
  return (
    <View>
      {row.map(item =>
        <Item item={item} />
      )}
    </View>
  )
}

export default Row