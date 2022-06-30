import { observer } from 'mobx-react-lite'
import { AppContext } from '../../../store'

import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { DARK_GREY_COLOR, GREY_COLOR, LIGHT_COLOR, LIGTH_GREY_COLOR } from '../../../styles/colors'
import { BLACK_FONT, BOLD_FONT, MEDIUM_FONT } from '../../../styles/fonts'
import AdminProduct from './components/AdminProduct'
import AdminUsers from './components/AdminUsers'

const roles = ['admin']

const AdminProfile = observer(({ navigation }) => {

  const { user } = useContext(AppContext)
  const [route, setRoute] = useState('')

  useEffect(() => {
    if (!roles.find(role => role === user.profile.role)) {
      navigation.navigate('main')
      alert('У вас нет доступа к этой компоненте')
    }
  }, [])

  const routes = [
    { name: "products", component: <AdminProduct route={route} setRoute={setRoute} /> },
    { name: "users", component: <AdminUsers route={route} setRoute={setRoute} /> }
  ]

  return (
    <View style={{ width: '100%', height: '100%' }}>

      {route.length > 0 &&
        <View style={{
          width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, backgroundColor: LIGHT_COLOR, zIndex: 100,
        }}>
          {routes.map(check =>
            check.name === route && check.component
          )}
        </View>
      }

      <TouchableOpacity style={{ marginTop: 30, }} onPress={() => navigation.navigate('main')}>
        <Text>Назад</Text>
      </TouchableOpacity>

      <ScrollView style={styles.sectionScroll}>
        <TouchableOpacity onPress={() => setRoute('products')} style={[styles.section, { marginTop: 50, }]}>
          <Text style={styles.text}>Продукты на подтверждение</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRoute('users')} style={[styles.section, {}]}>
          <Text style={styles.text}>Пользователи в системе</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
})

const styles = StyleSheet.create({
  sectionScroll: {
    width: '100%',
    height: '100%',
  },
  section: {
    width: '100%',
    height: 50,
    backgroundColor: LIGHT_COLOR,
    borderBottomColor: LIGTH_GREY_COLOR,
    borderBottomWidth: 1,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: MEDIUM_FONT,
    fontSize: 16,
    color: DARK_GREY_COLOR
  }
})

export default AdminProfile