import {getPreferenceValues} from "@raycast/api"
import fetch from "node-fetch"
import {ChecklistResponse, TasksResponse} from "./types"

export const getApiRoot = () => {
  return "http://localhost:3000"
}

const preferences = getPreferenceValues()

export const getTasks = () => {
  return getJson<TasksResponse>("tasks")
}

export const getChecklists = () => {
  return getJson<ChecklistResponse>("lists")
}

const getJson = async <T>(path: string): Promise<T | {error: string}> => {
  const url = `${getApiRoot()}/api/${path}`

  try {
    const result = await fetch(url, {
      headers: {Authorization: `Token ${preferences.key}`},
    })

    const json = await result.json()

    return json as T
  } catch (e: any) {
    console.log("error:", e)

    return {error: e.message}
  }
}
