import {MenuBarExtra, Icon} from "@raycast/api"
import {useEffect} from "react"
import useSWR from "swr"
import {getTasks} from "./api"

export default function Command() {
  const {data, isValidating} = useSWR("tasks", () => getTasks())

  console.log("validating:", isValidating)
  console.log("data:", data)

  useEffect(() => {
    console.log("mounting")
  }, [])

  return (
    <MenuBarExtra
      // icon="https://focustask.app/favicon.ico"
      icon={Icon.Bolt}
      tooltip="Current FocusTask Tasks"
    >
      {isValidating && !data ? (
        <MenuBarExtra.Item title="Loading" />
      ) : !data || "error" in data ? (
        <MenuBarExtra.Item title="Failed loading" />
      ) : (
        <MenuBarExtra.Item title="All good!" />
      )}

      {/* <MenuBarExtra.Item title="Seen" />
      <MenuBarExtra.Item
        title="Example Seen Pull Request"
        onAction={() => {
          console.log("seen pull request clicked")
        }}
      />
      <MenuBarExtra.Item title="Unseen" />
      <MenuBarExtra.Item
        title="Example Unseen Pull Request"
        onAction={() => {
          console.log("unseen pull request clicked")
        }}
      /> */}
    </MenuBarExtra>
  )
}
