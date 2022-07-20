import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import useCreateValue from '../hooks/useCreateValue'

const Home = () => {
  const createPost = useCreateValue()
  const createUser = useCreateValue()
  console.log(createUser)

  const createNewPost = async () => {
    const path = '/posts'
    const value = {
      title: 'Post dari push value',
      content: 'Ini adalah content dari push value',
      type: 'push'
    }

    await createPost.pushValue(path, value)
  }

  const createNewUser = async () => {
    const path = '/users'
    const value = {
      timestamp: Date.now(),
      email: 'createnewuser@email.com',
    }

    await createUser.setValue(path, value)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* {isLoading && <h4>Fetching data...</h4>} */}
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <button
          onClick={createNewPost}
          style={{ background: 'red', padding: 8 }}
        >
          Push Value
        </button>
        <button
          onClick={createNewUser}
          style={{ background: 'blue', padding: 8 }}
        >
          Set Value
        </button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
