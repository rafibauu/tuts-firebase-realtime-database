import { useRef, useState } from 'react'
import { ref, child, push, set } from 'firebase/database'
import { database } from '../services/firebase-sdk'

const useCreateValue = () => {
  const [loading, setLoading] = useState(false)
  const data = useRef(null)
  const error = useRef(null)
  const success = useRef(null)

  const pushValue = async (path, value) => {
    setLoading(true)
    try {
      const rootReference = ref(database)
      const dbPath = child(rootReference, path)
      const dbPush = await push(dbPath, value)
      data.current = { key: dbPush.key, value }
      success.current = true
    } catch (pushError) {
      error.current = pushError.message
    }
    setLoading(false)
  }

  const setValue = async (path, value) => {
    setLoading(true)
    try {
      const rootReference = ref(database)
      const dbPath = child(rootReference, path)
      await set(dbPath, value)
      success.current = true
    } catch (pushError) {
      error.current = pushError.message
    }
    setLoading(false)
  }

  return {
    loading,
    data: data.current,
    error: error.current,
    success: success.current,
    pushValue,
    setValue
  }
}

export default useCreateValue
