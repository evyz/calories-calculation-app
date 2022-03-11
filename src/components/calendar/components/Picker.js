import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Calendar } from 'react-native-calendario'
import { LIGHT_COLOR } from '../../../styles/colors'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

const Picker = () => {

  // https://github.com/maggialejandro/react-native-calendario - GH documentation

  const [month, setMonth] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const [multyDate, setMultyDate] = useState(false)

  const changeDates = (date) => {
    setStartDate(date)
    setEndDate(date)
  }

  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <View style={styles.nav}>
          {/* <TouchableOpacity onPress={() => setMonth(dayjs(month).add(-1, 'month'))}>
            <Text>Back</Text>
          </TouchableOpacity> */}
          <Text>{dayjs(month).format('MMMM YYYY')}</Text>
          {/* <TouchableOpacity onPress={() => setMonth(dayjs(month).add(1, 'month'))}>
            <Text>Next</Text>
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity onPress={() => setMultyDate(!multyDate)}>
          <Text>{multyDate ? "Выбор одной даты" : "Выбор нескольких дат:"}</Text>
        </TouchableOpacity>
        <Calendar
          onChange={(range) => console.log(range)}
          onPress={(date) => changeDates(date)}
          minDate={null}
          startDate={startDate}
          endDate={endDate}
          numberOfMonths={1}
          firstDayMonday={true}
          dayNames={['П', 'В', 'С', 'Ч', 'П', "С", 'В']}
          startingMonth={month}
          theme={{
            activeDayColor: {},
            monthTitleTextStyle: {
              color: '#6d95da',
              fontWeight: '300',
              fontSize: 0,
            },
            emptyMonthContainerStyle: {},
            emptyMonthTextStyle: {
              fontWeight: '200',
            },
            weekColumnsContainerStyle: {},
            weekColumnStyle: {
              paddingVertical: 10,
            },
            weekColumnTextStyle: {
              color: 'black',
              fontSize: 13,
            },
            nonTouchableDayContainerStyle: {},
            nonTouchableDayTextStyle: {},
            startDateContainerStyle: {},
            endDateContainerStyle: {},
            dayContainerStyle: {},
            dayTextStyle: {
              color: '#2d4150',
              fontWeight: '200',
              fontSize: 15,
            },
            dayOutOfRangeContainerStyle: {},
            dayOutOfRangeTextStyle: {},
            todayContainerStyle: {},
            todayTextStyle: {
              color: '#6d95da',
            },
            activeDayContainerStyle: {
              backgroundColor: '#6d95da',
            },
            activeDayTextStyle: {
              color: 'white',
            },
            nonTouchableLastMonthDayTextStyle: {},
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  content: {
    width: '90%',

    backgroundColor: LIGHT_COLOR
  },
  nav: {
    width: '100%',
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
})

export default Picker