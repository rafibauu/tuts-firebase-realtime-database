import { useEffect, useRef, useState } from 'react'
import { getDatabase, ref, child, get } from 'firebase/database'
import firebaseApp from '../services/firebase-sdk'

const useGetValue = (path) => {
  const [isLoading, setIsLoading] = useState(true)
  const snapshot = useRef(null)
  const error = useRef(null)
  const isEmpty = useRef(false)

  const getValue = async () => {
    try {
      const database = getDatabase(firebaseApp)
      const rootReference = ref(database)
      const dbGet = await get(child(rootReference, path))
      const dbValue = dbGet.val()
      const dbExist = dbGet.exists()

      if (!dbExist) {
        isEmpty.current = true
      }
      snapshot.current = dbValue
    } catch (getError) {
      error.current = getError.message
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getValue()
  }, [])

  return {
    isLoading,
    isEmpty: isEmpty.current,
    snapshot: snapshot.current,
    error: error.current
  }
}

export default useGetValue
