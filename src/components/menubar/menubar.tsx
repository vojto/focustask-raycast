import {Icon, MenuBarExtra} from "@raycast/api"
import {useFetchTasks} from "api/hooks"
import {Task} from "api/types"
import {uniq} from "lodash"
import {useMemo} from "react"
import {labelForTaskColumn} from "../../helpers/focustask"
import {TaskItem} from "./task-item"

type Item = {type: "column"; column: string} | {type: "task"; task: Task}

export const Menubar = () => {
  const {isLoading, error, tasks: allTasks} = useFetchTasks()

  const tasks = useMemo(
    () => allTasks.filter((task) => task.column === "current"),
    [allTasks],
  )

  const columns = useMemo(() => uniq(tasks.map((task) => task.column)), [tasks])

  const menuItems = useMemo(
    () =>
      columns.flatMap((column): Item[] => {
        const columnTasks = tasks.filter((task) => task.column === column)

        return [
          {type: "column", column},
          ...columnTasks.map((task): Item => ({type: "task", task})),
        ]
      }),
    [columns, tasks],
  )

  return (
    <MenuBarExtra
      icon={Icon.Bolt}
      title={tasks.length > 0 ? `${tasks.length}` : undefined}
      tooltip="Current FocusTask Tasks"
      isLoading={isLoading}
    >
      {isLoading && !allTasks.length ? (
        <MenuBarExtra.Item title="Loading" />
      ) : error ? (
        <MenuBarExtra.Item title="Failed loading" />
      ) : (
        <>
          {menuItems.map((item, i) =>
            item.type === "column" ? (
              <MenuBarExtra.Item
                key={i}
                title={labelForTaskColumn(item.column) ?? ""}
                icon={item.column === "current" ? Icon.Bolt : undefined}
              />
            ) : (
              <TaskItem key={i} task={item.task} />
            ),
          )}
        </>
      )}
    </MenuBarExtra>
  )
}
