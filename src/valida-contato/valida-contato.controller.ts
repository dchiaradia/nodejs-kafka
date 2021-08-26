import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

/**
 * Essa é a classe que irá gerar uma resposta, gravando uma msg em um outro topico
 */

@Controller() //neste controller não vamos colocar nenhuma URI, pois não será acionada como rota
export class ValidaContatoController {

 
    @MessagePattern('valida-contato') //faço a leitura do topico/canal valida-contato
    consume(@Payload() msg){
        console.log(`Iniciando validacao do contato`);
        console.log(`email recebido: ${msg.value.email}`);
        //retorno a mensagem de ADD
        return { 
            status:'validado',
            email: msg.value.email
        }
    }


}
