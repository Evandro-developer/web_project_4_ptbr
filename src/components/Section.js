import { getElement } from "../utils/helpers.js";

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._itemsPromiseResolve = Promise.resolve(items);
    this._renderer = renderer;
    this._container = getElement(containerSelector);
  }

  async renderItems() {
    const items = await this._itemsPromiseResolve;
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  async addItem(item) {
    await this._container.append(item);
  }

  async prependItem(item) {
    await this._container.prepend(item);
  }
}
