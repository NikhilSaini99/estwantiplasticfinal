import '@/styles/globals.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux'
import { store, persistor } from "@/state/store"
import { SessionProvider } from 'next-auth/react'
import { PersistGate } from 'redux-persist/integration/react';


export default function App({
  Component,
  pageProps:{session,...pageProps} }) {
  // let persistor = persistStore(store)

  const theme = createTheme({
    typography: {
      fontFamily: [
        'Jacques Francois',
        'ui-sans-serif',
        'ui-sans-serif',
        'BlinkMacSystemFont',
        "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
      ].join(','),
    },
  });


  return (<SessionProvider session={session}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </ThemeProvider>
    </Provider>
  </SessionProvider>

  )

}
