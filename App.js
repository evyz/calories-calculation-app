import AppRouter from './src/AppRouter';
import AppProvider from './src/store';
import { useState } from 'react';

import * as Font from 'expo-font';
import LoaderComponent from './src/components/loader/Loader';
import WellcomeComponent from './src/components/wellcome/Wellcome';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react/cjs/react.development';

async function loadAppAplication() {
  await Font.loadAsync({
    'montserrat-black': require('./vendors/Montserrat-Black.ttf'),
    'montserrat-bold': require('./vendors/Montserrat-Bold.ttf'),
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

  if (!isReady) {
    loadAppAplication().then(data => {
      setIsReady(true)
    })

    isWellcome().then(data => {
      if (data === 'true') {
        setIsFirst(true)
      }
      if (data === 'false') {
        setIsFirst(false)
      }
    })

    return (
      <LoaderComponent />
    )
  }

  // if (isFirst) {
  //   return <WellcomeComponent isFinish={isFirst} setIsFinish={setIsFirst} />
  // }

  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
