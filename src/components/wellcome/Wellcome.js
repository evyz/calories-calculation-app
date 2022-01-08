import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import { GREEN_COLOR, GREY_GREEN_COLOR, LIGHT_COLOR } from "../../styles/colors";

import first from '../../../assets/title/vegetables.jpg';
import second from '../../../assets/title/menu.png';
import third from '../../../assets/title/happy.png';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default WellcomeComponent = ({ isFinish, setIsFinish }) => {

    useEffect(() => {
        console.log(isFinish)
    }, [isFinish])

    const arr = [
        {
            id: 1, title: "Добро пожаловать!", image: first, text: [
                ` Приветствуем вас в нашем приложении по расчёту калорий.
Приложение позволяет вам добавлять продукты и редактировать их по граммам в определённый день.
После, вы сможете собирать статистику по съеденным продуктам за определённый день в граммах или калориях.`,
                `Благодаря удобному интерфейсу, расчитывать калории для вас будет одним удовольствием!`
            ]
        },
        {
            id: 2, title: "Пройдёмся по меню!", image: second, text: [
                `В приложении есть навигатор, с помощью которого
Вы сможете перемещаться по нужным страницам`,
                `Иконка домика отвечает за домашнюю страницу, 
где Вы сможете увидеть первоначальную статистику
За определённый день в виде диаграммы.`,
                `Иконка блюда отвечает за поиск нужной еды для 
записи в расчёт. Там вы найдёте необходимые 
продукты, блюда и напитки, которые Вы планируете
расчитать.`,
                `Иконка Календаря отвечает за выбор даты и подбор
статистики на определённые числа даты по калориям.`,
                `Иконка персонажа отвечает за профиль, где вы
можете изменить персональные данные и аватар`,
            ]
        },
        {
            id: 3, title: "Пора приступить к работе!", image: third, text: [
                `В приложении есть навигатор, с помощью которого Вы сможете перемещаться по нужным страницам.`
            ]
        },
    ]

    const [page, setPage] = useState({ current: 1, end: 3 })

    const click = async (int) => {
        if (int === 1) {
            if (page.current === 3) {
                await AsyncStorage.setItem('isWellcome', "false")
                setIsFinish(false)
            } else {
                setPage({ current: page.current + 1, end: 3 })
            }
        } else {
            if (page.current === 1) {
                return
            } else {
                setPage({ current: page.current - 1, end: 3 })
            }
        }
    }

    return (
        <View style={styles.main}>
            <View style={styles.block}>
                <View style={styles.image}>
                    <Image width={'100%'} height={200} style={{ width: '100%', height: 200 }} source={arr.find(y => page.current === y.id).image} />
                </View>

                <View style={styles.content}>

                    <Text style={styles.header}>{arr.find(y => page.current === y.id).title}</Text>
                    {arr
                        .find(y => page.current === y.id).text
                        .map(i =>
                            <Text style={arr.find(y => page.current === y.id).text.length > 4 ? styles.paragrafLow : styles.paragraf}>
                                {i}
                            </Text>
                        )}

                </View>

                <View style={styles.navigations}>
                    <TouchableOpacity onPress={() => click(-1)} style={[page.current === 1 ? styles.offButton : styles.activeButton, styles.button]}>
                        <Text style={styles.textButton}>Назад</Text>
                    </TouchableOpacity>
                    <Text style={styles.textPage}>{page.current}\{page.end}</Text>
                    <TouchableOpacity onPress={() => click(1)} style={[page.current === page.end ? styles.offButton : styles.activeButton, styles.button]}>
                        <Text style={styles.textButton}>{page.current === page.end ? "Готово" : "Далее"}</Text>
                    </TouchableOpacity>
                </View>


            </View>

            <View style={{ width: 0, height: 0 }}>
                {arr.map(i =>
                    <Image width={0} height={0} style={{ width: 0, height: 0 }} source={i.image} />
                )}
            </View>

            <TouchableOpacity onPress={() => setIsFinish(false)}>
                <Text>Открыть</Text>
            </TouchableOpacity>
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

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',

        backgroundColor: 'white',

        borderRadius: 15,
        overflow: 'hidden',
    },

    image: {
        width: '100%',
        height: 200,

        backgroundColor: 'grey',

        overflow: 'hidden',
    },

    content: {
        width: '100%',
        height: 315,

        display: 'flex',
        flexDirection: 'column',
        alignItems: "flex-start",
        justifyContent: "flex-start",

        padding: 10
    },

    header: {
        fontSize: 18,
        fontFamily: 'montserrat-bold',
        fontWeight: "bold",

        marginTop: 50,
        marginBottom: 10,
    },

    paragraf: {
        fontFamily: 'montserrat-ligth',
        fontSize: 12,
        marginTop: 5,
        marginBottom: 5,
    },

    paragrafLow: {
        fontFamily: 'montserrat-ligth',
        fontSize: 10,
        marginTop: 3,
        marginBottom: 3,
    },

    navigations: {
        width: '100%',
        height: 85,

        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',

        padding: 10,
    },

    button: {
        width: 75,
        height: 35,

        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',

        borderRadius: 5,
    },

    offButton: {
        backgroundColor: GREY_GREEN_COLOR,
    },

    activeButton: {
        backgroundColor: GREEN_COLOR,
    },

    textButton: {
        color: LIGHT_COLOR,
        fontSize: 14,
        fontFamily: 'montserrat-bold',
        fontWeight: "bold",
    },

    textPage: {
        fontSize: 18,
        fontFamily: 'montserrat-bold',
        fontWeight: "bold",
    },
})