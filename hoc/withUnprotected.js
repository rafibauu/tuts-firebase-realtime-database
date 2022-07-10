/* eslint-disable react/display-name */
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../context/user'
import { DASHBOARD_ROUTE } from '../routes'

const withUnprotected = (Pages) => {
  return (props) => {
    const router = useRouter()
    const user = useUser()
    const { isReady, uid } = user

    useEffect(() => {
      if (isReady) {
        if (uid) {
          router.replace(DASHBOARD_ROUTE)
        }
      }
    }, [router, isReady, uid])

    if (!isReady) {
      return <p>Loading</p>
    }

    return <Pages {...props} />
  }
}

export default withUnprotected
