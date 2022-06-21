import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const NotificationIndex = ({ data, setData }) => {

  console.log('adsdasdasdas', data);

  if (!data?.type) {
    return (
      <View></View>
    )
  }

  return (
    <View style={{
      // position: 'absolute',
      // bottom: 50,
      // left: 50,

      backgroundColor: 'red'
    }}>
      {/* <Text>{}</Text> */}
      <TouchableOpacity onPress={() => setData(null)}>
        <Text>Закрыть</Text>
      </TouchableOpacity>
    </View>
  )
}

export default NotificationIndex;