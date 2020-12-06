const productGoose = require('mongoose');
const ProductSchema = productGoose.Schema;
const productSchema = new ProductSchema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    image: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    price: {
        type: Number,
        required: true,
        unique: false,
        trim: true,
    },
    date: { date: Date }
}, { timestamps: true });
const Products = productGoose.model('Product', productSchema);
module.exports = Products;
//# sourceMappingURL=product.model.js.map