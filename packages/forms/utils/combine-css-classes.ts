export default function combineCssClasses(...classes: string[]) {
  return classes.filter(x => x).join(" ");
}
