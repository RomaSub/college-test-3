export default function solution(content) {
  // BEGIN
  const data = content.split('\n').slice(2).map((el) => el.slice(1, -1).split('|').map((item) => item.trim()))
  // console.log(data.length)

  const rasten = data.map((el) => el[0]).map((el) => el[0].toUpperCase() + el.slice(1))
  // console.log(rasten.sort());
  const opasn = data.filter((el) => el.at(-1) === 'Да').map((el) => el[0])
  const procOpasn = 100  / (data.length / opasn.length);
  const neOpasn = data.filter((el) => el.at(-1) === 'Нет').map((el) => el[0])
  const procNeOpasn = 100  / (data.length / neOpasn.length);
  // console.log(`Опасные: ${procOpasn}%, безопасные: ${procNeOpasn}%`);
  const time = data.map((el) => el[3])
  const timeYearsSred = time.filter((el) => el.includes('-'))
  .map((el) => el.split(' ').slice(0, 1))
  .map(([el]) => {
    const [first, end] = el.split('-').map(Number)
    const sred = (first + end) / 2;
    return sred
  })
  const days = time.filter((el) => el.includes('день')).map((el) => el.split(' ').slice(0, 1)).map(Number)
  const daysToYears = days.map((el) => el / 365)
  const justYear = time.filter((el) => !el.includes('-') && !el.includes('день')).map((el) => el.split(' ').slice(0, 1)).map(Number)
  const allYears = justYear.concat(timeYearsSred, daysToYears)
  const sum = allYears.reduce((acc, el) => el + acc , 0)
  const average = Math.round(sum / allYears.length)
  // console.log(average);
  const dangerous = data.filter((el) => el.at(-1) === 'Да').map((el) => el[1])
  const odinoch = dangerous.filter((el) => !el.includes(',')).map((el) => el[0].toUpperCase() + el.slice(1))
  const neOdinoch = dangerous.filter((el) => el.includes(',')).map((el) => el.split(', ')).flat()
  .map((el) => el[0].toUpperCase() + el.slice(1))
  const mostDangerous = odinoch.concat(neOdinoch).reduce((acc, el) => {
    if (Object.hasOwn(acc, el)) acc[el] += 1
    else acc[el] = 1
    return acc
  }, {})
  const values = Object.values(mostDangerous)
  const max = Math.max(...values)
  // console.log(max);
  // END
}