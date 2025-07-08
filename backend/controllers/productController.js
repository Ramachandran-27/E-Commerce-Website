class ProductController {
    constructor(ProductModel,ProductImagesModel,ProductSpecificationsModel) {
        this.ProductModel = ProductModel;
        this.ProductImagesModel = ProductImagesModel;
        this.ProductSpecificationsModel = ProductSpecificationsModel;
    }
    async createProduct(req, res) {
        try {
            const { name, description, price, stock, category_id, specifications = [] } = req.body;
            const images = req.files.map(file => file.filename);

            if (!name || !description || !price || !stock || !category_id) {
                return res.status(400).json({error: "Missing required fields"});
            }
            const newProduct = await this.ProductModel.createProduct({ name, description, price, stock, category_id });
            await this.ProductImagesModel.createProductImages(newProduct.id, images);
            await this.ProductSpecificationsModel.createProductSpecifications(newProduct.id, specifications);
            res.status(201).json(newProduct);
        } catch (err) {
            console.error("Error creating product:", err.message);
            res.status(500).json({error: "Internal Server Error"});
        }
    }

    async getAllProducts(req, res) {
        try{
            const params = req.query || {};
            const filters = {
                search:params.search || '',
                categoryId:params.categoryId || '',
                minPrice:params.minPrice || '',
                maxPrice:params.maxPrice || ''
            };
            const sort = {
                field:params.field || 'name',
                direction:params.direction || 'asc'
            };
            const pagination = {
                offset:params.offset || 0,
                limit:params.limit || 10
            };
            console.log(req.query);
            console.log("Filters:", filters);
            console.log("Sort:", sort);
            console.log("Pagination:", pagination);
            const products = await this.ProductModel.getAllProducts(filters, sort, pagination);
            res.status(200).json(products);
        }
        catch(err) {
            console.error("Error fetching products:", err.message);
            res.status(500).json({error: "Internal Server Error"});
        }
    }
    async getProductById(req, res) {
        try {
            const productId = req.params.id;
            const product = await this.ProductModel.getProductById(productId);
            if (!product) {
                return res.status(404).json({error: "Product not found"});
            }
            res.status(200).json(product);
        } catch (err) {
            console.error("Error fetching product:", err.message);
            res.status(500).json({error: "Internal Server Error"});
        }
    }

    async updateProduct(req, res) {
        try {
            const productId = req.params.id;
            const { name, description, price, stock, category_id, images, specifications } = req.body;
            if (!name || !description || !price || !stock || !category_id) {
                return res.status(400).json({error: "Missing required fields"});
            }
            const updatedProduct = await this.ProductModel.updateProduct(productId, { name, description, price, stock, category_id });
            if (images) {
                await this.ProductImagesModel.createProductImages(productId, images);
            }
            if (specifications) {
                await this.ProductSpecificationsModel.createProductSpecifications(productId, specifications);
            }
            res.status(200).json(updatedProduct);
        } catch (err) {
            console.error("Error updating product:", err.message);
            res.status(500).json({error: "Internal Server Error"});
        }
    }
    async updateProductImage(req, res) {
        try {
            const imageId = req.params.id;
            const { imageUrl } = req.body;
            if (!imageUrl) {
                return res.status(400).json({error: "Image URL is required"});
            }
            const updatedImage = await this.ProductImagesModel.updateProductImage(imageId, imageUrl);
            if (!updatedImage) {
                return res.status(404).json({error: "Image not found"});
            }
            res.status(200).json(updatedImage);
        } catch (err) {
            console.error("Error updating product image:", err.message);
            res.status(500).json({error: "Internal Server Error"});
        }
    }
    async updateProductSpecification(req, res) {
        try {
            const specificationId = req.params.id;
            const { spec_key, spec_value } = req.body;
            if (!spec_key || !spec_value) {
                return res.status(400).json({error: "Specification key and value are required"});
            }
            const updatedSpecification = await this.ProductSpecificationsModel.updateSpecification(specificationId, spec_key, spec_value);
            if (!updatedSpecification) {
                return res.status(404).json({error: "Specification not found"});
            }
            res.status(200).json(updatedSpecification);
        } catch (err) {
            console.error("Error updating product specification:", err.message);
            res.status(500).json({error: "Internal Server Error"});
        }
    }
    async deleteProduct(req, res) {
        try {
            const productId = req.params.id;
            const deleted = await this.ProductModel.deleteProduct(productId);
            if (!deleted) {
                return res.status(404).json({error: "Product not found"});
            }
            res.status(204).send();
        } catch (err) {
            console.error("Error deleting product:", err.message);
            res.status(500).json({error: "Internal Server Error"});
        }
    }
    async deleteProductImage(req, res) {
        try {
            const imageId = req.params.id;
            const deleted = await this.ProductImagesModel.deleteProductImage(imageId);
            if (!deleted) {
                return res.status(404).json({error: "Image not found"});
            }
            res.status(204).send();
        } catch (err) {
            console.error("Error deleting product image:", err.message);
            res.status(500).json({error: "Internal Server Error"});
        }
    }
    async deleteProductSpecification(req, res) {
        try {
            const specificationId = req.params.id;
            const deleted = await this.ProductSpecificationsModel.deleteSpecification(specificationId);
            if (!deleted) {
                return res.status(404).json({error: "Specification not found"});
            }
            res.status(204).send();
        } catch (err) {
            console.error("Error deleting product specification:", err.message);
            res.status(500).json({error: "Internal Server Error"});
        }
    }
}

export default ProductController;