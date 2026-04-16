/**
 * 
 * utils/asyncHandler.js

    Controller এ বারবার try/catch না লিখে এই function দিয়ে wrap করো

    const asyncHandler = (fn) => (req, res, next) => fn(req, res, next).catch(next);



   Controller এ error হলো
         ↓
   asyncHandler ধরলো → next(error) পাঠালো
         ↓
   errorHandler middleware পেলো
         ↓
   AppError এর statusCode + message দিয়ে response পাঠালো
         ↓
   Client সুন্দর error message পেলো ✅


   // controller এ এভাবে use করবে
   const asyncHandler = require("../../utils/asyncHandler");
   const AppError = require("../../utils/AppError");

   const getProduct = asyncHandler(async (req, res) => {
   const product = await Product.findById(req.params.id);

   if (!product) {
      throw new AppError("Product পাওয়া যায়নি", 404);
   }

   res.json({ success: true, data: product });
   });
 */

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
