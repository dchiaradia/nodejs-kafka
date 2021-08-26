import { OnModuleInit } from '@nestjs/common';
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';


/*
Essa é a classe produtora de dados no Kafka que utilizamos em nosso exemplo
Para produzir os dados, deveremos acionar via navegador ou via post o acesso na URL
do nosso controler, neste caso /producer
*/


@Controller('producer') //producer seria a URL por exemplo http://localhost:3000/producer
export class ProducerController implements OnModuleInit{ //implemento a classe ModuloInit


    private kafkaProducer: Producer; //variavel que deverá conectar no Kafka

    //no construtor da classe injeto o serviço que criamos
    constructor(
        @Inject('KAFKA_SERVICE')  
        private clientKafka: ClientKafka
        ){
            console.log(clientKafka);
    }

    async onModuleInit() {
        this.kafkaProducer = await this.clientKafka.connect(); //Faço a conexão no kafka
    }

    @Get() //uso metodo Get
    async produzir() {
        
        console.log(`Iniciando PRODUCER METODO GET:::>`);
        console.log(`Kafka > Topic: contatos > Iniciando envio de Dados`);

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
