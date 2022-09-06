import {
  Action,
  ActionPanel,
  Icon,
  List,
  showHUD,
  showToast,
  Toast,
} from "@raycast/api"
import {createTask} from "api/helpers"
import {labelForTaskColumn} from "helpers/focustask"
import {groupBy} from "lodash"
import {useState} from "react"
import {useFetchLists, useFetchTasks} from "../../api/hooks"
import {ChecklistListItem} from "./checklist-list-item"
import {TaskListItem} from "./task-list-item"

export const SearchList = () => {
  const {isLoading, tasks} = useFetchTasks()
  const {lists} = useFetchLists()

  const [search, setSearch] = useState("")

  const filteredLists = search
    ? lists.filter((list) =>
        list.title.toLowerCase().includes(search.toLowerCase()),
      )
    : lists

  const filteredTasks = search
    ? tasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase()),
      )
    : tasks.filter((task) => task.visibleInDefaultFrame)

  const groupedTasks = groupBy(filteredTasks, (task) => task.column)

  const placeholder = "Search for tasks and lists, or create a new task."

  const handleCreate = async () => {
    await showToast({
      style: Toast.Style.Animated,
      title: "Creating task",
      message: "This should only take a moment",
    })

    const response = await createTask({title: search})

    if ("id" in response) {
      showHUD("Task created")
    } else {
      showHUD("Failed to create a task")
    }
  }

  return (
    <List
      searchBarPlaceholder={placeholder}
      isLoading={isLoading && tasks.length === 0}
      searchText={search}
      onSearchTextChange={setSearch}
    >
      {search ? (
        <>
          {filteredLists.map((checklist) => (
            <ChecklistListItem checklist={checklist} key={checklist.id} />
          ))}

          {filteredTasks.map((task) => (
            <TaskListItem key={task.id} task={task} lists={lists} />
          ))}

          <List.Item
            title={`Create task: ${search}`}
            actions={
              <ActionPanel>
                <Action
                  // id="createTask"
                  title="Create Task"
                  icon={Icon.NewDocument}
                  // shortcut={{modifiers: ["cmd", "shift"], key: "e"}}
                  onAction={handleCreate}
                />
              </ActionPanel>
            }
          />
        </>
      ) : (
        Object.keys(groupedTasks).map((group) => (
          <List.Section title={labelForTaskColumn(group)} key={group}>
            {groupedTasks[group].map((task) => (
              <TaskListItem key={task.id} task={task} lists={lists} />
            ))}
          </List.Section>
        ))
      )}
    </List>
  )
}
