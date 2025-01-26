import { DynamicModule, ForwardReference, Module, Provider, Type } from "@nestjs/common";
import { IMailOptions } from "./interfaces/mail.interface";
import { ConfigModule } from "@nestjs/config";
import { NodeMailerModule } from "./node-mailer/node-mailer.module";
import { NodeMailerService } from "./node-mailer/services/node-mailer.service";

@Module({})
export class MailModule{
   public static forRoot(mailOption:IMailOptions):DynamicModule{
       const providers:Provider<any>[]=[];
       const imports: (
        | DynamicModule
        | Type<any>
        | Promise<DynamicModule>
        | ForwardReference<any>
      )[] = [];
    imports.push(ConfigModule);
    if(mailOption.nodeMailer){
        imports.push(NodeMailerModule)
        providers.push(NodeMailerService)
       }
    return {
        module:MailModule,
        providers:[...providers],
        exports: [...providers],
        controllers: [],
        imports: [...imports],
    }
   }
}