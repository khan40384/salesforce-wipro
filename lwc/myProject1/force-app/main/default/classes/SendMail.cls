public with sharing class SendMail {
    @AuraEnabled(cacheable=true)
    public static String Send() {
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage(); 
        Account acc = [select related_email__c, (select email from contacts) from Account where name='SRK' limit 1];
        String addresses = acc.related_email__c;
            
 
                String[] toAddresses = addresses.split(',');
                
                email.setSubject( 'Sending from lwc' );
                email.setToAddresses( toAddresses );
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
