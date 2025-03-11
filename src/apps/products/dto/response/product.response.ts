import { t } from 'elysia';

/**
 * Класс, представляющий информацию о предмете на рынке SkinPost.
 */
export class ProductItem {
  /**
   * Название предмета на рынке.
   * @type {string}
   */
  market_hash_name: string;

  /**
   * Валюта, в которой указаны цены.
   * @type {string}
   */
  currency: string;

  /**
   * Рекомендованная цена предмета.
   * @type {number}
   */
  suggested_price: number;

  /**
   * Ссылка на страницу предмета.
   * @type {string}
   */
  item_page: string;

  /**
   * Ссылка на страницу рынка.
   * @type {string}
   */
  market_page: string;

  /**
   * Минимальная цена предмета на рынке.
   * @type {number}
   */
  min_price: number;

  /**
   * Максимальная цена предмета на рынке.
   * @type {number}
   */
  max_price: number;

  /**
   * Средняя цена предмета.
   * @type {number}
   */
  mean_price: number;

  /**
   * Медианная цена предмета.
   * @type {number}
   */
  median_price: number;

  /**
   * Количество предметов на рынке.
   * @type {number}
   */
  quantity: number;

  /**
   * Время создания записи (в формате Unix timestamp).
   * @type {number}
   */
  created_at: number;

  /**
   * Время обновления записи (в формате Unix timestamp).
   * @type {number}
   */
  updated_at: number;

  /**
   * Создает экземпляр класса ProductItem.
   * @param {Object} data - Данные для инициализации объекта.
   * @param {string} data.market_hash_name - Название предмета на рынке.
   * @param {string} data.currency - Валюта, в которой указаны цены.
   * @param {number} data.suggested_price - Рекомендованная цена предмета.
   * @param {string} data.item_page - Ссылка на страницу предмета.
   * @param {string} data.market_page - Ссылка на страницу рынка.
   * @param {number} data.min_price - Минимальная цена предмета.
   * @param {number} data.max_price - Максимальная цена предмета.
   * @param {number} data.mean_price - Средняя цена предмета.
   * @param {number} data.median_price - Медианная цена предмета.
   * @param {number} data.quantity - Количество предметов на рынке.
   * @param {number} data.created_at - Время создания записи.
   * @param {number} data.updated_at - Время обновления записи.
   */
  constructor(data: {
    market_hash_name: string;
    currency: string;
    suggested_price: number;
    item_page: string;
    market_page: string;
    min_price: number;
    max_price: number;
    mean_price: number;
    median_price: number;
    quantity: number;
    created_at: number;
    updated_at: number;
  }) {
    this.market_hash_name = data.market_hash_name;
    this.currency = data.currency;
    this.suggested_price = data.suggested_price;
    this.item_page = data.item_page;
    this.market_page = data.market_page;
    this.min_price = data.min_price;
    this.max_price = data.max_price;
    this.mean_price = data.mean_price;
    this.median_price = data.median_price;
    this.quantity = data.quantity;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }
}

export class ProductResponse {
  name: string;
  tradeablePrice: number;
  untradeablePrice: number;
  quantity: number;

  constructor(data: {
    name: string;
    tradeablePrice: number;
    untradeablePrice: number;
    quantity: number;
  }) {
    this.name = data.name;
    this.tradeablePrice = data.tradeablePrice;
    this.untradeablePrice = data.untradeablePrice;
    this.quantity = data.quantity;
  }
}

export const ProductResponseSchema = t.Array(
  t.Object(<Record<keyof ProductResponse, any>>{
    name: t.String(),
    tradeablePrice: t.Number(),
    untradeablePrice: t.Number(),
    quantity: t.Number(),
    createdAt: t.Number(),
  }),
);
