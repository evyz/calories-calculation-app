import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { BOLD_FONT } from '../../../styles/fonts'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

const Stats = ({ selectedDate }) => {
  return (
    <View style={styles.main}>
      <Text style={{ fontFamily: BOLD_FONT }}>{dayjs(selectedDate).format('YYYY MMMM DD')}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Stats;