import DefaultImage from "../../../assets/images/temp/bg-avatar-circle.png";

export class Shop {
  constructor({
    id,
    image = DefaultImage,
    name = "Shop",
    hint = "Shop hint",
    description = "Shop description",
    stars = 0,
    sold = 0,
    owner = null,
  }) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.hint = hint;
    this.description = description;
    this.stars = stars;
    this.sold = sold;
    this.owner = owner;
  }
}
