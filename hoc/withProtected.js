/* eslint-disable react/display-name */
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../context/user'
import { LOGIN_ROUTE } from '../routes'

const withProtected = (Pages) => {
  return (props) => {
    const router = useRouter()
    const user = useUser()
    const { isReady, uid } = user

    useEffect(() => {
      if (isReady) {
        if (!uid) {
          router.replace(LOGIN_ROUTE)
        }
      }
    }, [router, isReady, uid])

    const showLoading = !isReady;
    const shouldRedirect = !uid

    if (shouldRedirect || showLoading) return <p>Loading</p>;

    return <Pages {...props} />;
  }
}

export default withProtected
