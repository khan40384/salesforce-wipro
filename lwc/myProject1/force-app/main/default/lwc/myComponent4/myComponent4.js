import { LightningElement, wire, api } from 'lwc';
import getContacts from '@salesforce/apex/getTableDataException.getContacts';
import getAccounts from '@salesforce/apex/getTableDataException.getAccounts';
import getOpportunities from '@salesforce/apex/getTableDataException.getOpportunities';
import { refreshApex } from '@salesforce/apex';
import updateContacts from '@salesforce/apex/getTableDataException.updateContacts';
import updateAccounts from '@salesforce/apex/getTableDataException.updateAccounts';
import updateOpportunities from '@salesforce/apex/getTableDataException.updateOpportunities';
import { getRecordNotifyChange } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


const COLS1 = [
    { label: 'First Name', fieldName: 'FirstName', editable: true },
    { label: 'Last Name', fieldName: 'LastName', editable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' }
];
const COLS2 = [
    { label: 'Name', fieldName: 'Name', editable: true },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue' },
    { label: 'Description', fieldName: 'Description', editable: true },
    { label: 'Postal code', fieldName: 'postal_code__c', editable: true }
];
const COLS3 = [
    { label: 'Name', fieldName: 'Name', editable: true },
    { label: 'Amount', fieldName: 'Amount', type: 'currency', typeAttributes: { currencyCode: 'EUR', step: '0.001'}, editable: true },
    { label: 'Close Date', fieldName: 'CloseDate' },
    { label: 'Description', fieldName: 'Description', editable: true }
];
export default class DatatableUpdateExample extends LightningElement {

    @api recordId;
    conColumns = COLS1;
    accColumns = COLS2;
    oppColumns = COLS3;
    draftValues = [];

    @wire(getContacts) contacts;
    @wire(getAccounts) accounts;
    @wire(getOpportunities) opportunities;

    async handleSaveContacts(event) {
        const updatedFields = event.detail.draftValues;
        
        // Prepare the record IDs for getRecordNotifyChange()
        const notifyChangeIds = updatedFields.map(row => { return { "recordId": row.Id } });
    
       // Pass edited fields to the updateContacts Apex controller
        await updateContacts({data: updatedFields})
        .then(result => {
            console.log(JSON.stringify("Apex update result: "+ result));
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact updated',
                    variant: 'success'
                })
            );
    
        // Refresh LDS cache and wires
        getRecordNotifyChange(notifyChangeIds);
    
        // Display fresh data in the datatable
        refreshApex(this.contacts).then(() => {
            // Clear all draft values in the datatable
            this.draftValues = [];
          });
    
        
       }).catch(error => {
           this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating or refreshing records',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }
    
    async handleSaveAccounts(event) {
        console.log(event.detail.draftValues);
        const updatedFields = event.detail.draftValues;
        console.log(updatedFields);
        // Prepare the record IDs for getRecordNotifyChange()
        const notifyChangeIds = updatedFields.map(row => { return { "recordId": row.Id } });
    
       // Pass edited fields to the updateContacts Apex controller
        await updateAccounts({data: updatedFields})
        .then(result => {
            console.log(JSON.stringify("Apex update result: "+ result));
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Accounts updated',
                    variant: 'success'
                })
            );
    
        // Refresh LDS cache and wires
        getRecordNotifyChange(notifyChangeIds);
    
        // Display fresh data in the datatable
        refreshApex(this.accounts).then(() => {
            // Clear all draft values in the datatable
            this.draftValues = [];
          });
    
        
       }).catch(error => {
           this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating or refreshing records',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }

    async handleSaveOpportunities(event) {
        const updatedFields = event.detail.draftValues;
        
        // Prepare the record IDs for getRecordNotifyChange()
        const notifyChangeIds = updatedFields.map(row => { return { "recordId": row.Id } });
    
       // Pass edited fields to the updateContacts Apex controller
        await updateOpportunities({data: updatedFields})
        .then(result => {
            console.log(JSON.stringify("Apex update result: "+ result));
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Opportunities updated',
                        variant: 'success'
                    })
                );
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Opportunities updated',
                    variant: 'success'
                })
            );
    
        // Refresh LDS cache and wires
        getRecordNotifyChange(notifyChangeIds);
    
        // Display fresh data in the datatable
        refreshApex(this.opportunities).then(() => {
            // Clear all draft values in the datatable
            this.draftValues = [];
          });
    
        
       }).catch(error => {
           this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating or refreshing records',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }


}