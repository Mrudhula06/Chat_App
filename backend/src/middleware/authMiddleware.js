import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
    try {
        // console.log("🔹 Checking Auth...");
        // console.log("🔹 Cookies:", req.cookies);

        const token = req.cookies.jwt;
        if (!token) {
            // console.log("❌ No token found in cookies.");
            return res.status(401).json({ message: "Unauthorized - No token Provided" });
        }

        // console.log("🔹 Verifying Token:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("✅ Token Decoded:", decoded);

        // Debugging: Check if User is imported correctly
        // console.log("🔹 Checking User model:", User);

        // Fetch the user
        const user = await User.findById(decoded.userId).select("-password");
        // console.log("✅ User Found:", user);

        if (!user) {
            // console.log("❌ User not found in database.");
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        // console.error("❌ ERROR in protectRoute middleware:", error);
        res.status(500).json({ message: error.message });
    }
};
