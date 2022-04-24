
export default (width: number, height: number, tileSize: number): Array<Array<number>> => {
  const horizontal = Math.ceil(width / tileSize) + tileSize
  const vertical = Math.ceil(height / tileSize) + tileSize

  const map = []
  for (let i = 0; i <= horizontal; i++) {
    const arr = []
    for (let j = 0; j <= vertical; j++) {
      arr.push(1)
    }
    map.push(arr)
  }

  return map
}
