import {List} from "@raycast/api"

export default function Current() {
  return (
    <List>
      <List.EmptyView
        title="Congratulations!"
        description="No tasks left for today."
        icon="🎉"
      />
    </List>
  )
}
