/**
 * Класс, представляющий информацию о предмете на рынке SkinPost.
 */
export class SkinItem {
  /**
   * Название предмета на рынке.
   * @type {string}
   */
  marketHashName: string;

  /**
   * Валюта, в которой указаны цены.
   * @type {string}
   */
  currency: string;

  /**
   * Рекомендованная цена предмета.
   * @type {number}
   */
  suggestedPrice: number;

  /**
   * Ссылка на страницу предмета.
   * @type {string}
   */
  itemPage: string;

  /**
   * Ссылка на страницу рынка.
   * @type {string}
   */
  marketPage: string;

  /**
   * Минимальная цена предмета на рынке.
   * @type {number}
   */
  minPrice: number;

  /**
   * Максимальная цена предмета на рынке.
   * @type {number}
   */
  maxPrice: number;

  /**
   * Средняя цена предмета.
   * @type {number}
   */
  meanPrice: number;

  /**
   * Медианная цена предмета.
   * @type {number}
   */
  medianPrice: number;

  /**
   * Количество предметов на рынке.
   * @type {number}
   */
  quantity: number;

  /**
   * Время создания записи (в формате Unix timestamp).
   * @type {number}
   */
  createdAt: number;

  /**
   * Время обновления записи (в формате Unix timestamp).
   * @type {number}
   */
  updatedAt: number;

  /**
   * Создает экземпляр класса SkinItem.
   * @param {Object} data - Данные для инициализации объекта.
   * @param {string} data.marketHashName - Название предмета на рынке.
   * @param {string} data.currency - Валюта, в которой указаны цены.
   * @param {number} data.suggestedPrice - Рекомендованная цена предмета.
   * @param {string} data.itemPage - Ссылка на страницу предмета.
   * @param {string} data.marketPage - Ссылка на страницу рынка.
   * @param {number} data.minPrice - Минимальная цена предмета.
   * @param {number} data.maxPrice - Максимальная цена предмета.
   * @param {number} data.meanPrice - Средняя цена предмета.
   * @param {number} data.medianPrice - Медианная цена предмета.
   * @param {number} data.quantity - Количество предметов на рынке.
   * @param {number} data.createdAt - Время создания записи.
   * @param {number} data.updatedAt - Время обновления записи.
   */
  constructor(data: {
    marketHashName: string;
    currency: string;
    suggestedPrice: number;
    itemPage: string;
    marketPage: string;
    minPrice: number;
    maxPrice: number;
    meanPrice: number;
    medianPrice: number;
    quantity: number;
    createdAt: number;
    updatedAt: number;
  }) {
    this.marketHashName = data.marketHashName;
    this.currency = data.currency;
    this.suggestedPrice = data.suggestedPrice;
    this.itemPage = data.itemPage;
    this.marketPage = data.marketPage;
    this.minPrice = data.minPrice;
    this.maxPrice = data.maxPrice;
    this.meanPrice = data.meanPrice;
    this.medianPrice = data.medianPrice;
    this.quantity = data.quantity;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
