import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const NewFood = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity style={{ paddingTop: 300 }} onPress={() => navigation.navigate('mainFoodRoute')}>
        <Text>Назад</Text>
      </TouchableOpacity>
      <Text>Add new food</Text>
    </View>
  )
}

export default NewFood