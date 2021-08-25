import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('')
export class ValidaContatoController {

 
    @MessagePattern('valida-contato') //faço a leitura do topico/canal valida-contato
    consume(@Payload() msg){
        console.log(msg);
        //retorno a mensagem de ADD
        return { 
            status:'add'
        }
    }


}
