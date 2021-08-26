import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducerController } from './producer/producer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConsumerController } from './consumer/consumer.controller';
import { ValidaContatoController } from './valida-contato/valida-contato.controller';


@Module({
  imports: [
    
    //importante registrar o modulo do KAFKA apontando para o broker e colocando um nome para o serviço
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
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
  controllers: [AppController, ProducerController, ConsumerController, ValidaContatoController],
  providers: [AppService],
  
})
export class AppModule {}
