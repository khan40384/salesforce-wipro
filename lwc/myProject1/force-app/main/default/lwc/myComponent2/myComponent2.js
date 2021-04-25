import { LightningElement } from 'lwc';
import SendMail from '@salesforce/apex/SendMail.Send';

export default class MyComponent2 extends LightningElement {
    sendMail(){
        SendMail({accid: this.recordId})
        .then(result =>{
            alert(result);
        })
        .catch(error =>{
            alert(error);
        })
    }
}