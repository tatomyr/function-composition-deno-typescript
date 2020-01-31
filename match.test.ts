import {test, runTests} from 'https://deno.land/std/testing/mod.ts'
import {assertEquals} from 'https://deno.land/std/testing/asserts.ts'
import {matchId, unwrapId, match} from './match.ts'

let testObj = {id: 'my-id', other: 'data'}

test(function matchId__matches_existing_id() {
  assertEquals(matchId('my-id')(testObj), true)
})

test(function matchId__does_not_match_a_wrong_id() {
  assertEquals(matchId('wrong-id')(testObj), false)
})

test(function matchId__is_useful_when_filtering_arrays() {
  let testArr = [{some: 'data'}, {...testObj}, {id: 'another-id'}]
  assertEquals(testArr.filter(matchId('my-id')), [testObj])
})

test(function unwrapId__unwraps_the_id() {
  assertEquals(unwrapId(testObj), 'my-id')
})

test(function match__should_accept_oter_unwrap_functions() {
  let testUnwrap = ({other}) => other
  let matchOther = match(testUnwrap)
  assertEquals(matchOther('data')(testObj), true)
})

runTests()
