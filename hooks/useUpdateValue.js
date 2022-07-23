import { useRef, useState } from 'react'
import { ref, child, update } from 'firebase/database'
import { database } from '../services/firebase-sdk'

const useUpdateValue = () => {
  const [loading, setLoading] = useState(false)
  const error = useRef(null)
  const success = useRef(null)

  const updateDoc = async (path, value) => {
    setLoading(true)
    try {
      const rootReference = ref(database)
      const dbPath = child(rootReference, path)
      await update(dbPath, value)
      success.current = true
    } catch (pushError) {
      error.current = pushError.message
    }
    setLoading(false)
  }

  const updateField = async (updates) => {
    setLoading(true)
    try {
      const rootReference = ref(database)
      await update(rootReference, updates)
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
    updateDoc,
    updateField,
  }
}

export default useUpdateValue
