import AppRouter from './src/AppRouter';
import AppProvider from './src/store';
import { useState } from 'react';

import * as Font from 'expo-font';
// import LoaderComponent from './src/components/loader/Loader';

async function loadAppAplication() {
  await Font.loadAsync({
    'montserrat-black': require('./vendors/Montserrat-Black.ttf'),
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    loadAppAplication().then(data => {
      setIsReady(true)
    })

    // return (
    //   <LoaderComponent />
    // )
  }

  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
