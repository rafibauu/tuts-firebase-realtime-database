import { useRef, useState } from 'react'
import { ref, child, push, set } from 'firebase/database'
import { database } from '../services/firebase-sdk'
import useKey from './useKey'

const useCreateValue = () => {
  const [loading, setLoading] = useState(false)
  const data = useRef(null)
  const error = useRef(null)
  const success = useRef(null)
  const key = useKey()

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

  const setValueWithKey = async (path, value) => {
    setLoading(true)
    try {
      const rootReference = ref(database)
      const dbKey = key.generate(path)
      const dbPath = child(rootReference, `${path}/${dbKey}`)
      await set(dbPath, value)
      data.current = { key: dbKey, value }
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
    setValue,
    setValueWithKey
  }
}

export default useCreateValue
