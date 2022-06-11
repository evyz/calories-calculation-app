
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { SvgUri } from 'react-native-svg'
import { url } from '../../../../http'
import { getAvatar, getAvatars, getColors, me, uploadAvatar } from '../../../../http/user'
import { AppContext } from '../../../../store'
import { GREEN_COLOR, LIGHT_COLOR } from '../../../../styles/colors'
import { MEDIUM_FONT } from '../../../../styles/fonts'
import ApiLoader from '../../../loader/ApiLoader'

const Avatar = observer(({ isActive, setIsActive }) => {
  const { user } = useContext(AppContext)

  const [avatars, setAvatars] = useState([])
  const [avatarsSecond, setAvatarsSecond] = useState([])
  const [colors, setColors] = useState([])
  const [selectedAvatar, setSelectedAvatar] = useState({ ava: null, id: null, background: null })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    try {
      getAvatar().then(data => {
        console.log(data)
        setSelectedAvatar({ ava: data?.Avatars_Ico?.path, background: data?.Avatars_Back?.color })
      })
      getAvatars({ page: 1, count: 20 }).then(data => {
        setAvatars(data)
      })
      getAvatars({ page: 2, count: 20 }).then(data => {
        setAvatarsSecond(data)
      })
      getColors().then(data => {
        setColors(data)
      }).finally(() => setIsLoading(false))
    } catch (e) {
      console.log(e)
    }
  }, [])

  const upload = () => {
    if (user.profile.avatar.color === selectedAvatar.background && user.profile.avatar.ico.path === selectedAvatar.ava) {
      return setIsActive(false)
    }
    setIsLoading(true)
    uploadAvatar({ path: selectedAvatar.ava, color: selectedAvatar.background }).finally(data => {
      let obj = user.profile
      obj.avatar.color = selectedAvatar.background
      obj.avatar.ico.path = selectedAvatar.ava
      user.setProfile(obj)
      setIsLoading(false)
      setIsActive(false)
    })
  }


  if (isActive) {
    return (
      <View style={styles.block}>
        {isLoading && <ApiLoader />}

        <View style={styles.innerBlock}>
          <View style={[styles.selectedAvatar, { backgroundColor: selectedAvatar.background }]}>
            {selectedAvatar.ava &&
              <View style={styles.selectedInnerAvatar}>
                <SvgUri width={200} height={200} uri={url + selectedAvatar.ava} />
              </View>}
          </View>

          <Text style={{ fontFamily: MEDIUM_FONT, fontSize: 18, marginTop: 10 }}>Выберите аватар</Text>

          <View style={styles.avatars} >
            <ScrollView horizontal={true}>
              {avatars.map(avatar =>
                <TouchableOpacity key={avatar?.id} style={styles.avatar} onPress={() => setSelectedAvatar({ ava: avatar?.path, id: avatar?.id, background: selectedAvatar.background })}>
                  <SvgUri width={60} height={60} uri={url + avatar.path} />
                </TouchableOpacity>
              )}
              {avatarsSecond.map(avatar =>
                <TouchableOpacity key={avatar?.id} style={styles.avatar} onPress={() => setSelectedAvatar({ ava: avatar?.path, id: avatar?.id, background: selectedAvatar.background })}>
                  <SvgUri width={60} height={60} uri={url + avatar.path} />
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>

          <Text style={{ fontFamily: MEDIUM_FONT, fontSize: 18, marginTop: 10, }}>Выберите цвет</Text>
          <View style={styles.avatars}>
            <ScrollView horizontal={true}>
              {colors.map(color =>
                <TouchableOpacity key={color?.id} style={[styles.avatar, { backgroundColor: color.color }]} onPress={() => setSelectedAvatar({ ava: selectedAvatar.ava, id: selectedAvatar.id, background: color.color })}>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>


          <TouchableOpacity style={styles.buttonUpdate} onPress={() => upload()}>
            <Text style={{ color: LIGHT_COLOR, fontSize: 18, fontFamily: MEDIUM_FONT }}>Обновить</Text>
          </TouchableOpacity>

        </View>
        <TouchableOpacity onPress={() => setIsActive(false)} style={styles.blockBack}></TouchableOpacity>


      </View>
    )
  }
})

const styles = StyleSheet.create({
  block: {
    width: '100%',
    height: '100%',

    position: 'absolute',
    top: 0,
    left: 0,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    zIndex: 100,

  },
  innerBlock: {
    width: '85%',
    height: '85%',
    backgroundColor: LIGHT_COLOR,

    padding: 20,
    borderRadius: 25,

    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  blockBack: {
    width: '100%',
    height: '100%',

    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1
  },

  avatars: {
    width: '95%',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    margin: 10,
  },

  avatar: {
    width: 75,
    height: 75,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: GREEN_COLOR,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },

  selectedAvatar: {
    width: 200,
    height: 200,
    borderRadius: 100,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 2,
    borderColor: GREEN_COLOR,
    overflow: 'hidden',
  },

  selectedInnerAvatar: {
    width: '100%',
    height: '100%',

    padding: 10,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonUpdate: {
    width: '100%',
    height: 50,

    backgroundColor: GREEN_COLOR,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 24,
  },
})

export default Avatar;