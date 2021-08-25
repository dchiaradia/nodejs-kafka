import { OnModuleInit } from '@nestjs/common';
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { Client } from '@nestjs/microservices/external/nats-client.interface';

@Controller('producer') //producer seria a URI
export class ProducerController implements OnModuleInit{ //implemento a classe ModuloInit


    private kafkaProducer: Producer; //crio a variavel kafkaProducer to tipo Produce

    //no construtor da classe injeto o serviço que criamos
    constructor(
        @Inject('KAFKA_SERVICE')  
        private clientKafka: ClientKafka
        ){
            console.log(clientKafka);
    }

    async onModuleInit() {
        this.kafkaProducer = await this.clientKafka.connect(); //conecto no micro serviço
    }

    @Get() //uso metodo Get
    async produzir(){
        
        //faço o comando para adicionar dentro de um topico/canal alguns dados.
        const resultado = await this.kafkaProducer.send({
            topic:'contatos',
            messages:  [
                {key: Math.random()+ "", value: JSON.stringify({
                    pedido: Math.random(), 
                    cliente: 'Eduardo Pinheiro', 
                    email: 'eduardo.pinheiro@radixeng.com.br'}),
                }
            ]
        });


        return resultado;
    }

}
