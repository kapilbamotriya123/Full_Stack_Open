"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDiary = exports.getEntries = exports.findById = exports.getNonSensitiveEntries = void 0;
const entries_1 = __importDefault(require("../../data/entries"));
const getEntries = () => {
    return entries_1.default;
};
exports.getEntries = getEntries;
const addDiary = (entry) => {
    const newEntry = Object.assign({ id: Math.max(...entries_1.default.map(d => d.id)) + 1 }, entry);
    entries_1.default.push(newEntry);
    return newEntry;
};
exports.addDiary = addDiary;
const getNonSensitiveEntries = () => {
    return entries_1.default.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility
    }));
};
exports.getNonSensitiveEntries = getNonSensitiveEntries;
const findById = (id) => {
    const diary = entries_1.default.find(diary => diary.id = id);
    return diary;
};
exports.findById = findById;
