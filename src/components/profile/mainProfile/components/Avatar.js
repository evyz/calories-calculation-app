
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { SvgUri } from 'react-native-svg'
import { url } from '../../../../http'
import { getAvatar, getAvatars, getColors, me, uploadAvatar } from '../../../../http/user'
import { GREEN_COLOR, LIGHT_COLOR } from '../../../../styles/colors'
import ApiLoader from '../../../loader/ApiLoader'

const Avatar = ({ isActive, setIsActive, user, setUser }) => {
  const [avatars, setAvatars] = useState([])
  const [avatarsSecond, setAvatarsSecond] = useState([])
  const [colors, setColors] = useState([])
  const [selectedAvatar, setSelectedAvatar] = useState({ ava: null, id: null, background: null })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getAvatar().then(data => {
      setSelectedAvatar({ ava: data?.Avatars_Ico?.path, background: data?.Avatars_Back?.color })
    }).then(() => {
      getAvatars({ page: 1, count: 20 }).then(data => {
        setAvatars(data)
      }).then(data => {
        getAvatars({ page: 2, count: 20 }).then(data => {
          setAvatarsSecond(data)
        })
      }).then(() => {
        getColors().then(data => {
          setColors(data)
        })
      })
    }).finally(() => setIsLoading(false))

  }, [])
  const upload = () => {
    setIsLoading(true)
    uploadAvatar({ path: selectedAvatar.ava, color: selectedAvatar.background }).then(data => {
      // console.log(data)
    }).finally(() => {
      let obj = user
      obj.avatar.color = selectedAvatar.background
      obj.avatar.ico.path = selectedAvatar.ava
      setUser(obj)
      setIsLoading(false)
      setIsActive(false)
      alert('Аватар изменён')
    })
  }


  if (isActive) {
    return (
      <View style={styles.block}>
        {isLoading && <ApiLoader />}

        <View style={styles.innerBlock}>
          <TouchableOpacity onPress={() => setIsActive(false)}>
            <Text>Закрыть</Text>
          </TouchableOpacity>


          <View style={[styles.selectedAvatar, { backgroundColor: selectedAvatar.background }]}>
            {selectedAvatar.ava &&
              <View style={styles.selectedInnerAvatar}>
                <SvgUri width={200} height={200} uri={url + selectedAvatar.ava} />
              </View>}
          </View>

          <View style={styles.avatars}>
            <ScrollView horizontal={true}>
              {avatars.map(avatar =>
                <TouchableOpacity key={avatar?.id} style={styles.avatar} onPress={() => setSelectedAvatar({ ava: avatar?.path, id: avatar?.id, background: selectedAvatar.background })}>
                  <SvgUri width={60} height={60} uri={url + avatar.path} />
                </TouchableOpacity>
              )}

            </ScrollView>
          </View>

          <View style={styles.avatars}>
            <ScrollView horizontal={true}>
              {avatarsSecond.map(avatar =>
                <TouchableOpacity key={avatar?.id} style={styles.avatar} onPress={() => setSelectedAvatar({ ava: avatar?.path, id: avatar?.id, background: selectedAvatar.background })}>
                  <SvgUri width={60} height={60} uri={url + avatar.path} />
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>

          <View style={styles.avatars}>
            <ScrollView horizontal={true}>
              {colors.map(color =>
                <TouchableOpacity key={color?.id} style={[styles.avatar, { backgroundColor: color.color }]} onPress={() => setSelectedAvatar({ ava: selectedAvatar.ava, id: selectedAvatar.id, background: color.color })}>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>


          <TouchableOpacity onPress={() => upload()}>
            <Text>Обновить</Text>
          </TouchableOpacity>

        </View>
        <TouchableOpacity onPress={() => setIsActive(false)} style={styles.blockBack}></TouchableOpacity>


      </View>
    )
  }
}

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
  }
})

export default Avatar;