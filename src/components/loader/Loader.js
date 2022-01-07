import { View, Text, StyleSheet } from "react-native";

export default LoaderComponent = () => {
    return (
        <View style={styles.main}>
            <View style={styles.block}>
                <Text style={styles.lz}>LZ</Text>
                <Text style={styles.studio}>STUDIO</Text>
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
    },
    block: {
        width: 266,
        height: 266,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lz: {
        fontSize: 144,
    },
    studio: {
        fontSize: 48,
    }
})