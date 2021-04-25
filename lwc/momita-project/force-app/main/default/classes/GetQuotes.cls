public inherited sharing class GetQuotes {
    @AuraEnabled
     public static List<Opportunity> fetchCases(String accountId){
         return [SELECT AccountId,Id,LOB__c,Name,(SELECT Id,Name FROM Quotes__r) FROM Opportunity WHERE AccountId = :accountId LIMIT 3];
     }
 }