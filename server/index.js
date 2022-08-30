"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
// @ts-ignore
const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
    console.log('Start on port 8080.');
});
const users = [
    { id: 1, name: 'User1', email: 'user1@test.local' },
    { id: 2, name: 'User2', email: 'user2@test.local' },
    { id: 3, name: 'User3', email: 'user3@test.local' },
];
//一覧取得
app.get('/users', (req, res) => {
    res.send(JSON.stringify(users));
});
