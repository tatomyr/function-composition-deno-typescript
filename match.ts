import {
  AnyObject,
  SameTypeFunction,
  PredicateFunction,
  compose,
  compose2,
} from './common.ts'

type ObjectWith<K extends string, T = string> = Record<K, T> & AnyObject

export const match = <K extends string, T = string>(
  unwrap: (obj: ObjectWith<K, T>) => T
) => (key) => (obj: ObjectWith<K, T>) => unwrap(obj) === key

export const unwrapId = ({id}: ObjectWith<'id'>) => id

export const matchId = match(unwrapId)

export const changeIf = <T>(predicate: PredicateFunction<T>) => (
  transformer: SameTypeFunction<T>
) => (item: T) => (predicate(item) ? transformer(item) : item)

export const decorateIf = <T extends AnyObject>(
  predicate: PredicateFunction<T>
) => (additionals: AnyObject) => (item: T) =>
  predicate(item) ? {...item, ...additionals} : item

export const notMatch = <K extends string, T = string>(
  unwrap: (obj: ObjectWith<K, T>) => T
) => (key) => (obj: ObjectWith<K, T>) => unwrap(obj) !== key

export const notMatchId = notMatch(unwrapId)
