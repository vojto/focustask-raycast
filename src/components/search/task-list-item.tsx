import {ActionPanel, List} from "@raycast/api"
import {Checklist, Task} from "api/types"
import {colorForTailwind} from "helpers/colors"
import {iconForDifficulty} from "helpers/focustask"
import {FC} from "react"

export const TaskListItem: FC<{task: Task; lists: Checklist[]}> = ({
  task,
  lists,
}) => {
  const icon = iconForDifficulty(task.difficulty)
  const list = lists.find((list) => list.id === task.listId)
  const color = list?.colorClassName
    ? colorForTailwind(list?.colorClassName)
    : undefined

  return (
    <List.Item
      title={formatTitle(task)}
      keywords={[]}
      accessories={[
        {
          text: list?.title,
        },
      ]}
      icon={
        icon
          ? {
              source: icon,
              tintColor: color,
            }
          : undefined
      }
      actions={
        <ActionPanel>
          {/* <Action.Push
            title="Show Details"
            target={<TaskDetail taskId={task.id} />}
            icon={Icon.Sidebar}
          /> */}

          {/* <TaskActions task={task} /> */}

          {/* {mode === ViewMode.project ? (
            <Action.Push
              title="Add New Task"
              target={<CreateTask fromProjectId={task.projectId} />}
              icon={Icon.Plus}
              shortcut={{modifiers: ["cmd", "shift"], key: "a"}}
            />
          ) : null} */}
        </ActionPanel>
      }
    />
  )
}

const formatTitle = (task: Task) => {
  if (task.formattedDeferDate) {
    return `${task.title} [${task.formattedDeferDate}]`
  } else {
    return task.title
  }
}
