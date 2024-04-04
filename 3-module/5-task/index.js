function getMinMax(str) {
  const result = str.split(' ').filter(item => !isNaN(Number(item)));

  const min = Math.min(...result.map(Number));
  const max = Math.max(...result.map(Number));

  return { min, max };
}
