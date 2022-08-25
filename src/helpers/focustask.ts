export const labelForTaskColumn = (column: string): string | undefined => {
  switch (column) {
    case "current":
      return "Current"
    case "next":
      return "Backlog"
    case "icebox":
      return "Icebox"
    case "deferred":
      return "Snoozed"
  }
}

export const iconForDifficulty = (option: string) => {
  switch (option) {
    case "phoneCall":
      return "phone.svg"
    case "errand":
      return "run.svg"
    case "generic-10":
      return "difficulty1.svg"
    case "generic-20":
      return "difficulty2.svg"
    case "generic-30":
      return "difficulty3.svg"
    case "generic-40":
      return "difficulty4.svg"
    case "generic-50":
      return "difficulty5.svg"
  }
}