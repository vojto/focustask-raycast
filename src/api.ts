import {getPreferenceValues, showToast, Toast} from "@raycast/api"
import {TodoistApi, TodoistRequestError} from "@doist/todoist-api-typescript"
import fetch from "node-fetch"

const root = "https://focustask-cqzm2tll6-vojto.vercel.app"

const preferences = getPreferenceValues()

interface Task {}

export type TasksResponse = {error: string} | {tasks: Task}

/**
 * Returns tasks for the default frame
 */
export const getTasks = async (): Promise<TasksResponse> => {
  const url = `${root}/api/tasks`
  console.log("getting tasks...", url)

  try {
    const result = await fetch(url, {
      headers: {Authorization: `Token ${preferences.key}`},
    })

    const json = await result.json()

    console.log("json:", json)

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
