const books = require('../models/product');
exports.getAddBooks = (req,res,next)=>{
    res.render('admin/add-books',{title : 'Add books' , path : 'add-books'});
    console.log("Inside add book page");
 }
exports.postAddBooks = (req,res,next)=>{
   const name = req.body['bk-name'];
   const author =req.body['bk-author'];
   const price =Number(req.body['bk-price']);
   const image = req.body['bk-ImageUrl'];
   const desc = req.body['bk-desc'];
    const book = new books(null,name,author,image,desc,price);
    book.save();
    /*console.log('Book added : ',req.body['bk-name'],' and the author is ',req.body['bk-author']);*/
    res.redirect('/books');
  }
  exports.getProducts = (req,res,next)=>{
    books.fetchAll((items)=>{
        res.render('admin/books-list',{items:items , path : 'admin/books-available',title:'Admin books'});
    });
  }
  exports.getEditBook = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    const prodId = req.params.bookId;
    books.findById(prodId, product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-book', {
        title: 'Edit Product',
        path: 'edit-book',
        edit: editMode,
        bk: product
      });
    });
  };
  
  exports.postEditBook = (req, res, next) => {
    const prodId = req.body['bkId'];
    const updatedTitle = req.body['bk-name'];
    const updatedAuthor = req.body['bk-author'];
    const updatedPrice = req.body['bk-price'];
    const updatedImageUrl = req.body['bk-ImageUrl'];
    const updatedDesc = req.body['bk-desc'];
    const updatedProduct = new books(
      prodId,
      updatedTitle,
      updatedAuthor,
      updatedImageUrl,
      updatedDesc,
      updatedPrice
    );
    updatedProduct.save();
    res.redirect('/books');
  };
  
  exports.deleteBook = (req, res, next) => {
    const prodId = req.body.bookId;
    books.deleteById(prodId);
    res.redirect('/books');
  };
  