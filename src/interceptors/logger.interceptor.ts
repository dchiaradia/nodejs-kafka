//NESTE ARQUIVO VAMOS CONFIGURAR UM INTECEPTADOR, O PAPEL DELE SERÁ
//INTERCEPTAR UMA REQUISICAO E GERAR UM REGISTRO NO LOG DO WINSTON.
import { Injectable, Inject, NestInterceptor, CallHandler, ExecutionContext, } from '@nestjs/common';
import { Logger } from 'winston';
import { Observable } from 'rxjs';

@Injectable() //INFORMO QUE ESSA CLASSE PODE SER INJETADA EM OUTRA CLASSE
export class LoggerInterceptor implements NestInterceptor {

    //O CONSTRUTOR DESSA CLASSE INJETO O WINSTON
    constructor(@Inject('winston') private logger: Logger) {}
    
    //O METODO INTERCEPTADOR QUE IRÁ CAPTTURAR OS DADOS E GERAR O LOG
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
            this.log(context.switchToHttp().getRequest()); //QUANDO INTERCEPTAR GERO O LOG.
            return next.handle();
    }

    //AQUI É A GERAÇAO DO LOG
    private log(req) {
        const body = { ...req.body }; //CAPTURO TODOS OS DADOS DO CORPO DA MINHA REQUISIÇAO
        delete body.password; //CASO TENHO OS CAMPOS PASSWORD EU REMOVO PARA NÃO SALVAR A SENHA NO LOG
        delete body.passwordConfirmation; //A MESMA COISA FAÇO PARA CONFIRMACAO DE SENHA
        const user = (req as any).user; //PEGO O CAMPO USUARIO
        const UID = "12345678"; //aqui pego o UID do usuario

        //AGORA VOU GERAR O LOG DO TIPO DE INFORMAÇÃO, podendo ser error, debug entre outros.
        this.logger.info({
            timestamp: new Date().toISOString(), //INSIRO 
            method: req.method, //capturo o metodo enviado
            route: req.route.path, //capturo o caminho da rota enviada
            data: { //monto os dados conforme recebi acima, porém removendo os campos de senha
                body: body,
                query: req.query, //paramettros da url
                params: req.params,
            },
            from: req.ip, //IP da requisição
            madeBy: {uid:UID}, //aqui é quem fez a requisição
        });
    }
}