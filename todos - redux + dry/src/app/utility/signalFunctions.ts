import { WritableSignal } from "@angular/core";

export function updateState<T, K extends keyof T>(sg: WritableSignal<T>,
  prop: K, value: T[K]) {
  sg.update(obj => ({
    ...obj,
    [prop]: value
  }))
}