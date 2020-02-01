type ObjectWith<K extends string, T = string> = Record<K, T> & {
  [x: string]: any
}

export const match = <K extends string, T = string>(
  unwrap: (obj: ObjectWith<K, T>) => T
) => (key) => (obj: ObjectWith<K, T>) => unwrap(obj) === key

export const unwrapId = ({id}: ObjectWith<'id'>) => id

export const matchId = match(unwrapId)

export const identity = <T>(item: T): T => item

export const changeIf = <T>(predicate: (parameter: T) => boolean) => (
  transformer: (parameter: T) => T
) => (item: T) => (predicate(item) ? transformer(item) : item)
