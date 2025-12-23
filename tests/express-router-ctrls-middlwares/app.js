import express from "express";
import usersRoutes from "./routes/usersR.js";
import postsRoutes from "./routes/postsR.js";
const app = express();
const port = 3002;
app.use(express.json());

// users routes
app.use("/users", usersRoutes);
// posts routes
app.use("/posts", postsRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ err: err ? err : "internal error" });
})

app.listen(port, () => {
    console.log(`server runing on http://localhost:${port}`);
})