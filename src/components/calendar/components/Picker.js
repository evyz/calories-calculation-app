import React from 'react'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendario'

const Picker = () => {

  // https://github.com/maggialejandro/react-native-calendario - GH documentation

  return (
    <View>
      <Calendar
        onChange={(range) => console.log(range)}
        minDate={null}
        startDate={new Date()}
        endDate={new Date()}
        numberOfMonths={1}
        firstDayMonday={true}
        dayNames={['Пон', 'Вто', 'Сре', 'Чет', 'Пят', "Суб", 'Вос']}
        theme={{
          activeDayColor: {},
          monthTitleTextStyle: {
            color: '#6d95da',
            fontWeight: '300',
            fontSize: 16,
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
            color: '#b6c1cd',
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
  )
}

export default Picker