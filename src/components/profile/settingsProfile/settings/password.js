import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { StyleSheet, TextInput, View, Text, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { changePassword } from '../../../../http/user'
import { AppContext } from '../../../../store'
import { DARK_GREY_COLOR, GREEN_COLOR, GREY_COLOR, LIGHT_COLOR, RED_COLOR } from '../../../../styles/colors'
import { BOLD_FONT } from '../../../../styles/fonts'
import { symbols } from '../../../Register/Registration'

const PasswordSetting = observer(() => {
  const { user } = useContext(AppContext)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassoword, setNewPassword] = useState('')

  const [errorValue, setErrorValue] = useState('test')

  const updatePassword = () => {
    if (newPassoword.length < 8) {
      setErrorValue(newPassoword)
      Alert.alert(
        "Ошибка",
        "Пароль должен быть длинее 8 символов"
      )
    }

    try {
      changePassword({ oldPassword, newPassoword }).then(data => {
        console.log(data)
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.block}>
      <Text style={styles.title}>Сменить пароль</Text>
      <TextInput style={[styles.input, { borderBottomColor: errorValue === oldPassword ? RED_COLOR : GREY_COLOR, color: errorValue === oldPassword ? RED_COLOR : DARK_GREY_COLOR, }]} value={oldPassword} onChangeText={setOldPassword} placeholder='Введите текущий пароль' />
      <TextInput style={[styles.input, { borderBottomColor: errorValue === newPassoword ? RED_COLOR : GREY_COLOR, color: errorValue === newPassoword ? RED_COLOR : DARK_GREY_COLOR, }]} value={newPassoword} onChangeText={setNewPassword} placeholder='Введите новый пароль' />
      <TouchableOpacity style={styles.button} onPress={updatePassword}>
        <Text style={styles.buttonText}>Обновить</Text>
      </TouchableOpacity>
    </View>
  )
})

const styles = StyleSheet.create({
  block: {
    width: '100%',
    backgroundColor: LIGHT_COLOR,
    padding: 5,
    marginVertical: 5,
    borderRadius: 15,
  },
  title: {
    fontFamily: BOLD_FONT,
    color: DARK_GREY_COLOR,
    fontSize: 24,
  },
  input: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 18,
    borderBottomColor: GREY_COLOR,
    borderBottomWidth: 1,
  },
  button: {
    marginTop: 10,
    width: '100%',
    height: 50,
    backgroundColor: GREEN_COLOR,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonText: {
    color: LIGHT_COLOR,
    fontSize: 18,
    fontFamily: BOLD_FONT
  },
})

export default PasswordSetting