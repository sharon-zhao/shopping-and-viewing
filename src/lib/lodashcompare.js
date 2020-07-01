import lodash from 'lodash'

export const lodashCompare = (arr, val) => {
  for (let i = 0; i < arr.length; i++) {
    if (lodash.isEqual(arr[i], val)) {
      return i
    }
  }
  return -1
}
