import { ref, child, push } from 'firebase/database'
import { database } from '../services/firebase-sdk'

const useKey = () => {
  const generate = (path) => {
    const rootReference = ref(database)
    const dbRef = child(rootReference, path)
    const dbKey = push(dbRef).key
    return dbKey
  }

  return { generate }
}

export default useKey
