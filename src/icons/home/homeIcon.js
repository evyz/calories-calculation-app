import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Svg, Path } from 'react-native-svg'
import { LIGHT_GREEN_COLOR } from '../../styles/colors'

const HomeIcon = ({ focused }) => {

  return (
    <View style={[styles.block, { backgroundColor: focused ? LIGHT_GREEN_COLOR : null }]}>
      <Svg width="32" height="35" viewBox="0 0 32 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M29.9515 18.3663H27.9773V33.2554C27.9772 33.718 27.7969 34.1617 27.476 34.4889C27.1551 34.816 26.7199 34.9999 26.2662 35H22.1193C21.6628 35 21.2251 34.8151 20.9023 34.486C20.5795 34.157 20.3982 33.7106 20.3982 33.2452V25.2466C20.3981 24.7839 20.2178 24.3402 19.8969 24.0131C19.576 23.6859 19.1408 23.5021 18.687 23.502H13.3131C12.8593 23.5021 12.4241 23.6859 12.1032 24.0131C11.7823 24.3402 11.602 24.7839 11.6019 25.2466V33.2452C11.6019 33.7106 11.4206 34.157 11.0978 34.486C10.775 34.8151 10.3372 35 9.88078 35H5.73212C5.27864 34.9994 4.84393 34.8153 4.52344 34.4882C4.20295 34.1611 4.02288 33.7177 4.02276 33.2554V18.3663H2.04854C0.227093 18.3663 -0.684536 16.1217 0.602231 14.8089L14.5117 0.628925C14.7071 0.429543 14.9391 0.271374 15.1945 0.163459C15.4499 0.0555448 15.7236 0 16 0C16.2765 0 16.5502 0.0555448 16.8056 0.163459C17.061 0.271374 17.293 0.429543 17.4884 0.628925L31.397 14.8089C32.6846 16.1217 31.7739 18.3663 29.9515 18.3663Z" fill="#02B075" />
      </Svg>
    </View>

  )
}

const styles = StyleSheet.create({
  block: {
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  }
});

export default HomeIcon;