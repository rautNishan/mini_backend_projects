import { Module } from "@nestjs/common";
import { NodeMailerService } from "./services/node-mailer.service";

@Module({
    providers:[NodeMailerService]
})
export class NodeMailerModule{

}