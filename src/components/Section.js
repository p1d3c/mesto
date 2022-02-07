export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItem() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element, method) {
    if (method === 'end') {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}
