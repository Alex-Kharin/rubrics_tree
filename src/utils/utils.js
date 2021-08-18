export const sumOfArrayElements = (array) => {
    if (array.length === 0) return 0
    if (array.length === 1) return array[0]
    return array.reduce((acc, term) => acc + term, 0)
}