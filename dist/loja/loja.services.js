"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LojaService = void 0;
class LojaService {
    constructor() {
        this.mensagens = [];
    }
    produzKafka(msg) {
        this.mensagens.push(msg);
        return msg;
    }
}
exports.LojaService = LojaService;
//# sourceMappingURL=loja.services.js.map