// Layout coordinates exclude the hero's own entrance transforms.
export function layoutBox(element: HTMLElement) {
  let x = 0;
  let y = 0;
  let parent: HTMLElement | null = element;
  while (parent) {
    x += parent.offsetLeft;
    y += parent.offsetTop;
    parent = parent.offsetParent as HTMLElement | null;
  }
  return { x, y, width: element.offsetWidth, height: element.offsetHeight };
}

