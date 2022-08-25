import {ActionPanel, List} from "@raycast/api"
import {FC} from "react"
import {Checklist, Task} from "api/types"
import {blue500, colorForTailwind} from "helpers/colors"
import {iconForDifficulty} from "helpers/focustask"
import {getApiRoot} from "api/helpers"

export const TaskListItem: FC<{task: Task; lists: Checklist[]}> = ({
  task,
  lists,
}) => {
  const icon = iconForDifficulty(task.difficulty)
  const list = lists.find((list) => list.id === task.listId)
  const color = colorForTailwind(list?.color)

  return (
    <List.Item
      title={task.title}
      keywords={[]}
      accessories={[
        {
          text: list?.title,
          // icon: list?.icon
          //   ? {
          //       source: `${getApiRoot()}/icons/${list?.icon}.svg`,
          //       tintColor: color,
          //     }
          //   : null,
        },
      ]}
      icon={
        icon
          ? {
              source: icon,
              tintColor: colorForTailwind(list?.color),
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
