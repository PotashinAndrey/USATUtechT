/** */
  export function $(e, root = document) {
    return typeof e === 'object'
      ? e
      : root.querySelector(e);
  }
