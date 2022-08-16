import React from "react";
import { View, StyleSheet } from "react-native";
import { Svg, Path } from "react-native-svg";
import { LIGHT_GREEN_COLOR } from "../../styles/colors";

const CalendarIcon = ({ focused }) => {
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
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M31.3293 0.670673C31.1171 0.457782 30.8648 0.288936 30.5871 0.17384C30.3094 0.0587436 30.0116 -0.000334206 29.711 1.42205e-06C29.3871 1.42205e-06 29.0764 0.128685 28.8474 0.357742C28.6183 0.586799 28.4896 0.897467 28.4896 1.2214V3.52504C28.4896 3.61522 28.4719 3.70451 28.4373 3.78782C28.4028 3.87114 28.3522 3.94684 28.2885 4.0106C28.2247 4.07437 28.149 4.12495 28.0657 4.15946C27.9824 4.19397 27.8931 4.21173 27.8029 4.21173H25.5634C25.4732 4.21173 25.3839 4.19397 25.3006 4.15946C25.2173 4.12495 25.1416 4.07437 25.0778 4.0106C25.014 3.94684 24.9635 3.87114 24.929 3.78782C24.8944 3.70451 24.8767 3.61522 24.8767 3.52504V1.2214C24.8767 0.897467 24.748 0.586799 24.5189 0.357742C24.2899 0.128685 23.9792 1.42205e-06 23.6553 1.42205e-06H22.5923C22.2683 1.42205e-06 21.9577 0.128685 21.7286 0.357742C21.4996 0.586799 21.3709 0.897467 21.3709 1.2214V3.52504C21.3709 3.61522 21.3531 3.70451 21.3186 3.78782C21.2841 3.87114 21.2335 3.94684 21.1697 4.0106C21.106 4.07437 21.0303 4.12495 20.947 4.15946C20.8636 4.19397 20.7744 4.21173 20.6842 4.21173H18.4428C18.3526 4.21173 18.2633 4.19397 18.18 4.15946C18.0967 4.12495 18.021 4.07437 17.9572 4.0106C17.8935 3.94684 17.8429 3.87114 17.8084 3.78782C17.7739 3.70451 17.7561 3.61522 17.7561 3.52504V1.2214C17.7561 0.897467 17.6274 0.586799 17.3984 0.357742C17.1693 0.128685 16.8586 1.42205e-06 16.5347 1.42205e-06H15.4699C15.3095 -5.87369e-05 15.1506 0.0314925 15.0024 0.0928524C14.8542 0.154212 14.7195 0.244178 14.6061 0.357608C14.4926 0.471037 14.4027 0.605707 14.3413 0.753922C14.28 0.902136 14.2484 1.06099 14.2485 1.2214V3.52504C14.2485 3.61522 14.2307 3.70451 14.1962 3.78782C14.1617 3.87114 14.1111 3.94684 14.0473 4.0106C13.9836 4.07437 13.9079 4.12495 13.8246 4.15946C13.7412 4.19397 13.652 4.21173 13.5618 4.21173H11.3222C11.2321 4.21173 11.1428 4.19397 11.0594 4.15946C10.9761 4.12495 10.9004 4.07437 10.8367 4.0106C10.7729 3.94684 10.7223 3.87114 10.6878 3.78782C10.6533 3.70451 10.6355 3.61522 10.6355 3.52504V1.2214C10.6356 1.06099 10.604 0.902136 10.5427 0.753922C10.4813 0.605707 10.3914 0.471037 10.2779 0.357608C10.1645 0.244178 10.0298 0.154212 9.88162 0.0928524C9.7334 0.0314925 9.57455 -5.87369e-05 9.41413 1.42205e-06H8.34472C8.02078 1.42205e-06 7.71012 0.128685 7.48106 0.357742C7.252 0.586799 7.12332 0.897467 7.12332 1.2214V3.52504C7.12332 3.61522 7.10556 3.70451 7.07105 3.78782C7.03654 3.87114 6.98596 3.94684 6.92219 4.0106C6.85842 4.07437 6.78272 4.12495 6.69941 4.15946C6.6161 4.19397 6.5268 4.21173 6.43662 4.21173H4.19708C4.1069 4.21173 4.01761 4.19397 3.93429 4.15946C3.85098 4.12495 3.77528 4.07437 3.71151 4.0106C3.64775 3.94684 3.59717 3.87114 3.56266 3.78782C3.52815 3.70451 3.51039 3.61522 3.51039 3.52504V1.2214C3.51039 1.06101 3.47879 0.90218 3.41741 0.753993C3.35603 0.605806 3.26606 0.471159 3.15265 0.357742C3.03923 0.244324 2.90458 0.154357 2.75639 0.0929753C2.60821 0.0315941 2.44938 1.42205e-06 2.28898 1.42205e-06C1.68191 1.42205e-06 1.0997 0.241161 0.670428 0.670429C0.24116 1.0997 0 1.68191 0 2.28899V29.711C0 30.0116 0.0592066 30.3093 0.174239 30.587C0.289271 30.8647 0.457876 31.117 0.670428 31.3296C0.882979 31.5421 1.13532 31.7107 1.41303 31.8258C1.69074 31.9408 1.98839 32 2.28898 32H29.711C30.0116 32 30.3093 31.9408 30.587 31.8258C30.8647 31.7107 31.117 31.5421 31.3296 31.3296C31.5421 31.117 31.7107 30.8647 31.8258 30.587C31.9408 30.3093 32 30.0116 32 29.711V2.28899C32.0003 1.98836 31.9413 1.69062 31.8262 1.4129C31.7111 1.13518 31.5422 0.882935 31.3293 0.670673ZM29.2532 28.5665C29.2532 28.7486 29.1809 28.9233 29.0521 29.0521C28.9233 29.1809 28.7486 29.2532 28.5665 29.2532H25.3619C25.1798 29.2532 25.0052 29.1809 24.8764 29.0521C24.7476 28.9233 24.6752 28.7486 24.6752 28.5665V25.3619C24.6752 25.1798 24.7476 25.0052 24.8764 24.8764C25.0052 24.7476 25.1798 24.6753 25.3619 24.6753H28.5665C28.7486 24.6753 28.9233 24.7476 29.0521 24.8764C29.1809 25.0052 29.2532 25.1798 29.2532 25.3619V28.5665Z"
            fill="#02B075"
          />
        </Svg>
      ) : (
        <Svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M31.3293 0.670673C31.1171 0.457782 30.8648 0.288936 30.5871 0.17384C30.3094 0.0587436 30.0116 -0.000334206 29.711 1.42205e-06C29.3871 1.42205e-06 29.0764 0.128685 28.8474 0.357742C28.6183 0.586799 28.4896 0.897467 28.4896 1.2214V3.52504C28.4896 3.61522 28.4719 3.70451 28.4373 3.78782C28.4028 3.87114 28.3522 3.94684 28.2885 4.0106C28.2247 4.07437 28.149 4.12495 28.0657 4.15946C27.9824 4.19397 27.8931 4.21173 27.8029 4.21173H25.5634C25.4732 4.21173 25.3839 4.19397 25.3006 4.15946C25.2173 4.12495 25.1416 4.07437 25.0778 4.0106C25.014 3.94684 24.9635 3.87114 24.929 3.78782C24.8944 3.70451 24.8767 3.61522 24.8767 3.52504V1.2214C24.8767 0.897467 24.748 0.586799 24.5189 0.357742C24.2899 0.128685 23.9792 1.42205e-06 23.6553 1.42205e-06H22.5923C22.2683 1.42205e-06 21.9577 0.128685 21.7286 0.357742C21.4996 0.586799 21.3709 0.897467 21.3709 1.2214V3.52504C21.3709 3.61522 21.3531 3.70451 21.3186 3.78782C21.2841 3.87114 21.2335 3.94684 21.1697 4.0106C21.106 4.07437 21.0303 4.12495 20.947 4.15946C20.8636 4.19397 20.7744 4.21173 20.6842 4.21173H18.4428C18.3526 4.21173 18.2633 4.19397 18.18 4.15946C18.0967 4.12495 18.021 4.07437 17.9572 4.0106C17.8935 3.94684 17.8429 3.87114 17.8084 3.78782C17.7739 3.70451 17.7561 3.61522 17.7561 3.52504V1.2214C17.7561 0.897467 17.6274 0.586799 17.3984 0.357742C17.1693 0.128685 16.8586 1.42205e-06 16.5347 1.42205e-06H15.4699C15.3095 -5.87369e-05 15.1506 0.0314925 15.0024 0.0928524C14.8542 0.154212 14.7195 0.244178 14.6061 0.357608C14.4926 0.471037 14.4027 0.605707 14.3413 0.753922C14.28 0.902136 14.2484 1.06099 14.2485 1.2214V3.52504C14.2485 3.61522 14.2307 3.70451 14.1962 3.78782C14.1617 3.87114 14.1111 3.94684 14.0473 4.0106C13.9836 4.07437 13.9079 4.12495 13.8246 4.15946C13.7412 4.19397 13.652 4.21173 13.5618 4.21173H11.3222C11.2321 4.21173 11.1428 4.19397 11.0594 4.15946C10.9761 4.12495 10.9004 4.07437 10.8367 4.0106C10.7729 3.94684 10.7223 3.87114 10.6878 3.78782C10.6533 3.70451 10.6355 3.61522 10.6355 3.52504V1.2214C10.6356 1.06099 10.604 0.902136 10.5427 0.753922C10.4813 0.605707 10.3914 0.471037 10.2779 0.357608C10.1645 0.244178 10.0298 0.154212 9.88162 0.0928524C9.7334 0.0314925 9.57455 -5.87369e-05 9.41413 1.42205e-06H8.34472C8.02078 1.42205e-06 7.71012 0.128685 7.48106 0.357742C7.252 0.586799 7.12332 0.897467 7.12332 1.2214V3.52504C7.12332 3.61522 7.10556 3.70451 7.07105 3.78782C7.03654 3.87114 6.98596 3.94684 6.92219 4.0106C6.85842 4.07437 6.78272 4.12495 6.69941 4.15946C6.6161 4.19397 6.5268 4.21173 6.43662 4.21173H4.19708C4.1069 4.21173 4.01761 4.19397 3.93429 4.15946C3.85098 4.12495 3.77528 4.07437 3.71151 4.0106C3.64775 3.94684 3.59717 3.87114 3.56266 3.78782C3.52815 3.70451 3.51039 3.61522 3.51039 3.52504V1.2214C3.51039 1.06101 3.47879 0.90218 3.41741 0.753993C3.35603 0.605806 3.26606 0.471159 3.15265 0.357742C3.03923 0.244324 2.90458 0.154357 2.75639 0.0929753C2.60821 0.0315941 2.44938 1.42205e-06 2.28898 1.42205e-06C1.68191 1.42205e-06 1.0997 0.241161 0.670428 0.670429C0.24116 1.0997 0 1.68191 0 2.28899V29.711C0 30.0116 0.0592066 30.3093 0.174239 30.587C0.289271 30.8647 0.457876 31.117 0.670428 31.3296C0.882979 31.5421 1.13532 31.7107 1.41303 31.8258C1.69074 31.9408 1.98839 32 2.28898 32H29.711C30.0116 32 30.3093 31.9408 30.587 31.8258C30.8647 31.7107 31.117 31.5421 31.3296 31.3296C31.5421 31.117 31.7107 30.8647 31.8258 30.587C31.9408 30.3093 32 30.0116 32 29.711V2.28899C32.0003 1.98836 31.9413 1.69062 31.8262 1.4129C31.7111 1.13518 31.5422 0.882935 31.3293 0.670673ZM29.2532 28.5665C29.2532 28.7486 29.1809 28.9233 29.0521 29.0521C28.9233 29.1809 28.7486 29.2532 28.5665 29.2532H25.3619C25.1798 29.2532 25.0052 29.1809 24.8764 29.0521C24.7476 28.9233 24.6752 28.7486 24.6752 28.5665V25.3619C24.6752 25.1798 24.7476 25.0052 24.8764 24.8764C25.0052 24.7476 25.1798 24.6753 25.3619 24.6753H28.5665C28.7486 24.6753 28.9233 24.7476 29.0521 24.8764C29.1809 25.0052 29.2532 25.1798 29.2532 25.3619V28.5665Z"
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

export default CalendarIcon;
