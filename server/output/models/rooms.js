"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoomModel = (0, mongoose_1.model)('Room', new mongoose_1.Schema({
    roomName: String,
    roomId: String,
    messages: [new mongoose_1.Schema({
            user: String,
            message: String,
            // date: new Date()
        })]
}));
exports.default = RoomModel;
//# sourceMappingURL=rooms.js.map