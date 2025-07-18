class WishlistController {
    constructor(WishlistModel){
        this.WishlistModel = WishlistModel;
    }
    async addToWishlist(req, res) {
        try {
            const { userId, productId } = req.body;
            console.log(req.body,userId,productId);
            const wishlistItem = await this.WishlistModel.addToWishlist(userId, productId);
            console.log(wishlistItem);
            res.status(200).json(wishlistItem);
        } catch (error) {
            res.status(500).json({ message: 'Error adding to wishlist', error });
        }
    }
    async getWishlistByUserId(req, res) {
        try {
            const userId = req.params.userId;
            const wishlist = await this.WishlistModel.getWishlistByUserId(userId);
            res.status(200).json(wishlist);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching wishlist', error });
        }
    }
    async removeFromWishlist(req, res) {
        try {
            const { userId, productId } = req.body;
            console.log(req.body);
            const removedItem = await this.WishlistModel.removeFromWishlist(userId, productId);
            console.log(removedItem);
            res.status(200).json(removedItem);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message, error });
        }
    }
    async isProductInWishlist(req, res) {
        try {
            const { userId, productId } = req.body;
            const exists = await this.WishlistModel.isProductInWishlist(userId, productId);
            res.status(200).json({ exists });
        } catch (error) {
            res.status(500).json({ message: 'Error checking wishlist', error });
        }
    }
}
export default WishlistController;