import {MenuBarExtra, open} from "@raycast/api"
import {getApiRoot} from "api/helpers"
import {Task} from "api/types"
import {FC, useCallback} from "react"
import {raycastIconFromTask} from "../../helpers/focustask"

export const TaskItem: FC<{task: Task}> = ({task}) => {
  const handleAction = useCallback(() => {
    const root = getApiRoot()
    const path = `${root}/tasks/task/${task.id}`

    open(path)
  }, [])

  return (
    <MenuBarExtra.Item
      title={task.title}
      icon={raycastIconFromTask(task)}
      onAction={handleAction}
    />
  )
}
