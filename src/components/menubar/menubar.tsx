import {Icon, MenuBarExtra} from "@raycast/api"
import {useCachedPromise} from "@raycast/utils"
import {uniq} from "lodash"
import {useMemo} from "react"
import {getTasks, Task} from "../../api"
import {labelForTaskColumn} from "../../helpers/focustask"
import {TaskItem} from "./task-item"

type Item = {type: "column"; column: string} | {type: "task"; task: Task}

export const Menubar = () => {
  const {isLoading, data} = useCachedPromise(() => getTasks())

  const allTasks = useMemo(
    () => (data && "tasks" in data ? data.tasks : []),
    [data],
  )

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
      {isLoading && !data ? (
        <MenuBarExtra.Item title="Loading" />
      ) : !data || "error" in data ? (
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
