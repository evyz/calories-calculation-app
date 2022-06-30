import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DARK_GREY_COLOR, GREEN_COLOR, GREY_COLOR, LIGHT_COLOR, LIGTH_GREY_COLOR } from '../../../../styles/colors'
import { BOLD_FONT } from '../../../../styles/fonts'
import ApiLoader from '../../../loader/ApiLoader'

const AdminProduct = ({ route, setRoute }) => {

  const [isLoading, setIsLoading] = useState(true)

  const [product, setProduct] = useState({})
  const [products, setProducts] = useState([

  ])

  useEffect(() => {
    setProducts([
      { id: 1, name: "Помидор", grams: 100 },
      { id: 2, name: "Огурец", grams: 100 },
      { id: 3, name: "Лук", grams: 100 },
      { id: 4, name: "Виктор", grams: 100 },
      { id: 5, name: "Тест", grams: 100 },
      { id: 6, name: "Руккола", grams: 100 },
    ])
    setIsLoading(false)
  }, [])

  const confirmProduct = async (product) => {
    let arr = []
    products.map(prod => {
      if (prod.id !== product.id) {
        arr.push(prod)
      }
    })
    setProducts(arr)
    setProduct({})
    return alert('Продукт был подтверждён')
  }

  return (
    <View style={{ width: '100%', height: '100%' }}>
      {isLoading && <ApiLoader />}

      {product && product?.id &&
        <View style={{ width: '100%', height: '100%', top: 0, left: 0, position: 'absolute', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: '90%', height: '80%', backgroundColor: LIGHT_COLOR, borderRadius: 25, padding: 15, }}>
            <Text style={{ fontFamily: BOLD_FONT, fontSize: 18, }}>{product?.name}</Text>
            <Text>граммы: {product?.grams}</Text>

            <TouchableOpacity onPress={() => confirmProduct(product)}>
              <Text>Подтвердить</Text>
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

          <Text style={{ fontFamily: BOLD_FONT }}>Продукты на подтверждение</Text>
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
            {products.map((product, index) =>
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
        </View>

      </ScrollView>
    </View>
  )
}

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