import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { SvgXml } from "react-native-svg";
import {
  DARK_GREY_COLOR,
  GREEN_COLOR,
  LIGHT_COLOR,
} from "../../../../styles/colors";
import { BLACK_FONT, BOLD_FONT, LIGTH_FONT } from "../../../../styles/fonts";
import { iconsContent } from "../../../../utils/header/food/foodIconsContent";
import DateTimePicker from "@react-native-community/datetimepicker";
import { calculateCaloriesToApi } from "../../../../http/product";

const BottomSheetProduct = ({ product, isOpened, setIsOpened }) => {
  const height = Dimensions.get("window").height;

  const [isOpenedCal, setIsOpenedCal] = useState(false);
  const [activeDate, setActiveDate] = useState(null);
  const [grams, setGrams] = useState(100);
  const [dateTime, setDateTime] = useState(new Date());
  const [isOpenedTimer, setIsOpenedTimer] = useState(false);

  const calculateMethod = () => {
    // if()
    try {
      parseFloat(grams);
    } catch (e) {
      console.log(e);
    }
    if (typeof parseFloat(grams) === "number" || activeDate !== null) {
      let finalDate =
        dayjs(activeDate).format("YYYY-MM-DD") +
        "T" +
        dayjs(dateTime).format("HH:mm:ss");
      calculateCaloriesToApi(product.id, grams, finalDate).then((data) => {
        setActiveDate(null);
        setGrams(100);
        setDateTime(new Date());
        setIsOpened(false);
        Keyboard.dismiss();
        alert(
          `Продукт расчитан на ${dayjs(data.date).format(
            "DD MMMM YYYY в HH:mm"
          )}`
        );
      });
    } else {
      alert("Введите число");
    }
    return;
  };

  const onChangeTimer = (event, selectedDate) => {
    const currentDate = selectedDate || dateTime;
    setIsOpenedTimer(false);
    setDateTime(currentDate);
  };

  return (
    <View
      style={[
        styles.main,
        {
          height: height,
          backgroundColor: isOpened ? "rgba(0,0,0,0.5)" : null,
          zIndex: isOpened ? 100 : -1,
        },
      ]}
    >
      <View
        style={[
          styles.sheet,
          {
            height: height / 1.7 + 55,
            transform: [{ translateY: isOpened ? 0 : height / 1.7 }],
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => setIsOpened(false)}
          style={[styles.buttonSheet]}
        ></TouchableOpacity>

        {isOpenedCal && (
          <View
            style={[
              styles.openedBlock,
              {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <CalendarPicker
              headerWrapperStyle={{
                width: "70%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
              startFromMonday={true}
              selectedDayColor={"#3D4DAD"}
              selectedDayTextColor={LIGHT_COLOR}
              onDateChange={(date) => {
                setIsOpenedCal(false);
                setActiveDate(date);
              }}
              allowRangeSelection={false}
              //   minDate={(date) => setStartDate(date)}
              //   maxDate={(date) => setEndDate(date)}
              textStyle={{
                fontFamily: LIGTH_FONT,
                fontSize: 14,
                color: DARK_GREY_COLOR,
              }}
              todayBackgroundColor={LIGHT_COLOR}
              todayTextStyle={DARK_GREY_COLOR}
              months={[
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь",
              ]}
              weekdays={["ПН", "ВТ", "CР", "ЧТ", "ПТ", "СБ", "ВС"]}
              customDayHeaderStyles={() => {
                return {
                  style: { justifyContent: "space-between" },
                  textStyle: { fontFamily: BLACK_FONT, fontSize: 12 },
                };
              }}
              nextTitle={">"}
              previousTitle={"<"}
            />
          </View>
        )}

        <View style={[styles.contentSheet]}>
          <Text style={[styles.titleSheet, { marginTop: 10 }]}>
            Укажите дату и время
          </Text>
          <View style={[styles.sheetRow, { marginTop: 20 }]}>
            <TouchableOpacity
              onPress={() => setIsOpenedCal(true)}
              style={[styles.sheetButtonContent, { width: 200 }]}
            >
              <Text style={{ marginRight: 10 }}>
                {activeDate
                  ? dayjs(activeDate).format("DD.MM.YYYY")
                  : "DD.MM.YYYY"}
              </Text>
              <SvgXml
                xml={`<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
<path d="M23.75 5H21.25V3.75C21.25 3.41848 21.1183 3.10054 20.8839 2.86612C20.6495 2.6317 20.3315 2.5 20 2.5C19.6685 2.5 19.3505 2.6317 19.1161 2.86612C18.8817 3.10054 18.75 3.41848 18.75 3.75V5H11.25V3.75C11.25 3.41848 11.1183 3.10054 10.8839 2.86612C10.6495 2.6317 10.3315 2.5 10 2.5C9.66848 2.5 9.35054 2.6317 9.11612 2.86612C8.8817 3.10054 8.75 3.41848 8.75 3.75V5H6.25C5.25544 5 4.30161 5.39509 3.59835 6.09835C2.89509 6.80161 2.5 7.75544 2.5 8.75V23.75C2.5 24.7446 2.89509 25.6984 3.59835 26.4017C4.30161 27.1049 5.25544 27.5 6.25 27.5H23.75C24.7446 27.5 25.6984 27.1049 26.4017 26.4017C27.1049 25.6984 27.5 24.7446 27.5 23.75V8.75C27.5 7.75544 27.1049 6.80161 26.4017 6.09835C25.6984 5.39509 24.7446 5 23.75 5V5ZM25 23.75C25 24.0815 24.8683 24.3995 24.6339 24.6339C24.3995 24.8683 24.0815 25 23.75 25H6.25C5.91848 25 5.60054 24.8683 5.36612 24.6339C5.1317 24.3995 5 24.0815 5 23.75V15H25V23.75ZM25 12.5H5V8.75C5 8.41848 5.1317 8.10054 5.36612 7.86612C5.60054 7.6317 5.91848 7.5 6.25 7.5H8.75V8.75C8.75 9.08152 8.8817 9.39946 9.11612 9.63388C9.35054 9.8683 9.66848 10 10 10C10.3315 10 10.6495 9.8683 10.8839 9.63388C11.1183 9.39946 11.25 9.08152 11.25 8.75V7.5H18.75V8.75C18.75 9.08152 18.8817 9.39946 19.1161 9.63388C19.3505 9.8683 19.6685 10 20 10C20.3315 10 20.6495 9.8683 20.8839 9.63388C21.1183 9.39946 21.25 9.08152 21.25 8.75V7.5H23.75C24.0815 7.5 24.3995 7.6317 24.6339 7.86612C24.8683 8.10054 25 8.41848 25 8.75V12.5Z" fill="#C4C4C4"/>
</svg>`}
              />
            </TouchableOpacity>

            {isOpenedTimer && (
              <DateTimePicker
                value={dateTime}
                onChange={onChangeTimer}
                is24Hour={true}
                mode='time'
                display='default'
              />
            )}
            <TouchableOpacity
              onPress={() => setIsOpenedTimer(true)}
              style={[styles.sheetButtonContent]}
            >
              <Text>{dayjs(dateTime).format("HH:mm")}</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.titleSheet, { marginTop: 30 }]}>
            Укажите граммы
          </Text>
          <View style={[styles.sheetRow, { marginTop: 20 }]}>
            <View
              style={[
                styles.sheetButtonContent,
                { width: 150, justifyContent: "flex-start" },
              ]}
            >
              <TextInput
                style={{ width: "100%", height: "100%" }}
                value={grams}
                onChangeText={setGrams}
                keyboardType='numeric'
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: "90%",
            padding: 15,
            backgroundColor: GREEN_COLOR,
            borderRadius: 15,
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => calculateMethod()}
        >
          <Text
            style={{
              color: LIGHT_COLOR,
              fontFamily: BOLD_FONT,
              fontSize: 24,
            }}
          >
            Расчитать
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 1000,
  },
  sheet: {
    width: "100%",
    backgroundColor: LIGHT_COLOR,
    position: "absolute",
    bottom: 0,
    left: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    display: "flex",
    alignItems: "center",
  },
  buttonSheet: {
    width: "80%",
    height: 6,
    backgroundColor: DARK_GREY_COLOR,
    borderRadius: 15,
    marginTop: 25,
  },
  titleSheet: {
    fontFamily: BOLD_FONT,
    fontSize: 18,
  },
  contentSheet: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 20,
  },
  sheetRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sheetButtonContent: {
    padding: 15,
    backgroundColor: LIGHT_COLOR,
    borderWidth: 1,
    borderColor: GREEN_COLOR,
    borderRadius: 15,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  openedBlock: {
    width: "100%",
    height: "100%",
  },
});

export default BottomSheetProduct;
