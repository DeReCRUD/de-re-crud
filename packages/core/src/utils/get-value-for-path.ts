export default function getValueForPath(value: object, path?: string) {
  if (!path) {
    return value;
  }

  const pathArray = path.split('.');

  const pathValue = pathArray.reduce((prev, curr) => {
    if (!prev) {
      return null;
    }

    return prev[curr];
  }, value);

  return pathValue;
}
