import {List} from "@raycast/api"
import {labelForTaskColumn} from "helpers/focustask"
import {groupBy} from "lodash"
import {useState} from "react"
import {useFetchLists, useFetchTasks} from "../../api/hooks"
import {ChecklistListItem} from "./checklist-list-item"
import {TaskListItem} from "./task-list-item"

export const SearchList = () => {
  const {isLoading, tasks} = useFetchTasks()
  const {lists} = useFetchLists()

  const groups = groupBy(tasks, (task) => task.column)

  const [search, setSearch] = useState("")

  const placeholder = "Search for tasks and lists, or create a new task."

  return (
    <List
      searchBarPlaceholder={placeholder}
      isLoading={isLoading && tasks.length === 0}
      searchText={search}
      onSearchTextChange={setSearch}
      enableFiltering={true}
    >
      {search ? (
        <>
          <List.Section title="Create task">
            <List.Item title={`Create: ${search}`} />
          </List.Section>

          <List.Section title="Lists">
            {lists.map((checklist) => (
              <ChecklistListItem checklist={checklist} key={checklist.id} />
            ))}
          </List.Section>

          <List.Section title="Tasks">
            {tasks.map((task) => (
              <TaskListItem key={task.id} task={task} lists={lists} />
            ))}
          </List.Section>
        </>
      ) : (
        Object.keys(groups).map((group) => (
          <List.Section title={labelForTaskColumn(group)} key={group}>
            {groups[group].map((task) => (
              <TaskListItem key={task.id} task={task} lists={lists} />
            ))}
          </List.Section>
        ))
      )}
    </List>
  )
}
