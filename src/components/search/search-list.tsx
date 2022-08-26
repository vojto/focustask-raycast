import {List, Icon} from "@raycast/api"
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
    : tasks

  const groupedTasks = groupBy(filteredTasks, (task) => task.column)

  const placeholder = "Search for tasks and lists, or create a new task."

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

          <List.Item icon={Icon.Pencil} title={`Create task: ${search}`} />
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
