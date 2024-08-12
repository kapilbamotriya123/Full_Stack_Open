"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const express_1 = __importDefault(require("express"));
const diaryServices_1 = require("../services/diaryServices");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.json((0, diaryServices_1.getNonSensitiveEntries)());
});
router.get('/:id', (req, res) => {
    const diary = (0, diaryServices_1.findById)(Number(req.params.id));
    if (diary) {
        return res.send(diary);
    }
    else {
        return res.status(404);
    }
});
router.post('/', (req, res) => {
    const { date, weather, visibility, comment } = req.body;
    const addedEntry = (0, diaryServices_1.addDiary)({
        date,
        weather,
        visibility,
        comment,
    });
    res.json(addedEntry);
});
exports.default = router;
