export interface IErrors {
  [path: string]: string[];
}

export interface IChildErrors {
  [parentPath: string]: { [childIndex: number]: boolean };
}
