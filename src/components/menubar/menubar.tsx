import {Icon, MenuBarExtra, open} from "@raycast/api"
import {useCachedState} from "@raycast/utils"
import {getApiRoot} from "api/helpers"
import {useFetchTasks} from "api/hooks"
import {Task} from "api/types"
import {uniq} from "lodash"
import {useMemo} from "react"
import {labelForTaskColumn} from "../../helpers/focustask"
import {TaskItem} from "./task-item"

type Item = {type: "column"; column: string} | {type: "task"; task: Task}

export const Menubar = () => {
  const {isLoading, error, tasks: allTasks} = useFetchTasks()
  const [needsRefetch, setNeedsRefetch] = useCachedState("needsRefetch", false)

  console.log("menubar needs refetch:", needsRefetch)

  const tasks = useMemo(
    () =>
      allTasks
        .filter((task) => task.visibleInDefaultFrame)
        .filter((task) => task.column === "current"),
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
      ) : menuItems.length > 0 ? (
        menuItems.map((item, i) =>
          item.type === "column" ? (
            <>
              <MenuBarExtra.Item
                key={i}
                title={labelForTaskColumn(item.column) ?? ""}
                icon={item.column === "current" ? Icon.Bolt : undefined}
              />
              <MenuBarExtra.Separator />
            </>
          ) : (
            <TaskItem key={i} task={item.task} />
          ),
        )
      ) : (
        <MenuBarExtra.Item title="No tasks in Current!" />
      )}

      <MenuBarExtra.Separator />

      <MenuBarExtra.Item
        title="Open FocusTask"
        onAction={() => open(getApiRoot())}
      />
    </MenuBarExtra>
  )
}
