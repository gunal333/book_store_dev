const books = require('../models/product');
const Cart = require('../models/cart');
const path = require('../util/path');


  exports.productsList = (req,res,next)=>{
    books.fetchAll((items)=>{
        res.render('books/books-list',{items:items , path : 'books-available',title:'All books'});
    });
  }

  exports.getBook = (req,res,next)=>{
    const book = req.params.bookId;
    books.findById(book,product =>{
      res.render('books/book-details',{book:product,title:product.bookName,path:'books-available'});
    })
      }

  exports.getIndex = (req,res,next)=>{
    books.fetchAll((items)=>{
      res.render('books/index',{items:items , path : 'books',title:'Shop'});
  });
  }
  exports.getOrders = (req,res,next)=>{ 
    res.render('books/order',{ path : 'order',title:'Your Orders'})
  }
  exports.getCheckout = (req,res,next)=>{
    res.render('books/checkout',title='Checkout',path='checkout');
  }
  
  exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    books.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ products: product, qty: cartProductData.qty });
        }
      }
      res.render('books/cart',{ path : 'cart',title:'Your cart',
        products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.bookId;
  books.findById(prodId, product => {
    Cart.addProduct(prodId, product.bookPrice);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.bookId;
  books.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.bookPrice);
    res.redirect('/cart');
  });
};
