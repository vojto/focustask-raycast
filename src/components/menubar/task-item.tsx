import {MenuBarExtra, open} from "@raycast/api"
import {FC, useCallback, useMemo} from "react"
import {getApiRoot, Task} from "../../api"
import {iconForDifficulty} from "../../helpers/focustask"

export const TaskItem: FC<{task: Task}> = ({task}) => {
  const handleAction = useCallback(() => {
    const root = getApiRoot()
    const path = `${root}/tasks/task/${task.id}`

    open(path)
  }, [])

  const iconSource = useMemo(
    () => iconForDifficulty(task.difficulty),
    [task.difficulty],
  )

  const icon = useMemo(
    () => (iconSource ? {source: iconSource} : undefined),
    [iconSource],
  )

  return (
    <MenuBarExtra.Item title={task.title} icon={icon} onAction={handleAction} />
  )
}
