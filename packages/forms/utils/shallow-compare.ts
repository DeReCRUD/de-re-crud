// https://www.npmjs.com/package/shallow-compare

function shallowDiffers(a, b) {
  for (const i in a) {
    if (!(i in b)) {
      return true;
    }
  }

  for (const i in b) {
    if (a[i] !== b[i]) {
      return true;
    }
  }
  
  return false;
}

export default (instance, nextProps, nextState?) => {
  return (
    shallowDiffers(instance.props, nextProps) ||
    (nextState && shallowDiffers(instance.state, nextState))
  );
};
