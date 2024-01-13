import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import filterProducts from "../utils/filterProducts.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

const getProducts = asyncHandler(async (req, res) => {
  const filters = req.query;
  console.log(filters);
  const pageSize = process.env.PAGINATION_LIMIT;
  const pageNumber = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const productsByKeyword = await Product.find({ ...keyword });
  // .limit(pageSize)
  // .skip(pageSize * (pageNumber - 1));

  const products = filterProducts(productsByKeyword, filters);
  console.log(
    // "count:",
    // count,
    "products.length: ",
    products.length,
    "productsByKeyword.length: ",
    productsByKeyword.length,
    "pages:",
    Math.ceil(count / pageSize),
    "pageNumber: ",
    pageNumber
  );
  res.status(200).json({ products, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json(product);
  }
  res.status(404);
  throw new Error("Resource not found");
});

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Write name here",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Write brand here",
    category: "Write category here",
    countInStock: 0,
    numReviews: 0,
    description: "Write description here",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Create review of product
// @route   DELETE /api/products/:id/reviews
// @access  Private

const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { rating, comment } = req.body;

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Get top products
// @route   GET /api/products/top-electronics
// @access  Public

const getTopElectronics = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: "Electronics" })
    .sort({ rating: -1 })
    .limit(6);

  res.status(200).json(products);
});

// @desc    Fetch all categories
// @route   GET /api/products/categories
// @access  Public

const getCategories = asyncHandler(async (req, res) => {
  const sortedCategories = await Product.distinct("category").sort();

  const products = await Product.find({});
  const categoryItems = [];

  sortedCategories.forEach((category) => {
    const productsInCategory = products.filter(
      (product) => product.category === category
    );
    categoryItems.push({ name: category, qty: productsInCategory.length });
  });

  res.status(200).json({ categoryItems });
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopElectronics,
  getCategories,
};
