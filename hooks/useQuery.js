import { useEffect, useRef, useState, useCallback } from 'react'
import { ref, get, orderByKey, query } from 'firebase/database'
import { database } from '../services/firebase-sdk'

const useQuery = ({ path, initialLoad = true, queries = [] }) => {
  const [loading, setLoading] = useState(initialLoad)
  const snapshot = useRef(null)
  const error = useRef(null)
  const empty = useRef(false)

  const queryValue = useCallback(async () => {
    try {
      const dbRef = ref(database, path)
      const dbQuery = query(dbRef, orderByKey(), ...queries)
      const dbGet = await get(dbQuery)
      const dbValue = dbGet.val()
      const dbExist = dbGet.exists()

      if (!dbExist) {
        empty.current = true
      }
      snapshot.current = dbValue
    } catch (queryError) {
      error.current = queryError.message
    }
    setLoading(false)
  }, [path, queries])

  const queryLater = () => {
    snapshot.current = null
    error.current = null
    empty.current = false
    setLoading(true)
  }

  useEffect(() => {
    if (loading) {
      queryValue()
    }
  }, [loading, queryValue])

  return {
    loading,
    empty: empty.current,
    snapshot: snapshot.current,
    error: error.current,
    queryLater
  }
}

export default useQuery
