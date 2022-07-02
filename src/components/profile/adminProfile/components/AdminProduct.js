import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { confirmProduct, getNotCofirmedProduct } from '../../../../http/admin'
import { AppContext } from '../../../../store'
import { DARK_GREY_COLOR, GREEN_COLOR, GREY_COLOR, LIGHT_COLOR, LIGTH_GREY_COLOR } from '../../../../styles/colors'
import { BLACK_FONT, BOLD_FONT, LIGTH_FONT, MEDIUM_FONT } from '../../../../styles/fonts'
import ApiLoader from '../../../loader/ApiLoader'

const AdminProduct = observer(({ route, setRoute }) => {

  const { admin } = useContext(AppContext)

  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState({})
  const [products, setProducts] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [maxPages, setMaxPages] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    getNotCofirmedProduct(activePage).then(data => {
      setProducts(data.rows)
      setCount(data.count)
    }).finally(() => setIsLoading(false))
  }, [activePage])

  const confirmProductFunc = async () => {
    setIsLoading(true)

    await confirmProduct(product.id).then(data => {
      setProduct({})
      getNotCofirmedProduct(activePage).then(data => {
        setProducts(data.rows)
        setCount(data.count)
      })
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <View style={{ width: '100%', height: '100%' }}>
      {isLoading && <ApiLoader />}

      {product && product?.id &&
        <View style={{ width: '100%', height: '100%', top: 0, left: 0, position: 'absolute', zIndex: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: '90%', height: '80%', backgroundColor: LIGHT_COLOR, borderRadius: 25, padding: 15, }}>

            <Text style={{ fontFamily: BOLD_FONT, fontSize: 22 }}>{product.name}</Text>
            <Text style={{ fontFamily: LIGTH_FONT, marginVertical: 10, marginTop: 5, }}><Text style={{ fontFamily: MEDIUM_FONT }}>Категория: </Text>{product.Category.name}</Text>

            <View style={{ width: '100%', display: 'flex', flexDirection: 'column', borderRadius: 25, borderWidth: 1, borderColor: LIGTH_GREY_COLOR, overflow: 'hidden' }}>
              <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: LIGTH_GREY_COLOR }}>
                <View style={{ width: '50%', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text>Название</Text>
                </View>
                <View style={{ width: '50%', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text>Значение</Text>
                </View>
              </View>
              <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: LIGHT_COLOR }}>
                <View style={{ width: '50%', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text>Граммы</Text>
                </View>
                <View style={{ width: '50%', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text>{product.grams ? product.grams : "Не указано"}</Text>
                </View>
              </View>
              <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: LIGHT_COLOR }}>
                <View style={{ width: '50%', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text>Калории</Text>
                </View>
                <View style={{ width: '50%', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text>{product.kcal ? product.kcal : "Не указано"}</Text>
                </View>
              </View>
              <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: LIGHT_COLOR }}>
                <View style={{ width: '50%', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text>Жиры</Text>
                </View>
                <View style={{ width: '50%', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text>{product.fats ? product.fats : "Не указано"}</Text>
                </View>
              </View>
              <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: LIGHT_COLOR }}>
                <View style={{ width: '50%', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text>Углеводы</Text>
                </View>
                <View style={{ width: '50%', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text>{product.carbohydrates ? product.carbohydrates : "Не указано"}</Text>
                </View>
              </View>
              <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: LIGHT_COLOR }}>
                <View style={{ width: '50%', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text>Белки</Text>
                </View>
                <View style={{ width: '50%', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text>{product.proteins ? product.proteins : "Не указано"}</Text>
                </View>
              </View>
            </View>


            <TouchableOpacity style={{
              paddingVertical: 10,
              paddingHorizontal: 17,
              backgroundColor: GREEN_COLOR,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
              borderRadius: 15,
            }} onPress={() => confirmProductFunc(product)}>
              <Text style={{ fontFamily: BLACK_FONT, fontSize: 22, color: LIGHT_COLOR }}>ПОДТВЕРДИТЬ</Text>
            </TouchableOpacity>

          </View>
          <TouchableOpacity onPress={() => setProduct({})} style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', top: 0, left: 0, position: 'absolute', zIndex: -1 }}>

          </TouchableOpacity>
        </View>
      }
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setRoute('')}>
            <Text style={{ fontFamily: BOLD_FONT }}>Назад</Text>
          </TouchableOpacity>

          <Text style={{ fontFamily: BOLD_FONT }}>Продукты на подтверждение (Количество: {count})</Text>
        </View>

        <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <View style={{ width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 25, borderWidth: 1, borderColor: LIGTH_GREY_COLOR, overflow: 'hidden' }}>
            <View style={{ width: '100%', height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: LIGTH_GREY_COLOR }}>
              <View style={{ width: '50%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRightColor: DARK_GREY_COLOR, borderRightWidth: 0.5 }}>
                <Text>Название</Text>
              </View>
              <View style={{ width: '50%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text>Граммы</Text>
              </View>
            </View>
            {products && products.length > 0 && products.map((product, index) =>
              <View key={product.id} style={{ width: '100%', height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: index % 2 === 1 ? GREY_COLOR : LIGHT_COLOR }}>
                <View style={{ width: '50%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRightColor: DARK_GREY_COLOR, borderRightWidth: 0.5 }}>
                  <TouchableOpacity onPress={() => setProduct(product)}>
                    <Text>{product.name}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '50%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TouchableOpacity onPress={() => setProduct(product)}>
                    <Text>{product.grams}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          <View style={{ width: '90%', display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'flex-end', height: 40, marginTop: 5, }}>
            {activePage > 1 &&
              <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: GREEN_COLOR, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onPress={() => setActivePage(activePage - 1)}>
                <Text style={{ fontFamily: BLACK_FONT, color: LIGHT_COLOR }}>{"<"}</Text>
              </TouchableOpacity>
            }
            {products.length !== 0 && < TouchableOpacity style={{ width: 40, height: 40, padding: 10, backgroundColor: GREEN_COLOR, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onPress={() => setActivePage(activePage + 1)}>
              <Text style={{ fontFamily: BLACK_FONT, color: LIGHT_COLOR }}>{">"}</Text>
            </TouchableOpacity>}
          </View>
        </View>

      </ScrollView >
    </View >
  )
})

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 30,
    marginBottom: 30,
  },
})

export default AdminProduct