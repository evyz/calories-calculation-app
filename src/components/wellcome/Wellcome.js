import { View, Text, AsyncStorage, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect } from "react/cjs/react.development";


export default WellcomeComponent = ({ isFinish, setIsFinish }) => {

    useEffect(() => {
        console.log(isFinish)
    }, [isFinish])

    return (
        <View style={styles.main}>
            <View style={styles.block}>
                <TouchableOpacity onPress={() => setIsFinish(false)}>
                    <Text>Открыть</Text>
                </TouchableOpacity>
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

        backgroundColor: '#E5E5E5'
    },
    block: {
        width: 300,
        height: 600,

        backgroundColor: 'white'
    }
})