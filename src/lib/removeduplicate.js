
export const removeDuplicate = (arr) => {
  const obj = {}
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i].title
    if ((key in obj) !== true) {
      obj[key] = arr[i]
    }
  }
  return obj
}
