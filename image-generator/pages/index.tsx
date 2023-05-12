import { Layout, Text, Page } from '@vercel/examples-ui'
import { Chat } from '../components/Chat'
import Header from '../components/Header'
import ModelRunner from '../components/ModelRunner'

function Home() {

  return (
    <Page className="flex flex-col gap-12">
      <Header />
      <ModelRunner />
    </Page>
  )
}

Home.Layout = Layout

export default Home
