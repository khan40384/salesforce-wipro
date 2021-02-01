import { LightningElement, api , track} from 'lwc';
import GetContacts from '@salesforce/apex/GetAccounts.GetContacts';

const columns = [{
    label: 'Name',
    fieldName: 'Name',
    type: 'text',
    sortable: true
}
];
export default class MyComponent3 extends LightningElement {

    @api id;
    contacts=[];

    columns = columns;

    @track value;
    @track error;
    @api sortedDirection = 'asc';
    @api sortedBy = 'Name';
    @api searchKey = '';
    result;
    
    
    flag = false;
    @track page = 1; 
    @track data = [];
    @track startingRecord = 1;
    @track endingRecord = 0; 
    @track pageSize = 2; 
    @track totalRecountCount = 0;
    @track totalPage = 0;


    renderedCallback() {
        console.log('Hello this is in render');
        console.log(this.id.substring(0, this.id.length-4));
        if(this.flag===false){
        GetContacts({AccId: this.id.substring(0, this.id.length-4)})
        .then(data=>{
            this.contacts = data;
            console.log(data);
            console.log(this.contacts);
            this.totalRecountCount = this.contacts.length; 
            this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize); 
            
            this.data = this.contacts.slice(0,this.pageSize); 
            this.endingRecord = this.pageSize;
            this.error = undefined;
            this.flag=true;
            let buttons = this.template.querySelectorAll("lightning-button");
            buttons.forEach(function(element){
                console.log(element.label);
                if(element.label=="Previous"){
                   element.disabled = true;
                }
            })
        })
        .catch(error=>{
            console.log(error);
            this.error = error;
            this.data = undefined;
        })
        }
        }

        //clicking on previous button this method will be called
    previousHandler() {
        console.log(this.data);
        console.log(this.page);
        console.log(this.startingRecord);
        console.log(this.endingRecord);
        
        if (this.page > 1) {
            let buttons = this.template.querySelectorAll("lightning-button");
            buttons.forEach(function(element){
                console.log(element.label);
                if(element.label=="Next"){
                   element.disabled = false;
                }
            })
            this.page = this.page - 1; //decrease page by 1
            this.displayRecordPerPage(this.page);
        }
        else{
            let buttons = this.template.querySelectorAll("lightning-button");
            buttons.forEach(function(element){
                console.log(element.label);
                if(element.label=="Previous"){
                   element.disabled = true;
                }
            })
        }   
    }

    //clicking on next button this method will be called
    nextHandler() {
        console.log(this.data);
        console.log(this.page);
        console.log(this.startingRecord);
        console.log(this.endingRecord);
        if((this.page<this.totalPage) && this.page !== this.totalPage){
            let buttons = this.template.querySelectorAll("lightning-button");
            buttons.forEach(function(element){
                console.log(element.label);
                if(element.label=="Previous"){
                   element.disabled = false;
                }
            })
            this.page = this.page + 1; //increase page by 1
            this.displayRecordPerPage(this.page);            
        }
        else{
            let buttons = this.template.querySelectorAll("lightning-button");
            buttons.forEach(function(element){
                console.log(element.label);
                if(element.label=="Next"){
                   element.disabled = true;
                }
            })
        }             
    }

    //this method displays records page by page
    displayRecordPerPage(page){

        this.startingRecord = ((page -1) * this.pageSize) ;
        this.endingRecord = (this.pageSize * page);

        this.endingRecord = (this.endingRecord > this.totalRecountCount) 
                            ? this.totalRecountCount : this.endingRecord; 

        this.data = this.contacts.slice(this.startingRecord, this.endingRecord);

        this.startingRecord = this.startingRecord + 1;
    }    

    }