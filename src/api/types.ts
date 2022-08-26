export interface Task {
  id: string
  deferDate: Date | null
  formattedDeferDate: string | null
  title: string
  note: string | null
  weight: number
  column: string
  difficulty: string
  listId: string | null
}

export interface Checklist {
  id: string
  title: string
  weight: number
  color: string | null
  colorClassName: string | null
  icon: string | null
}

export type TasksResponse = {error: string} | {tasks: Task[]}
export type ChecklistResponse = {error: string} | {lists: Checklist[]}
