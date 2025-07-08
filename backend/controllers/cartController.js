class CartController {
    constructor(CartModel) {
        this.CartModel = CartModel;
    }
    async addToCart(req, res) {
        try {
            const { userId, productId, quantity } = req.body;
            const cart = await this.CartModel.addToCart(userId, productId, quantity);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Error adding to cart', error });
        }
    }

    async getCartByUserId(req, res) {
        try {
            const userId = req.params.userId;
            const cart = await this.CartModel.getCartByUserId(userId);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching cart', error });
        }
    }

    async updateCartItem(req, res) {
        try {
            const { cartId, quantity } = req.body;
            const updatedItem = await this.CartModel.updateCartItem(cartId, quantity);
            res.status(200).json(updatedItem);
        } catch (error) {
            res.status(500).json({ message: 'Error updating cart item'+error.message, error });
        }
    }

    async removeFromCart(req, res) {
        try {
            const { cartId, productId } = req.body;
            const removedItem = await this.CartModel.removeFromCart(cartId, productId);
            res.status(200).json(removedItem);
        } catch (error) {
            console.log(error.message);
            console.log(req.body);
            res.status(500).json({ message: 'Error removing item from cart', error });
        }
    }
    
    async clearCart(req, res) {
        try {
            const userId = req.params.userId;
            const clearedCart = await this.CartModel.clearCart(userId);
            res.status(200).json(clearedCart);
        } catch (error) {
            res.status(500).json({ message: 'Error clearing cart', error });
        }
    }
}
export default CartController;