import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native'
import { BLACK_FONT, MEDIUM_FONT } from '../../../styles/fonts';

const months = ["Январь", "Февраль", "Март", "Апрель",
  "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь",
  "Ноябрь", "Декабрь"];
const weekDays = [
  "П", "В", "С", "Ч", "П", "С", "В"
];
const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const Calendar = () => {

  const [activeDate, setActiveDate] = useState(new Date())
  const [year, setYear] = useState(null)
  const [month, setMonth] = useState(null)
  const [firstDay, setFirstDay] = useState(null)
  const [matrix, setMatrix] = useState(null)
  const [maxDays, setMaxDays] = useState(null)

  function generateMatrix() {
    let matrix = [];
    matrix[0] = weekDays;

    var counter = 1;
    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }

    return matrix
  }

  useEffect(() => {
    // let maxDays = nDays[month];
    // if (month == 1) { // February
    //   if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    //     maxDays += 1;
    //   }
    // }

    // let year = activeDate.getFullYear();
    // let month = activeDate.getMonth();
    // let firstDay = new Date(year, month, 1).getDay();
    // let matrix = generateMatrix();

    console.log(activeDate)

    setYear(activeDate.getFullYear())
    setMonth(activeDate.getMonth())
    setFirstDay(new Date(year, month, 1).getDay())
    setMatrix(generateMatrix())

    setMaxDays(nDays[month])
    if (month == 1) {
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        setMaxDays(maxDays += 1)
      }
    }

  }, [activeDate])

  const rows = useMemo(() => {
    // let rows = [];
    return matrix && matrix.length > 0 && matrix.map((row, rowIndex) => {
      let rowItems = row.map((item, colIndex) => {
        return (
          <Text
            style={{
              display: 'flex',
              height: 18,
              width: 50,
              textAlign: 'center',

              color: '#000',

              fontFamily: rowIndex == 0 ? BLACK_FONT : MEDIUM_FONT

            }}

          >
            {item != -1 ? item : ''}
          </Text >
        );
      });
      return (
        <View
          style={{
            width: 350,
            // height: 350,
            display: 'flex',
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          {rowItems}
        </View>
      );
    });
  }, [matrix])

  return (
    <View style={{
      width: 350,
      height: 370,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <View style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}>


        <Text>{months[month]}, {year}</Text>
      </View>

      <TouchableOpacity onPress={() => {
        let nextDate = new Date(activeDate.getTime());
        nextDate.setDate(nextDate.getMonth() + 1);
        setActiveDate(nextDate);

      }}>
        <Text>!!!</Text>
      </TouchableOpacity>

      {/* {rows} */}


      <View
        style={{
          width: 350,
          // height: 350,
          display: 'flex',
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {/* {matrix && matrix.length > 0 && matrix.map((row, rowIndex) =>
          row.map((item, colIndex) =>
            // <Text
            //   style={{
            //     display: 'flex',
            //     height: 18,
            //     width: 50,
            //     textAlign: 'center',

            //     color: '#000',

            //     fontFamily: rowIndex == 0 ? BLACK_FONT : MEDIUM_FONT

            //   }}

            // >
            //   {item != -1 ? item : ''}
            // </Text >
        } */}
      </View>

    </View>
  )
}

export default Calendar