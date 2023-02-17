export const capitalize = (str) => {
  const strArr = str.toLowerCase().split(' ')
  let strCapitalized = ''
  strArr.forEach(word => {
    const initialLetter = word[0].toUpperCase()
    const restOfTheLetters = word.slice(1)
    strCapitalized += initialLetter + restOfTheLetters + ' '
  })

  return strCapitalized
}
