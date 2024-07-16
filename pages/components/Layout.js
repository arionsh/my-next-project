import Head from 'next/head'
import { Navbar } from './Navbar'
import Page from '../pages/Page'
export const Layout = () => (
  <>
    <Head>
      <title>Task App</title>
    </Head>
    <Navbar />
    <Page />
  </>
)
