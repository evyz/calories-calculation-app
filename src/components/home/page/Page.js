import React, { useEffect, useState, useMemo } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, useWindowDimensions } from 'react-native'
import { getIco, getOneNews } from '../../../http/news'
import { GREEN_COLOR, LIGHT_COLOR } from '../../../styles/colors'
import { BOLD_FONT, LIGTH_FONT } from '../../../styles/fonts'
import RenderHTML from 'react-native-render-html'
import { SvgCss, SvgCssUri, SvgUri, SvgXml } from 'react-native-svg'
import { url } from '../../../http'
import ApiLoader from '../../loader/ApiLoader'

const Page = ({ news, setNews }) => {

  const [data, setData] = useState({})
  const [ico, setIco] = useState('')
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true)
  // console.log(news?.ico)

  useEffect(() => {
    getOneNews({ id: news?.id }).then(data => {
      setData(data)
    }).finally(() => setIsLoading(false))
  }, [news?.id])

  const logo = useMemo(() => {
    const link = url + news?.ico
    if (isLoading) {
      return
    } else {
      return (<View style={styles.ico}>
        <SvgCssUri uri={link} width="100%" height="100%" />
      </View>)
    }
  }, [isLoading, news])

  return (
    <View style={styles.main}>
      {isLoading && <ApiLoader />}
      <View style={[styles.header, { backgroundColor: news?.background }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.back} onPress={() => setNews({})}>
            <Text>Назад</Text>
          </TouchableOpacity>
          <View>
            <Text style={[{ fontFamily: LIGTH_FONT, fontSize: 14, }]}>{news?.createdAt}</Text>
            <Text style={[{ fontFamily: BOLD_FONT, fontSize: 28 }]}>{news?.name}</Text>
          </View>
          {news?.ico && logo}

        </View>
      </View>

      <View style={styles.content}>
        <ScrollView>
          {data?.News_Contents?.map(block =>
            block?.type === 'html' &&
            <View key={block?.id}>
              <RenderHTML contentWidth={width} source={{ html: block?.content }} />
            </View>
          )}
          {data?.News_Links?.map(link =>
            <TouchableOpacity key={link?.id} onPress={() => alert(link?.link)}>
              <Text>{link?.type}</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',

    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,

    backgroundColor: LIGHT_COLOR
  },
  header: {
    width: '100%',
    height: '25%',

    padding: 20,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  headerLeft: {
    width: '100%',
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },

  content: {
    width: '100%',
    height: '75%',

    padding: 20,
  },
  ico: {
    width: 100,
    height: 100,

    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: -1,

    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
})

export default Page