import { OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
export declare class ProducerController implements OnModuleInit {
    private clientKafka;
    private kafkaProducer;
    constructor(clientKafka: ClientKafka);
    onModuleInit(): Promise<void>;
    produzir(): Promise<import("@nestjs/microservices/external/kafka.interface").RecordMetadata[]>;
}
