export type AnyObject = {
  [x: string]: any
}

export type SameTypeFunction<T = any> = (parameter: T) => T

export const identity: SameTypeFunction = (item) => item

export type PredicateFunction<T = any> = (param: T) => boolean

// TODO: find out how to type properly so composed function iferres partial types
// E.g. type of `matchId = compose(match, unwrapId)` is `any`
export const compose = (...fns: Array<(param: any) => any>) =>
  fns.reduceRight(($, fn) => fn($), identity)
export const compose2 = <T, U, V>(f1: (x1: U) => V, f2: (x2: T) => U) => (arg: T) => f1(f2(arg))
// export const compose2 = <T, U, V>(f1: (x1: U) => V, f2: (x2: T) => U) => f1(f2)
