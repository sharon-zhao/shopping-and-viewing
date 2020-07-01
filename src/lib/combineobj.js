
export const combineObj = (arr) => {
  const obj = {}
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i].title
    if ((key in obj) !== true) {
      obj[key] = 1
    } else {
      obj[key] += 1
    }
  }
  return obj
}
