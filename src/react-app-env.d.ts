/// <reference types="react-scripts" />

// The types below will end up moved to relevant Redux reducer files, but for
// now our helpers and components need them already, so they need to be
// accessible to the type engine!

declare type HistoryEntry = {
  date: string
  progresses: {
    [goalId: string]: [progress: number, target: number]
  }
}

declare type TodaysProgress = {
  [goalId: string]: number
}
