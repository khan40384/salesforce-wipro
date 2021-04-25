// import { LightningElement, api, track } from 'lwc';
// import saveTheChunkFile from '@salesforce/apex/FileUploadService.saveTheChunkFile';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent'
// const MAX_FILE_SIZE = 4500000 ;
// const CHUNK_SIZE = 750000;      

// export default class MyComponent6 extends LightningElement {
//     @api recordId;
//     @track fileName;
//     filesUploaded = [];
//     isLoading = false;
//     fileSize;

//     handleFilesChange(event){
//         console.log(event.target.files);
//         if(event.target.files.length>0){
//             this.filesUploaded = event.target.files;
//             this.fileName = event.target.files[0].name;
//         }
//         console.log(this.fileName);
//     }

//     saveFile(){
//         let fileCon = this.filesUploaded[0];
//         this.fileSize = this.formatBytes(fileCon.size, 2);
//         console.log(fileCon.size>MAX_FILE_SIZE);
//         if(fileCon.size>MAX_FILE_SIZE){
//             let message = 'File size cannot exceed '+MAX_FILE_SIZE+'bytes.\n'+'Selected file size : '
//             +fileCon.size;
//             this.dispatchEvent(new ShowToastEvent({
//                 title: 'Error',
//                 message: message,
//                 variant: 'error'
//             }));
//             return;
//         }
//         let reader = new FileReader();
//         let self = this;
//         reader.onload = function(){
//             let fileContents = reader.result;
//             let base64Mark = 'base64,';
//             let dataStart = fileContents.indexOf(base64Mark)+base64Mark.length;
//             fileContents =  fileContents.substring(dataStart);
//             self.upload(fileCon, fileContents);
//         };
//         reader.readAsDataURL(fileCon);
//     }

//     upload(file, fileContents){
//         console.log("in upload");
//         let fromPos = 0;
//         //let toPos = Math.min(fileContents.length, fromPos+CHUNK_SIZE);
//         let toPos = fileContents.length;
//         this.uploadChunk(file, fileContents, fromPos, toPos, '');
//     }

//     uploadChunk(file, fileContents, fromPos, toPos, attachId){
//         this.isLoading = true;
//         let chunk = fileContents.substring(fromPos, toPos);
//         console.log(this.recordId+" "+file.name+" "+file.type+" "+attachId);
//         saveTheChunkFile({
//             parentId: '$recordId',
//             fileName: file.name,
//             base64Data: encodeURIComponent(chunk),
//             contentType: file.type,
//             fileId: attachId
//         })
//         .then(result=>{
//             console.log("in result "+result);
//             attachId = result;
//             fromPos = toPos;
//             //toPos = Math.min(fileContents.length, fromPos+CHUNK_SIZE);
//             if(fromPos<toPos){
//                 this.uploadChunk(file, fileContents, fromPos, toPos, attachId);
//             }
//             else{
//                 this.dispatchEvent(new ShowToastEvent({
//                     title: 'Success!',
//                     message: 'FileUploadSuccess',
//                     variant: 'success'
//                 }));
//                 this.isLoading = false;
//             }
//         })
//         .catch(error=>{
//             console.log("in error "+JSON.stringify(error));
//         })
//     }

//     formatBytes(bytes, decimals){
//         if(bytes==0) return '0 Bytes';
//         let k = 1024;
//         let dm = decimals||2;
//         let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
//         let i = Math.floor(Math.log(bytes)/Math.log(k));
//         return parseFloat((bytes/Math.pow(k, i)).toFixed(dm))+' '+sizes[i];

//     }
// }

import { LightningElement, api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class FileUploadLWC extends LightningElement {
    @api recordId;
    get acceptedFormats() {
        return ['.pdf', '.png','.jpg','.jpeg'];
    }
    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        let uploadedFileNames = '';
        for(let i = 0; i < uploadedFiles.length; i++) {
            uploadedFileNames += uploadedFiles[i].name + ', ';
        }
        this.dispatchEvent(
            new ShowToastEvent({
               title: 'Success',
                message: uploadedFiles.length + ' Files uploaded Successfully: ' + uploadedFileNames,
                variant: 'success',
            }),
        );
    }
}