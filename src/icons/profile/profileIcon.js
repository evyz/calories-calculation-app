import React from "react";
import { View, StyleSheet } from "react-native";
import { Svg, Path } from "react-native-svg";
import { LIGHT_GREEN_COLOR } from "../../styles/colors";

const ProfileIcon = ({ focused }) => {
  return (
    <View
      style={[
        styles.block,
        // { backgroundColor: focused ? LIGHT_GREEN_COLOR : null },
      ]}
    >
      {focused ? (
        <Svg
          width="32"
          height="35"
          viewBox="0 0 32 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M16.0001 18.2153C21.1126 18.2153 25.2571 14.1377 25.2571 9.10764C25.2571 4.07763 21.1126 0 16.0001 0C10.8876 0 6.74316 4.07763 6.74316 9.10764C6.74316 14.1377 10.8876 18.2153 16.0001 18.2153Z"
            fill="#02B075"
          />
          <Path
            d="M32 34.8573H0C0 27.5125 5.11198 21.343 12.0264 19.6049C12.3667 20.3625 12.9234 21.0065 13.6289 21.4586C14.3343 21.9107 15.1581 22.1514 16 22.1514C16.8419 22.1514 17.6657 21.9107 18.3711 21.4586C19.0766 21.0065 19.6333 20.3625 19.9736 19.6049C26.8899 21.343 32 27.5125 32 34.8573Z"
            fill="#02B075"
          />
        </Svg>
      ) : (
        <Svg
          width="32"
          height="35"
          viewBox="0 0 32 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M16.0001 18.2153C21.1126 18.2153 25.2571 14.1377 25.2571 9.10764C25.2571 4.07763 21.1126 0 16.0001 0C10.8876 0 6.74316 4.07763 6.74316 9.10764C6.74316 14.1377 10.8876 18.2153 16.0001 18.2153Z"
            fill="#C4C4C4"
          />
          <Path
            d="M32 34.8573H0C0 27.5125 5.11198 21.343 12.0264 19.6049C12.3667 20.3625 12.9234 21.0065 13.6289 21.4586C14.3343 21.9107 15.1581 22.1514 16 22.1514C16.8419 22.1514 17.6657 21.9107 18.3711 21.4586C19.0766 21.0065 19.6333 20.3625 19.9736 19.6049C26.8899 21.343 32 27.5125 32 34.8573Z"
            fill="#C4C4C4"
          />
        </Svg>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});

export default ProfileIcon;
