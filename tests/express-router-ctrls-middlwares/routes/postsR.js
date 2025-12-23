import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    res.send();
});
router.post("/", async (req, res) => {
    res.send();
});
router.put("/:id", async (req, res) => {
    res.send();
});
router.delete("/:id", async (req, res) => {
    res.send();
});

export default router;