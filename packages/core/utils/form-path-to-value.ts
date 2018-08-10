export default function formPathToValue(value: object, path: string) {
  const pathArray = path.split(".");

  const pathValue = pathArray.reduce((prev, curr) => {
    if (!prev) {
      return null;
    }

    return prev[curr];
  }, value);

  return pathValue;
}
