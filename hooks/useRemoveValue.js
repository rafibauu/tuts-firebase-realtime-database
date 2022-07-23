import { useRef, useState } from 'react'
import { ref, child, remove, update, set } from 'firebase/database'
import { database } from '../services/firebase-sdk'

const useUpdateValue = (path) => {
  const [loading, setLoading] = useState(false)
  const error = useRef(null)
  const success = useRef(null)

  const withRemove = async () => {
    setLoading(true)
    try {
      const rootReference = ref(database)
      const dbPath = child(rootReference, path)
      await remove(dbPath)
      success.current = true
    } catch (pushError) {
      error.current = pushError.message
    }
    setLoading(false)
  }

  const withUpdate = async () => {
    setLoading(true)
    try {
      const rootReference = ref(database)
      await update(rootReference, { [path]: null })
      success.current = true
    } catch (pushError) {
      error.current = pushError.message
    }
    setLoading(false)
  }

  const withSet = async () => {
    setLoading(true)
    try {
      const rootReference = ref(database)
      const dbPath = child(rootReference, path)
      await set(dbPath, null)
      success.current = true
    } catch (pushError) {
      error.current = pushError.message
    }
    setLoading(false)
  }

  return {
    loading,
    error: error.current,
    success: success.current,
    withRemove,
    withUpdate,
    withSet
  }
}

export default useUpdateValue
