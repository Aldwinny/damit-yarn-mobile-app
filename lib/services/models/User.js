import DefaultImage from "../../../assets/images/temp/bg-avatar-circle.jpg";

export class User {
  constructor({
    id,
    firstname = "Little",
    middlename = "Yarn",
    lastname = "Ball",
    image = DefaultImage,
    hasShop = false,
    shopId = null,
    contact = "",
    email = "",
    street = "",
    zip = "",
    city = "",
    country = "",
  }) {
    // General information
    this.id = id;
    this.image = image;
    this.hasShop = hasShop;
    this.shopId = shopId;

    // Personal Information
    this.firstname = firstname;
    this.lastname = lastname;
    this.middlename = middlename;
    this.contact = contact;
    this.email = email;

    // Location stuff
    this.street = street;
    this.zip = zip;
    this.city = city;
    this.country = country;
  }
}
