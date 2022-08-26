import {List} from "@raycast/api"
import {labelForTaskColumn} from "helpers/focustask"
import {groupBy} from "lodash"
import {useState} from "react"
import {useFetchLists, useFetchTasks} from "../../api/hooks"
import {TaskListItem} from "./task-list-item"

export const SearchList = () => {
  const {isLoading, tasks} = useFetchTasks()
  const {lists} = useFetchLists()

  const groups = groupBy(tasks, (task) => task.column)

  console.log("groups:", Object.keys(groups))

  const [search, setSearch] = useState("")

  const placeholder = "Search for tasks and lists, or create a new task."

  return (
    <List
      searchBarPlaceholder={placeholder}
      isLoading={isLoading && tasks.length === 0}
      searchText={search}
    >
      {Object.keys(groups).map((group) => (
        <List.Section title={labelForTaskColumn(group)}>
          {groups[group].map((task, i) => (
            <TaskListItem key={i} task={task} lists={lists} />
          ))}
        </List.Section>
      ))}
    </List>
  )
}
