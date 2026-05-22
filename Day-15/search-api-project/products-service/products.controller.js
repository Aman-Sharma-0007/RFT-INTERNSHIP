const { searchProducts } = require("./products.service");

const searchProductsController = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    if (!name && !category && !minPrice && !maxPrice) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one filter: name, category, minPrice, maxPrice",
      });
    }

    const results = await searchProducts({ name, category, minPrice, maxPrice });

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    res.status(200).json({
      success: true,
      count:   results.length,
      data:    results,
    });

  } catch (error) {
    console.error("Products controller error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { searchProductsController };