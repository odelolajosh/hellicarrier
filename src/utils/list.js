/**
 * groups a list of data by date
 * @param {Object[]} data 
 * @param {String} alias 
 * @returns 
 */
export const groupByDate = (data=[], alias="date") => {
  const groups = data.reduce((groups, item) => {
    const date = item[alias].split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});

  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      data: groups[date]
    };
  });

  return groupArrays;
}

export const searchFor = (data=[], search, blackList=[]) => {
  const result = []
  for (let item of data) {
    for (let key in item) {
      if (blackList.includes(key)) {
        continue;
      }
      if (item[key].toString().toLowerCase().includes(search)) {
        result.append(item)
      }
    }
  }
  return result;
}