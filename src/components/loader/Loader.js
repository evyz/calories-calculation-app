import { View, Text, StyleSheet } from "react-native";
import { GREY_COLOR, LIGHT_COLOR } from "../../styles/colors";

import { Shadow } from 'react-native-shadow-2';

export const shadowOpt = {
    startColor: "#E8E8E8",
    offset: [0, 8],
    radius: 24,
    distance: 24
}

export default LoaderComponent = () => {
    return (
        <View style={styles.main}>
            <Shadow {...shadowOpt} >
                <View style={styles.block}>
                    <Text style={styles.lz}>LZ</Text>
                    <Text style={styles.studio}>STUDIO</Text>
                </View>
            </Shadow>
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

        backgroundColor: GREY_COLOR,
    },
    block: {
        width: 266,
        height: 266,

        backgroundColor: LIGHT_COLOR,
        borderRadius: 15,

        padding: 20,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lz: {
        fontSize: 100,
        fontFamily: 'montserrat-bold',
    },
    studio: {
        fontSize: 34,
        fontFamily: 'montserrat-bold'
    }
})