// public with sharing class SendMail {
//     @AuraEnabled(cacheable=true)
//     public static String Send() {
//         Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage(); 
//         Account acc = [select related_email__c, (select email from contacts) from Account where name='SRK' limit 1];
//         String addresses = acc.related_email__c;
            
 
//                 String[] toAddresses = addresses.split(',');
                
//                 email.setSubject( 'Sending from lwc' );
//                 email.setToAddresses( toAddresses );
//                 email.setPlainTextBody( 'hii All!!!' );
                
//                 Messaging.SendEmailResult [] r = 
//                 Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});  
//                 String result= '';
//         		if (r[0].success) {
//                     System.debug('The email was sent successfully.');
//                     result = 'The email was sent successfully.';
//                 }
//                 else{
//                     System.debug('The email failed to send: ' + r[0].errors[0].message);
//                     result = 'The email failed to send: ' + r[0].errors[0].message;
//                 }
//         return result;
//     }
// }

public with sharing class SendMail {
    @AuraEnabled(cacheable=true)
    public static String Send(String accid) {
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage(); 
        System.debug(accid);
        Account acc = [select Id,related_email__c, (select email from contacts) from Account where Id=:accid];
        System.debug(acc);
        String addresses = acc.related_email__c;
            
        String theTemplate = [SELECT Id FROM EmailTemplate WHERE name = 'template1'].Id;
        System.debug(theTemplate);
                String[] toAddresses = addresses.split(',');
                String[] arr= new List<String>();
                String str='';
                if(toAddresses.size()>0){
                    str = toAddresses[0];
                }
                for(Integer i=1; i<toAddresses.size(); i++){
                    str = str+';'+toAddresses[i];
                }
                arr.add(str);
                email.setTemplateID(theTemplate);
                email.setSubject( 'Sending from lwc' );
                email.setToAddresses( toAddresses  );
                email.setPlainTextBody( 'hii All!!!' );
                
                Messaging.SendEmailResult [] r = 
                Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});  
                String result= '';
        		if (r[0].success) {
                    System.debug('The email was sent successfully.');
                    result = 'The email was sent successfully.';
                }
                else{
                    System.debug('The email failed to send: ' + r[0].errors[0].message);
                    result = 'The email failed to send: ' + r[0].errors[0].message;
                }
        return result;
    }
}
