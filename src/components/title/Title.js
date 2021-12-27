import { View, Text, StyleSheet } from "react-native"

export default TitleComponent = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text>TitleComponent</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
