export default function createCssClass(root: string, ...params: string[]) {
  if (!params.length) {
    return root;
  }

  return root + "-" + params.join("-");
}
