import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BOLD_FONT } from '../../../../styles/fonts'


const AdminUsers = ({ route, setRoute }) => {
  return (
    <View>


      <View style={styles.header}>
        <TouchableOpacity onPress={() => setRoute('')}>
          <Text style={{ fontFamily: BOLD_FONT }}>Назад</Text>
        </TouchableOpacity>

        <Text style={{ fontFamily: BOLD_FONT }}>Пользователи в системе</Text>
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 30,
    marginBottom: 30,
  },
})


export default AdminUsers
