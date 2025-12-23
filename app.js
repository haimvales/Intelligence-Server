import express from "express";
import agentRoutes from "./routes/agentR.js";
import reportRoutes from "./routes/reportR.js";
import userRoutes from "./routes/userR.js";
import { connected } from "./utils/logger.js";
const app = express();
const port = 3002;
app.use(express.json());
app.use("/health", connected);



// users users
app.use("/users", userRoutes);
// posts reports
app.use("/reports", reportRoutes);
// posts agents
app.use("/agents", agentRoutes);





app.use((err, req, res, next) => {
    res.status(500).json({ err: err ? err : "internal error" });
})

app.listen(port, () => {
    console.log(`server runing on http://localhost:${port}`);
})

