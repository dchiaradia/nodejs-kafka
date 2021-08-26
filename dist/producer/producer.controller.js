"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProducerController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let ProducerController = class ProducerController {
    constructor(clientKafka) {
        this.clientKafka = clientKafka;
        console.log(clientKafka);
    }
    async onModuleInit() {
        this.kafkaProducer = await this.clientKafka.connect();
    }
    async produzir() {
        console.log(`Iniciando PRODUCER METODO GET:::>`);
        console.log(`Kafka > Topic: contatos > Iniciando envio de Dados`);
        const resultado = await this.kafkaProducer.send({
            topic: 'contatos',
            messages: [
                { key: Math.random() + "", value: JSON.stringify({
                        pedido: Math.random(),
                        cliente: 'Eduardo Pinheiro',
                        email: 'eduardo.pinheiro@radixeng.com.br'
                    }),
                }
            ]
        });
        return resultado;
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProducerController.prototype, "produzir", null);
ProducerController = __decorate([
    common_1.Controller('producer'),
    __param(0, common_1.Inject('KAFKA_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka])
], ProducerController);
exports.ProducerController = ProducerController;
//# sourceMappingURL=producer.controller.js.map