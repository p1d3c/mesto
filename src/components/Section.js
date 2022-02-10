export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(item) {
    this._renderer(item);
  }

  addItem(element, method) {
    if (method === 'end') {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}
