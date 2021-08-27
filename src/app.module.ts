import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducerController } from './producer/producer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConsumerController } from './consumer/consumer.controller';
import { ValidaContatoController } from './valida-contato/valida-contato.controller';
import { WinstonModule } from 'nest-winston'; //importo a biblioteca do winston
import { winstonConfig } from './configs/winston.config'; //importo as configurações do winston
import { LoggerInterceptor } from './interceptors/logger.interceptor'; //importo meu interceptador
import { APP_INTERCEPTOR } from '@nestjs/core';

 


@Module({
  imports: [

    //aqui inicializo o modulo do Winston, com as configurações do arquivo de texto.
    WinstonModule.forRoot(winstonConfig),

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
  providers: [AppService, 
    {
      provide: APP_INTERCEPTOR, //aqui adiciono um provedor que será provido de um interceptador
      useClass: LoggerInterceptor, //que este interceptador será a nossa classe LoggerInterceptor
    },
  ],
  
})
export class AppModule {}
