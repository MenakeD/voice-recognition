import Head from 'next/head'

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className='min-h-screen bg-slate-800'>{children}</main>
    </>
  )
}

export default Layout
