"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.connectMicroservice({
        transport: microservices_1.Transport.KAFKA,
        options: {
            client: {
                brokers: ['host.docker.internal:9094'],
            },
            consumer: {
                groupId: 'my-consumer-' + Math.random(),
            },
        },
    });
    await app.startAllMicroservicesAsync();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map