import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import useCalendarMatrix from 'use-calendar-matrix'

const months = ["January", "February", "March", "April",
  "May", "June", "July", "August", "September", "October",
  "November", "December"];

const weekDays = [
  "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
];

const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const Calendar = () => {

  const [activeDate, setIsActive] = useState(new Date())

  let [matrix] = useCalendarMatrix(2019, 8)

  return (
    <View>

    </View>
  )
}

export default Calendar