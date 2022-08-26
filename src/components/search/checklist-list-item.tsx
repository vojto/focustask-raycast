import {ActionPanel, List} from "@raycast/api"
import {Checklist} from "api/types"
import {FC} from "react"

export const ChecklistListItem: FC<{checklist: Checklist}> = ({checklist}) => {
  return (
    <List.Item
      title={checklist.title}
      keywords={[]}
      accessories={
        [
          // maybe print the task count here?
        ]
      }
      icon={undefined} // get the list icon?
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
