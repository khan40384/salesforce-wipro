public with sharing class FileUploadService {
    @AuraEnabled(cacheable=true)
    public static Id saveTheChunkFile(String parentId, String fileName, String base64Data, String contentType, String fileId){
        System.debug(parentId+' '+fileName+' '+base64Data+' '+contentType+' '+fileId);
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
        
        if(String.isBlank(fileId)){
            fileId = saveFiles(parentId, fileName, base64Data);
        }
        else{
            appendToFile(fileId, base64Data);
        }
        return Id.valueOf(fileId);
    }

    @AuraEnabled(cacheable=true)
    public static Id saveFiles(String recordId, String fileName, String base64Data){
        ContentVersion ContentToInsert = new ContentVersion();
        ContentToInsert.Title = fileName;
        ContentToInsert.VersionData = EncodingUtil.base64Decode(base64Data);
        ContentToInsert.PathOnClient='/'+fileName;
        ContentToInsert.isMajorVersion = false;
        System.debug(ContentToInsert);
        insert ContentToInsert;
        
        ContentToInsert = [select Id, ContentDocumentId from ContentVersion WHERE Id = :ContentToInsert.Id ];
        ContentDocumentLink c1 = new ContentDocumentLink();
        c1.ContentDocumentId = ContentToInsert.ContentDocumentId;
        c1.LinkedEntityId = recordId;
        c1.ShareType = 'V';
        c1.Visibility = 'AllUsers';
        insert c1;
        Return ContentToInsert.Id;

    }

    @AuraEnabled
    public static void appendToFile(Id contentDocumentId, String base64Data){
        ContentVersion versionData = [
            SELECT Id, VersionData, contentDocumentId
            FROM ContentVersion
            WHERE Id = :contentDocumentId
        ];
        String existingBody = EncodingUtil.base64Encode(versionData.VersionData);
        versionData.VersionData = EncodingUtil.base64Decode(existingBody+base64Data);
        update versionData;
    }
}
