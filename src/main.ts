import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

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
  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
