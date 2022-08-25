import {getPreferenceValues, showToast, Toast} from "@raycast/api"
import {TodoistApi, TodoistRequestError} from "@doist/todoist-api-typescript"
import fetch from "node-fetch"

export const getApiRoot = () => {
  return "http://localhost:3000"
}

const preferences = getPreferenceValues()

export interface Task {
  id: string
  deferDate: Date | null
  title: string
  weight: number
  column: string
  difficulty: string
}

export type TasksResponse = {error: string} | {tasks: Task[]}

/**
 * Returns tasks for the default frame
 */
export const getTasks = async (): Promise<TasksResponse> => {
  const url = `${getApiRoot()}/api/tasks`

  try {
    const result = await fetch(url, {
      headers: {Authorization: `Token ${preferences.key}`},
    })

    const json = await result.json()

    return json as TasksResponse
  } catch (e: any) {
    console.log("error:", e)

    return {error: e.message}
  }
}

export const todoist = new TodoistApi(preferences.token)

interface HandleErrorArgs {
  error: TodoistRequestError | unknown
  title: string
}

export function handleError({error, title}: HandleErrorArgs) {
  if (error instanceof TodoistRequestError && error.isAuthenticationError()) {
    return showToast({
      style: Toast.Style.Failure,
      title: title,
      message: "Please, make sure your Todoist token is correct.",
    })
  }

  return showToast({
    style: Toast.Style.Failure,
    title: title,
    message: error instanceof Error ? error.message : "",
  })
}
