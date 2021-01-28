import { LightningElement , wire} from 'lwc';
import GetAllAccounts from '@salesforce/apex/GetAccounts.GetAllAccounts';
import { NavigationMixin } from 'lightning/navigation';
import { deleteRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';

export default class MyComponent1 extends LightningElement {
    accounts=[];
    IdValues={};
    @wire(GetAllAccounts) wiredAccounts({ error, data }) {
        if (data) {
            console.log(data);
            this.accounts = data;
        } else if (error) {
            console.log(error);
        }
    }
    handleChange(event){
        console.log(event.target.checked);
        let checked = event.target.checked;
        
            console.log(event.target.getAttribute("id"));
            let id=event.target.getAttribute('id');
            console.log(id);
            // //this.showButtons[id] = event.target.checked;
            let buttons = this.template.querySelectorAll("lightning-button");
            buttons.forEach(function(element){
                console.log(element.name+" "+id.substring(0, 18));
                if(element.name==id.substring(0, 18) && element.label=="Edit"){
                    checked===true?element.style.display = 'block':element.style.display = 'none';
                }
                if(element.name==id.substring(0, 18) && element.label=="Delete"){
                    checked===true?element.style.display = 'block':element.style.display = 'none';
                }
            })
            //  this.querySelector(`lightning-button[delete-id=${id}]`).style.display = 'flex';
            //document.querySelector(`lightning-button[data-my-id="${name}"]`).style.display = 'block';
    }


    navigateToAccountPage(event) {
        console.log(event.target.value);
        let id = event.target.value;
        //this.accounts.forEach(acc=>{
        //    console.log(acc.Id +" "+event.target.name);
        //    if(acc.Id==event.target.name){
                console.log("works");
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: id,
                        objectApiName: 'Account',
                        actionName: 'view'
                    }
                });
         //   }
       // })
        
    }
    deleteAccountRecord(event){
        console.log(event.target.name);
        let id = event.target.name;
       // this.accounts.forEach(acc=>{
            //if(acc.Id==event.target.name){
                deleteRecord(id)
                .then(() => {
                    return refreshApex(this.accounts);
                })
                .catch((error) => {
                    this.error=error;
                    console.log('unable to delete the record due to'+JSON.stringify(this.error));
                });
           // }
       // });
    }
    
}

