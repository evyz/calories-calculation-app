import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { DARK_GREY_COLOR, LIGHT_COLOR } from "../../styles/colors";

const ApiLoader = ({ focused }) => {
  return (
    <View style={[styles.main]}>
      <View style={styles.loaderBlock}>
        <ActivityIndicator size={"large"} color={DARK_GREY_COLOR} />
      </View>
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

    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 100,
    position: 'absolute',
  },
  loaderBlock: {
    width: 200,
    height: 200,

    backgroundColor: LIGHT_COLOR,
    borderRadius: 25,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default ApiLoader;