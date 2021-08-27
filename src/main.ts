import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

//IMPORTO O MODULO DE LOGGER
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config';


async function bootstrap() {
  //CRIO UM MODULO DO WINSTON LOGGER UTILIZANDO A CONFIGURAÇÃO DO ARQUIVO WINSTON.CONFIG.TS
  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, { cors: true, logger });

  //inicio a conexão com o Micro serviço
  //este micro serviço ele fica ouvindo tudo que é transportado(envio/recebido) no Kafka
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['host.docker.internal:9094'], //o broker é o IP e porta do servidor
      },
      consumer: {
        groupId: 'my-consumer-' + Math.random(), //O grupo de consumidores que irão ler a msg no topico
      },
    },
  });
  
  
  //app.useGlobalFilters(new ModelNotFoundExceptionFilter());
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
