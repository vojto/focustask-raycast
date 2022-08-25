import {List} from "@raycast/api"
import {useState} from "react"
import {useFetchLists, useFetchTasks} from "../../api/hooks"
import {TaskListItem} from "./task-list-item"

export const SearchList = () => {
  const {isLoading, tasks} = useFetchTasks()
  const {lists} = useFetchLists()
  const [search, setSearch] = useState("")

  const placeholder = "Search for tasks and lists, or create a new task."

  return (
    <List
      searchBarPlaceholder={placeholder}
      isLoading={isLoading && tasks.length === 0}
      searchText={search}
    >
      {tasks.map((task, i) => (
        <TaskListItem key={i} task={task} lists={lists} />
      ))}

      {/* {allTasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          mode={projectId ? ViewMode.project : ViewMode.search}
          {...(projects ? {projects} : {})}
        />
      ))} */}
    </List>
  )
}
