import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

/*
Essa é a classe que irá consumir os dados no Kafka que vamos utilizar em nosso exemplo.
Para o consumo dos dados, criamos uma micro serviço no main.ts.
Qualquer ruido gerado no topico que setamos no @MessagePattern ele irá processar a informação
conforme a regra de negocio que colocarmos aqui.
*/


@Controller() //neste controller não vamos colocar nenhuma URI, pois não será acionada como rota
export class ConsumerController  implements OnModuleInit{ //implemento a classe OnModuleInit
    
    //injeto no construtor o micro serviço no construtor da classe
    constructor(@Inject('KAFKA_SERVICE') private clientKafka: ClientKafka,){

    }

    onModuleInit() {
        //quando carregar informo que o cliente Kafka deverá gerar uma resposta
        //para um outro topico após a leitura.
        this.clientKafka.subscribeToResponseOf('valida-contato');
    }

    @MessagePattern('contatos') //informo qual topico/canal vou ler
    consumir(@Payload() msg){
        console.log(`Iniciando a leitura do topico através de um microserviço::::>`);
        console.log('mensagem recebida::');
        console.log('------------------------------------------------');
        console.log(msg); //mostro a msg lida do canal
        console.log('------------------------------------------------');


        //envio para o canal/topico valida-contato a situacao da leitura
        const resultado =  this.clientKafka.send('valida-contato', 
            JSON.stringify({email: msg.value.email})
        ).subscribe((reply)=>{ console.log(reply)});
        //console.log(resultado);
    }

}
