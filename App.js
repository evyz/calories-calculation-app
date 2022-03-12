import AppRouter from './src/AppRouter';
import AppProvider from './src/store';
import { useState } from 'react';

import * as Font from 'expo-font';
import LoaderComponent from './src/components/loader/Loader';
import WellcomeComponent from './src/components/wellcome/Wellcome';

import AsyncStorage from '@react-native-async-storage/async-storage';

async function loadAppAplication() {
  await Font.loadAsync({
    'montserrat-black': require('./vendors/Montserrat-Black.ttf'),
    'montserrat-bold': require('./vendors/Montserrat-Bold.ttf'),
    'montserrat-medium': require('./vendors/Montserrat-Medium.ttf'),
    'montserrat-ligth': require('./vendors/Montserrat-Light.ttf'),
  });
}


export const isWellcome = async () => {
  let check = await AsyncStorage.getItem('isWellcome')
  if (check === null) {
    await AsyncStorage.setItem('isWellcome', "true")
  }
  return check
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [isFirst, setIsFirst] = useState(false)

  isWellcome().then(data => {
    if (data === 'true') {
      setIsFirst(true)
    }
    if (data === 'false') {
      setIsFirst(false)
    }
  })

  if (!isReady) {
    loadAppAplication().then(data => {
      setIsReady(true)
    })

    return (
      <LoaderComponent />
    )
  }

  if (isFirst) {
    return (
      <WellcomeComponent isFinish={isFirst} setIsFinish={setIsFirst} />
    )
  }

  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
