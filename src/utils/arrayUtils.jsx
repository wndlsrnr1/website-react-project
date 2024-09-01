export const removeDuplicated = (array) => {
  const uniqueArray = [];
  const uniqueElements = {};

  array.forEach((element) => {
    if (!uniqueElements[element]) {
      uniqueElements[element] = true;
      uniqueArray.push(element);
    }
  });
  return uniqueArray;
}

export const getKeyMapObject = (keyName, array) => {
  const result = {};

  array.forEach((elem, idx) => {
    result[elem.body[keyName]] = elem.body;
  });

  return result;
}
