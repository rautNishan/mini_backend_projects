import { Injectable } from "@nestjs/common";
import {createTransport, Transporter} from 'nodemailer'
import SMTPTransport from "nodemailer/lib/smtp-transport";
import * as PDFDocument from 'pdfkit';

@Injectable()
export class NodeMailerService{
    private _mailTransproter: Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>;
    constructor(){
        this._mailTransproter =createTransport(
            {
                service: 'gmail',
                host:'smtp.gmail.com',
                secure:false,
                auth: {
                   
                }
            }
        )
    }

    async sendMail(){
        try{
        console.log('Sending mail....');
        let mailDetails = {
          
            subject: 'Test mail',
            text: 'Node.js testing'
        };
        const pdf:Buffer= await this.getPdf('');
        mailDetails['attachments']=[
            {
                filename: `test.pdf`,
                content: pdf,
                encoding: 'utf-8',
              },
        ]
        this._mailTransproter
        .sendMail(mailDetails,
            function (err, data) {
                if (err) {
                    console.log('This is error: ', err);
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent successfully');
                }
            });
        }catch(error){
            console.log('This is error: ',error);
            
        }
    }

    
    async getPdf(name: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            try {
                const doc = new PDFDocument();
                const chunks: Buffer[] = [];

                doc.on('data', (chunk) => chunks.push(chunk));
                doc.on('end', () => resolve(Buffer.concat(chunks)));

                doc.fontSize(16).font('Helvetica-Bold').text(`Hello, ${name}!`);
                doc.fontSize(12).font('Helvetica').text('Welcome to our service.');
                doc.fontSize(10).font('Helvetica-Oblique')
                   .text(`Generated on: ${new Date().toLocaleString()}`);

                doc.end();
            } catch (error) {
                reject(new Error(`PDF creation failed: ${error.message}`));
            }
        });
    }
}