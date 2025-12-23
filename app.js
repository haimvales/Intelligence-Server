import fs from 'fs/promises'
import express from "express";

const app = express();
const port = 3002;

app.use(express.json())