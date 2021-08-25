import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('consumer')
export class ConsumerController  implements OnModuleInit{ //implemento a classe OnModuleInit
    
    //injeto no construtor o micro serviço no construtor da classe
    constructor(@Inject('KAFKA_SERVICE') private clientKafka: ClientKafka,){

    }

    onModuleInit() {
        //na inicializacao chamo o microserviço e informo que o topico valida-contato deverá ter uma resposta
        this.clientKafka.subscribeToResponseOf('valida-contato');
    }

    @MessagePattern('contatos') //informo qual topico/canal vou ler
    consume(@Payload() msg){
        console.log(msg); //mostro a msg lida do canal

        //envio para o canal/topico valida-contato a situacao da leitura
        const resultado =  this.clientKafka.send('valida-contato', JSON.stringify({key: Math.random(), status: 'ok'})).subscribe(reply => console.log(reply));
        console.log(resultado);
    }

}
