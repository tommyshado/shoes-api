import shoppingCart from "../services/shoppingCart.js"
import database from "../model/dbConnection.js";
import { Router } from "express";
import authService from "../services/authService.js";

// Service instance
const ShoppingCart = shoppingCart(database);
const auth = authService(database);
// Router instance
const router = Router();

// Routes

// Router for getting cart for a user
router.get("/username/:username", async (req, res) => {
    try {
        const data = {
            username: req.params.username
        };
        const checkUsername = await auth.checkUsername(data);
        if (!checkUsername) return res.json({
            status: "error",
            error: "Not registered in the registrations page"
        });
        const cart = await ShoppingCart.getCart(data);

        res.json({
            status: "success",
            cart: cart
        })
        
    } catch (err) {
        res.json({
            status: "error",
            error: err.stack
        })
    };
});

router.post("/username/:username/shoeId/:shoeId/add", async (req, res) => {
    try {
        const data = {
            shoeId: req.params.shoeId,
            username: req.params.username
        };
        const checkUsername = await auth.checkUsername(data);
        if (!checkUsername) return res.json({
            status: "error",
            error: "Not registered in the registrations page"
        });
        // Adding to the cart
        await ShoppingCart.addToCart(data);

        res.json({
            status: "success"
        })
        
    } catch (err) {
        res.json({
            status: "error",
            error: err.stack
        })
    };
});

router.post("/username/:username/shoeId/:shoeId/remove", async (req, res) => {
    try {
        const data = {
            shoeId: req.params.shoeId,
            username: req.params.username
        };
        const checkUsername = await auth.checkUsername(data);
        if (!checkUsername) return res.json({
            status: "error",
            error: "Not registered in the registrations page"
        });
        // Removing from the cart
        await ShoppingCart.removeFromCart(data);

        res.json({
            status: "success"
        })
        
    } catch (err) {
        res.json({
            status: "error",
            error: err.stack
        })
    };
});

export default router;