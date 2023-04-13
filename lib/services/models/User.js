import { TouchableHighlightBase } from "react-native";
import DefaultImage from "../../../assets/images/temp/bg-avatar-circle.jpg";

export class User {
  constructor({
    id,
    username = "Yarny", // Done
    firstname = "Little",
    middlename = "Yarn",
    lastname = "Ball",
    image = DefaultImage,
    hasShop = false,
    shopId,
    contact = "",
    email = "", // Done
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
    this.username = username;

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

  toMap() {
    return {
      id: this.id,
      username: this.username,
      firstname: this.firstname,
      middlename: this.middlename,
      lastname: this.lastname,
      hasShop: this.hasShop,
      shopId: this.shopId,
      contact: this.contact,
      email: this.email,
      street: this.street,
      zip: this.zip,
      city: this.city,
      country: this.country,
    };
  }

  /**
   *     id,
    username = "Yarny",
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
   */
}
