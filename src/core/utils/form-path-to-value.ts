export default function formPathToValue(value: object, path: string) {
  const pathArray = path.split('.');

  const pathValue = pathArray.reduce((prev, curr) => {
    return prev[curr];
  }, value);  

  return pathValue;

}