const { Router } = require("express");
const bookRoutes = require("./bookRoutes");
const dashboardRoutes = require("./dashboardRoutet");
const preventAttackController = require("./preventAttackRoutes");
const authenticationMiddleware = require('../middleware/authenticationMiddleware')
const authRouter = require('./authRoutes')

const router = Router();

router.use("/", dashboardRoutes);
router.use("/api/v1/attack", preventAttackController)
router.use("/api/v1/books", authenticationMiddleware, bookRoutes);
router.use("/auth", authRouter)

module.exports = router;