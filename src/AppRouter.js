import { View, Text, StyleSheet } from 'react-native'
import { AuthComponents, PublicComponents } from './utils/components'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useContext, useEffect } from 'react';
import { AppContext } from './store';
import { observer } from 'mobx-react-lite';

export default AppRouter = observer(() => {

    const Stack = createNativeStackNavigator()
    const AuthStack = createBottomTabNavigator()

    const { user } = useContext(AppContext)

    useEffect(() => {
        console.log(user.isAuth)
    }, [user])

    return (
        <View style={{ width: '100%', height: '100%', }}>

            <View style={styles.notif}>
                <Text>Посмотрите видео на ютуб</Text>
            </View>

            <NavigationContainer>
                {user.isAuth ?
                    <AuthStack.Navigator>
                        {AuthComponents.map(i =>
                            <AuthStack.Screen options={{
                                // ЗАДАЧА: Настроить иконки для каждой компоненты из меню 
                                //          и пропихнуть их в authComponent, после чего
                                //          перебрать их также, как компоненты массива.
                                // tabBarIcon: ({})
                                headerShown: false,
                                headerTitle: null,
                                tabBarLabel: () => { return null },
                            }}
                                // ЗАДАЧА: Настроить language.json со всеми компонентами
                                //          для русификации.
                                //          Также настроить поиск в массиве нужного  
                                //          компонента с русификацией и передавать 
                                //          объект с выбранным языком из AsyncStorage
                                key={i.name}
                                name={i.name}
                                component={i.component}
                            />
                        )}
                    </AuthStack.Navigator>
                    :
                    <Stack.Navigator>
                        {PublicComponents.map(i =>
                            <Stack.Screen key={i.name} name={i.name} component={i.component} />
                        )}
                    </Stack.Navigator>
                }
            </NavigationContainer>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    notif: {
        width: '80%',
        height: 100,

        backgroundColor: 'red',

        position: 'absolute',
        // bottom: '10%',
        // left: '10%',

        zIndex: 10,
    }
})