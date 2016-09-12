export class Box {
  constructor(element) {
    this.element = element;
  }

  position() {
    const x = parseInt(this.element.dataset.x, 10);
    const y = parseInt(this.element.dataset.y, 10);

    return [x, y];
  }
}

