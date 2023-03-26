/**
 * Insert the Item model in here. The item model represents an Item in the shop
 * Each item has a:
 * 1. ImageLink (to CMS)
 * 2. Name
 * 3. Owner (Shop Entity)
 * 4. Price
 * 5. Description
 * 6. (...)
 */

import DefaultImage from "../../../assets/images/temp/bg-item.png";

export class Item {
  constructor({
    id,
    image = DefaultImage,
    name = "Item Name",
    description = "Item Description",
    price = 0,
    stars = 0,
    sold = 0,
    keywords = [],
    owner = null,
    reviews = [],
  }) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stars = stars;
    this.sold = sold;
    this.keywords = keywords;
    this.owner = owner;
    this.reviews = reviews;
  }
}
