import {Action, ActionPanel, List} from "@raycast/api"
import {getApiRoot} from "api/helpers"
import {Checklist} from "api/types"
import {colorForTailwind} from "helpers/colors"
import {FC} from "react"

export const ChecklistListItem: FC<{checklist: Checklist}> = ({checklist}) => {
  const icon = checklist.icon
    ? `${getApiRoot()}/icons/${checklist.icon}.svg`
    : null

  const color = checklist.colorClassName
    ? colorForTailwind(checklist.colorClassName)
    : undefined

  return (
    <List.Item
      title={checklist.title}
      keywords={[]}
      accessories={
        [
          // maybe print the task count here?
        ]
      }
      icon={icon ? {source: icon, tintColor: color} : undefined}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser
            url={checklist.url}
            shortcut={{modifiers: ["cmd"], key: "o"}}
          />

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
