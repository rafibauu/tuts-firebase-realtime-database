import { async } from '@firebase/util'
import {
  signInWithEmailAndPassword as fbSignIn,
  signOut as fbSignOut
} from 'firebase/auth'
import { get, ref, query, orderByChild, push, child, update } from 'firebase/database'
import { auth, database } from '../services/firebase-sdk'

export const getValues = async (path) => {
  const dbRef = ref(database, path)
  const dbGet = await get(dbRef)
  const dbValue = dbGet.val()
  return dbValue
}

export const getQuery = async (path, child, queries) => {
  const dbRef = ref(database, path)
  const dbQuery = query(dbRef, orderByChild(child), ...queries)
  const dbGet = await get(dbQuery)
  const dbValue = dbGet.val()
  return dbValue
}

export const createValue = async (path, value) => {
  const dbRef = ref(database)
  const dbPath = child(dbRef, path)
  await push(dbPath, value)
}

export const signIn = async (email, password) => {
  try {
    await fbSignIn(auth, email, password)
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log({ errorCode, errorMessage })
  }
}

export const signOut = async () => {
  await fbSignOut(auth)
}

export const authStateChange = (callbackAuth, callbackNoAuth) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      callbackAuth(user)
      return
    }

    callbackNoAuth()
  })
}
