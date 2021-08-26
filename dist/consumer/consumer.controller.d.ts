import { OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
export declare class ConsumerController implements OnModuleInit {
    private clientKafka;
    constructor(clientKafka: ClientKafka);
    onModuleInit(): void;
    consumir(msg: any): void;
}
