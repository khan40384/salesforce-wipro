import { LightningElement, api } from 'lwc';
import SendMail from '@salesforce/apex/SendMail.Send';

export default class MyComponent2 extends LightningElement {
    @api recordId;
    sendMail(){
        console.log(this.recordId);
        SendMail({accid: this.recordId})
        .then(result =>{
            alert(result);
        })
        .catch(error =>{
            alert(JSON.stringify(error));
        })
    }
}