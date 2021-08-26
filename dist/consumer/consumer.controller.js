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
exports.ConsumerController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let ConsumerController = class ConsumerController {
    constructor(clientKafka) {
        this.clientKafka = clientKafka;
    }
    onModuleInit() {
        this.clientKafka.subscribeToResponseOf('valida-contato');
    }
    consumir(msg) {
        console.log(`Iniciando a leitura do topico através de um microserviço::::>`);
        console.log('mensagem recebida::');
        console.log('------------------------------------------------');
        console.log(msg);
        console.log('------------------------------------------------');
        const resultado = this.clientKafka.send('valida-contato', JSON.stringify({ email: msg.value.email })).subscribe((reply) => { console.log(reply); });
    }
};
__decorate([
    microservices_1.MessagePattern('contatos'),
    __param(0, microservices_1.Payload()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConsumerController.prototype, "consumir", null);
ConsumerController = __decorate([
    common_1.Controller(),
    __param(0, common_1.Inject('KAFKA_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka])
], ConsumerController);
exports.ConsumerController = ConsumerController;
//# sourceMappingURL=consumer.controller.js.map