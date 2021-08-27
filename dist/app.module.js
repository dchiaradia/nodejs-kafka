"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const producer_controller_1 = require("./producer/producer.controller");
const microservices_1 = require("@nestjs/microservices");
const consumer_controller_1 = require("./consumer/consumer.controller");
const valida_contato_controller_1 = require("./valida-contato/valida-contato.controller");
const nest_winston_1 = require("nest-winston");
const winston_config_1 = require("./configs/winston.config");
const logger_interceptor_1 = require("./interceptors/logger.interceptor");
const core_1 = require("@nestjs/core");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            nest_winston_1.WinstonModule.forRoot(winston_config_1.winstonConfig),
            microservices_1.ClientsModule.register([
                {
                    name: 'KAFKA_SERVICE',
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            brokers: ['host.docker.internal:9094'],
                        },
                        consumer: {
                            groupId: 'my-consumer-' + Math.random(),
                        },
                    },
                },
            ]),
        ],
        controllers: [app_controller_1.AppController, producer_controller_1.ProducerController, consumer_controller_1.ConsumerController, valida_contato_controller_1.ValidaContatoController],
        providers: [app_service_1.AppService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logger_interceptor_1.LoggerInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map