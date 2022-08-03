/**
 * Принимает два объекта, должна вернуть или true или false, если объекты идентичны внутри, возвращает
 * true, если есть различие, false. То есть проверяет каждое свойство, вне зависимости от вложенности,
 * делаем через рекурсию(а других вариантов и нет)
 */
export const deepEqual = (obj, anotherObject) => {
  return Object.entries(obj).every(([key, value]) => {
    return typeof value !== 'object'
      ? value === anotherObject[key]
      : deepEqual(value, anotherObject[key]);
  });
};

/**
 * Принимает объект, возвращает его глубокую копию, то есть ни одно свойство
 * не является ссылочным у другого объекта, точно возвращает новое.
 * Если это массив, возвращает новый массив(map) и если элемент массива не простого типа,
 * то тогда в рекурсию. С объектом также. Поскольку массив при typeof возвращает object, чтобы
 * их различить берем метод Array.isArray и он на массивах вернет тру
 */
export const deepCopy = (obj) => {
  if (typeof obj !== 'object') return obj;
  else if (Array.isArray(obj)) return obj.map(deepCopy);
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, deepCopy(value)])
  );
};

/**
 * Мы передаем объект, и должны вернуть массив уникальных названий свойств
 * То есть если у нас объект { name: { bohdan: { name: 'test' } } } вернет ['name', 'bohdan']
 */
export const getAllObjectKeys = (obj) => {
  let set = new Set(
    Object.entries(obj).reduce((accum, [key, value]) => {
      return typeof value !== 'object'
        ? [...accum, key]
        : [...accum, key, ...getAllObjectKeys(value)];
    }, [])
  );
  return Array.from(set);
};
