const fs = require('fs');
const path = require('path');
const dirname = require('../util/path');
const p = path.join(dirname,'data','books.json');
const Cart = require('../models/cart')
const getDataFromFile = (callBack)=>{
    fs.readFile(p,(err,fileContent)=>{
        if(err)
        {
            callBack([]);
        }
        else{
        callBack(JSON.parse(fileContent));
        }
        })
}
module.exports = class Books{
    constructor(id,bkName,bkAuthor,imageUrl,description,price)
    {
        this.id = id;
        this.bookName = bkName;
        this.bookAuthor = bkAuthor;
        this.bookImage = imageUrl;
        this.bookDesc = description;
        this.bookPrice = price;
    }
    save() {
        getDataFromFile(products => {
          if (this.id) {
            const existingProductIndex = products.findIndex(
              prod => prod.id === this.id
            );
            const updatedProducts = [...products];
            updatedProducts[existingProductIndex] = this;
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
              console.log(err);
            });
          } else {
            this.id = Math.random().toString();
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
              console.log(err);
            });
          }
        });
      }
    static fetchAll(callBack)
    {
      getDataFromFile(callBack);  
    }

    static findById(id,callBack)
    {
        getDataFromFile(books => {
            const book = books.find(p => p.id===id);
            callBack(book);
        })
    }
    static deleteById(id) {
      getDataFromFile(products => {
        const product = products.find(prod => prod.id === id);
        const updatedProducts = products.filter(prod => prod.id !== id);
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          if (!err) {
            Cart.deleteProduct(id, product.price);
          }
        });
      });
    }
};