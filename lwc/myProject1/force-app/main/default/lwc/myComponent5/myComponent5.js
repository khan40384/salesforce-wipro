import { LightningElement,track } from 'lwc';
import sendMailMethod from '@salesforce/apex/SendMail.SendMailMethod';
export default class ModalPopupLWC extends LightningElement {
    //Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded 
    @track isModalOpen = false;
    @track mailStatus = false;
    email;
    cc;
    subject;
    body;
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        console.log("close "+this.isModalOpen);
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }

    closeMessage(){
        this.mailStatus = false;
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        //this.isModalOpen = false;
        console.log("hii"+" "+this.email);
        console.log(this.email);
        console.log(this.cc);
        console.log(this.body);
        console.log(this.subject);
        sendMailMethod(this.email, this.subject, this.body, this.cc)
        .then(result =>{
            console.log(result);
            this.mailStatus = true;
        })
        .catch(error =>{
            this.mailStatus = true;
            console.log(error.body.message);
            alert(JSON.stringify(error.body.message));
        })
    }

    onEmailChange(event){
        this.email = event.target.value;
    }
    onSubjectChange(event){
        this.subject = event.target.value;
    }
    onBodyChange(event){
        this.body = event.target.value;
    }
    onCcChange(event){
        this.cc = event.target.value;
    }
}