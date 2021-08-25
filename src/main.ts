import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  //inicio a conexão com o Micro serviço
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['host.docker.internal:9094'],
      },
      consumer: {
        groupId: 'my-consumer-' + Math.random(),
      },
    },
  });
  
  
  //app.useGlobalFilters(new ModelNotFoundExceptionFilter());
  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
