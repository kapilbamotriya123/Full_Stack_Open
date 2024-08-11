"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
