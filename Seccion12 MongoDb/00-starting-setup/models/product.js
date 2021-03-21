const getdb = require("../util/database").getDb;
const mongodb = require("mongodb");

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }
  save() {
    const db = getdb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getdb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static findById(prodId) {
    const db = getdb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static delete(prodId) {
    const db = getdb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
