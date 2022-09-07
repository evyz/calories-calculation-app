import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Svg, Path, SvgXml } from "react-native-svg";
import { LIGHT_GREEN_COLOR } from "../../styles/colors";
import { getIcons } from "../../utils/header/food/foodIcons";

const FoodIcon = ({ focused, name }) => {
  name = name || "cheeze";
  const { ligth, active } = getIcons(name);

  return (
    <View
      style={[
        styles.block,
        // { backgroundColor: focused ? LIGHT_GREEN_COLOR : null },
      ]}
    >
      {/* <Text>1</Text> */}
      {focused ? <SvgXml xml={active} /> : <SvgXml xml={ligth} />}
    </View>
  );

  // return (
  //   <View
  //     style={[
  //       styles.block,
  //       // { backgroundColor: focused ? LIGHT_GREEN_COLOR : null },
  //     ]}
  //   >
  //     {focused ? (
  //       <Svg
  //         width='28'
  //         height='25'
  //         viewBox='0 0 34 25'
  //         fill='none'
  //         xmlns='http://www.w3.org/2000/svg'
  //       >
  //         <Path
  //           d='M0.988649 19.6543H33.013V21.8076C33.013 22.1084 32.9537 22.4063 32.8386 22.6842C32.7235 22.9621 32.5547 23.2147 32.342 23.4274C32.1293 23.6401 31.8768 23.8088 31.5989 23.9239C31.3209 24.039 31.0231 24.0983 30.7222 24.0983H3.27754C2.67 24.0983 2.08735 23.857 1.65775 23.4274C1.22816 22.9978 0.986816 22.4151 0.986816 21.8076V19.6543H0.988649Z'
  //           fill='#02B075'
  //         />
  //         <Path
  //           d='M17.0009 4.35229C18.8449 4.35229 20.6709 4.71551 22.3746 5.42119C24.0782 6.12687 25.6262 7.16121 26.9302 8.46514C28.2341 9.76908 29.2684 11.3171 29.9741 13.0207C30.6798 14.7244 31.043 16.5504 31.043 18.3944V18.738H2.95874V18.3944C2.95874 14.6702 4.43817 11.0986 7.07159 8.46514C9.705 5.83173 13.2767 4.35229 17.0009 4.35229Z'
  //           fill='#02B075'
  //         />
  //         <Path
  //           d='M17.0467 3.43609C17.9955 3.43609 18.7647 2.66689 18.7647 1.71804C18.7647 0.769194 17.9955 0 17.0467 0C16.0978 0 15.3286 0.769194 15.3286 1.71804C15.3286 2.66689 16.0978 3.43609 17.0467 3.43609Z'
  //           fill='#02B075'
  //         />
  //       </Svg>
  //     ) : (
  //       <Svg
  //         width='28'
  //         height='25'
  //         viewBox='0 0 34 25'
  //         fill='none'
  //         xmlns='http://www.w3.org/2000/svg'
  //       >
  //         <Path
  //           d='M0.988649 19.6543H33.013V21.8076C33.013 22.1084 32.9537 22.4063 32.8386 22.6842C32.7235 22.9621 32.5547 23.2147 32.342 23.4274C32.1293 23.6401 31.8768 23.8088 31.5989 23.9239C31.3209 24.039 31.0231 24.0983 30.7222 24.0983H3.27754C2.67 24.0983 2.08735 23.857 1.65775 23.4274C1.22816 22.9978 0.986816 22.4151 0.986816 21.8076V19.6543H0.988649Z'
  //           fill='#C4C4C4'
  //         />
  //         <Path
  //           d='M17.0009 4.35229C18.8449 4.35229 20.6709 4.71551 22.3746 5.42119C24.0782 6.12687 25.6262 7.16121 26.9302 8.46514C28.2341 9.76908 29.2684 11.3171 29.9741 13.0207C30.6798 14.7244 31.043 16.5504 31.043 18.3944V18.738H2.95874V18.3944C2.95874 14.6702 4.43817 11.0986 7.07159 8.46514C9.705 5.83173 13.2767 4.35229 17.0009 4.35229Z'
  //           fill='#C4C4C4'
  //         />
  //         <Path
  //           d='M17.0467 3.43609C17.9955 3.43609 18.7647 2.66689 18.7647 1.71804C18.7647 0.769194 17.9955 0 17.0467 0C16.0978 0 15.3286 0.769194 15.3286 1.71804C15.3286 2.66689 16.0978 3.43609 17.0467 3.43609Z'
  //           fill='#C4C4C4'
  //         />
  //       </Svg>
  //     )}
  //   </View>
  // );
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

export default FoodIcon;
