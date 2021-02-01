public with sharing class GetAccounts {
    @AuraEnabled(cacheable=true)
    public static List<Account> GetAllAccounts() {
        return [SELECT Id, Name, Type, Rating,
                Phone, Website, AnnualRevenue, (select Name from Contacts)
            FROM Account];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> GetContacts(String AccId) {
        return [SELECT Name FROM Contact WHERE AccountId = :AccId];
    }
}