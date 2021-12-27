import React, { useContext } from 'react'
import { View, Text, StyleSheet, Button } from "react-native"
import { AppContext } from '../../store'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { profileRouter } from './profileRouter'

import 'react-native-gesture-handler';

const Profile = ({ navigation }) => {

    const { user } = useContext(AppContext)

    const Drawer = createDrawerNavigator()

    const logOutHandler = () => {
        user.setIsAuth(false)
    }

    return (
        <Drawer.Navigator screenOptions={{
            drawerPosition: 'right',
            drawerStyle: {
                width: 240,
            },
            headerStyle: {
                height: 0,
                opacity: 0,
            },
            headerTitleStyle: {
                fontSize: 0,
                color: 'red'
            },
        }}>
            {profileRouter.map(i =>
                <Drawer.Screen name={i.name} component={i.component} />
            )}
        </Drawer.Navigator>
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