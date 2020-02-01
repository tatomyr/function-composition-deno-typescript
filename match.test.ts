import {test, runTests} from 'https://deno.land/std/testing/mod.ts'
import {assertEquals} from 'https://deno.land/std/testing/asserts.ts'
import {matchId, unwrapId, match, changeIf} from './match.ts'

let testObj = {id: 'my-id', other: 'data'}
let testArr = [{id: 'some-id', some: 'data'}, {...testObj}, {id: 'another-id'}]

test(function matchId__matches_existing_id() {
  assertEquals(matchId('my-id')(testObj), true)
})

test(function matchId__does_not_match_a_wrong_id() {
  assertEquals(matchId('wrong-id')(testObj), false)
})

test(function matchId__is_useful_when_filtering_arrays() {
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

test(function changeIf__should_change_the_matching_item_in_array() {
  let updatedArray = testArr.map((item) =>
    item.id === 'my-id' ? {...item, updated: true} : item
  )
  let updatedArrayUsingMatchId = testArr.map((item) =>
    matchId('my-id')(item) ? {...item, updated: true} : item
  )
  assertEquals(updatedArray, updatedArrayUsingMatchId)
  let updatedArrayUsingChangeIf = testArr.map(
    changeIf(matchId('my-id'))((item) => ({...item, updated: true}))
  )
  assertEquals(updatedArray, updatedArrayUsingChangeIf)
})

runTests()
