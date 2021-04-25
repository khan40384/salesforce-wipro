public with sharing class getTableData{

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [
            SELECT AccountId, Id, FirstName, LastName, Phone, Email
            FROM Contact
            WITH SECURITY_ENFORCED
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [
            SELECT Name , Id, Description, AnnualRevenue, postal_code__c
            FROM Account
            WITH SECURITY_ENFORCED
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities() {
        return [
            SELECT Name, Id, Amount, CloseDate, Description
            FROM Opportunity
            WITH SECURITY_ENFORCED
        ];
    }

    @AuraEnabled
    public static string updateContacts(Object data) {
    List<Contact> contactsForUpdate = (List<Contact>) JSON.deserialize(
         JSON.serialize(data),
         List<Contact>.class
    );
    try {
        update contactsForUpdate;
        return 'Success: contacts updated successfully';
    }
    catch (Exception e) {
        return '';
       // throw new getTableDataException('The following exception has occurred: ' + e);
    }}

    @AuraEnabled
    public static string updateAccounts(Object data) {
    List<Account> accountsForUpdate = (List<Account>) JSON.deserialize(
         JSON.serialize(data),
         List<Account>.class
    );
    try {
        update accountsForUpdate;
        return 'Success: accounts updated successfully';
    }
    catch (Exception e) {
        return '';
       // throw new getTableDataException('The following exception has occurred: ' + e);
    }}


    @AuraEnabled
    public static string updateOpportunities(Object data) {
    List<Opportunity> opportunitiesForUpdate = (List<Opportunity>) JSON.deserialize(
         JSON.serialize(data),
         List<Opportunity>.class
    );
    try {
        update opportunitiesForUpdate;
        return 'Success: opportunities updated successfully';
    }
    catch (Exception e) {
       // throw  new getTableDataException('The following exception has occurred: ' + e);
       return '';
    }}
}