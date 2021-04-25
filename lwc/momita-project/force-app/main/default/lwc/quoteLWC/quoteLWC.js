import { LightningElement,api,track } from 'lwc';
import fetchCases from '@salesforce/apex/GetQuotes.fetchCases';
import { NavigationMixin } from 'lightning/navigation';
const columns = [
    { 
        label: 'Quote Number', fieldName: 'Quote_Number__c', type:'url', hideDefaultActions:'true',fixedWidth:'true',
        typeAttributes: {
            label: { 
                fieldName: 'Quote_Number__c' 
            },
            target : '_blank'
        }
    },
    { 
        label: 'Created Date', fieldName: 'Created Date',type:'date', wrapText: true, hideDefaultActions:'true',fixedWidth:'true',
        
        typeAttributes: {
            label: { 
                fieldName: 'Created Date' 
            },
            target : '_blank'
        }
    },
    { label: 'Line of Business', fieldName: 'Line_of_Business__c' ,hideDefaultActions:'true',fixedWidth:'true',
    typeAttributes: {
        label: { 
            fieldName: 'Line_of_Business__c' 
        },
        target : '_blank'
    }
    },
    { 
        label: 'Premium', fieldName: 'Total_Quote_Premium__c', wrapText: true,hideDefaultActions:'true',fixedWidth:'true',
        
        typeAttributes: {
            label: { 
                fieldName: 'Total_Quote_Premium__c' 
            },
            target : '_blank'
        } 
    },
    
];

export default class QuoteLWC extends LightningElement {

    @api recordId;
    @track error;

    columnsList = columns;
    
    connectedCallback(){
        this.getAllCaseDetails();
    }

    getAllCaseDetails(){
        fetchCases({accountId : this.recordId})
            .then(data => {
                /* Iterate with Each record and check if the Case is Associated with Account or Contact
                    then get the Name and display into datatable
                */
                /* Prepare the Org Host */
                let baseUrl = 'https://'+location.host+'/';
                data.forEach(caseRec => {
                    caseRec.Quote_Number__c = baseUrl+caseRec.AccountId.Id;
                    if(caseRec.AccountId.Id){
                       
                        /* Prepare Contact Detail Page Url */
                        caseRec.AccountUrl = baseUrl+caseRec.AccountId.Id;
                    }
                
                });
                this.result = data;
                window.console.log(' data ', data);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                window.console.log(' error ', error);
                this.result = undefined;
            });
    }
    
    handleRowAction(){
        
    }
    navigateToAccountPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Account',
                actionName: 'view'
            }
        });
    handleClick()
    {
        
    }
}
}