export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItem() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  addItem() {
    this._container.append(element);
  }
}
