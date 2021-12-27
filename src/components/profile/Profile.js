import React, { useContext } from 'react'
import { View, Text, StyleSheet, Button } from "react-native"
import { AppContext } from '../../store'

const Profile = ({ navigation }) => {

    const { user } = useContext(AppContext)

    const logOutHandler = () => {
        user.setIsAuth(false)
    }

    return (
        <View style={styles.container}>
            <Text>ProfileComponent</Text>
            {user.isAuth && <Button onPress={logOutHandler} title='Выйти' />}
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

export default Profile