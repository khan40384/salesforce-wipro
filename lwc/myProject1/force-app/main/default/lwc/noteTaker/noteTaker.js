import { LightningElement, track, api, wire } from 'lwc';
//import saveNote from '@salesforce/apex/NoteTakerController.saveNote';
//import deleteNote from '@salesforce/apex/NoteTakerController.deleteNote';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ICONS from "@salesforce/resourceUrl/NotesComponentIcons";
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent, registerListener, unregisterAllListeners } from 'c/pubsub';

export default class NoteTaker extends LightningElement {

  @api
  noteId;

  @api
  noteTitle;

  @api
  noteContent;

  @api
  noteCreatedName;

  @api
  noteCreatedDate;

  @api
  noteCreatedUrl

  @api
  recordId;

  noteEdited = false;

  acrId=null;
  currentPageReference = null;

  @wire(CurrentPageReference) pageRef;

  @wire(CurrentPageReference)
  getStateParameters(pageRef) {
      if (pageRef) {
        if(pageRef.state.c__acrId !== undefined){
          this.acrId = pageRef.state.c__acrId;
        }
      }
  }


  notebookIcon = ICONS + "/NotesComponentIcons/Notebook_Icon.png";
  minimizeIcon = ICONS + "/NotesComponentIcons/Minimize_Icon.png";
  exitIcon = ICONS + "/NotesComponentIcons/Exit_Icon.png";




  formats = ['bold', 'italic', 'underline', 'strike',
    'list', 'indent'];

  _editorStatus;

  @api
  get editorStatus() {
    return this._editorStatus;
  }

  set editorStatus(val) {
    this._editorStatus = val;
    if (val == 'opened' || val == 'closed') {
      this.toggleEditor();
    }
  }

  handleTitleChange(event) {
    this.noteEdited = true;
    this.noteTitle = event.target.value;
  }

  toggleMinimizeModal(event) {
    if (this._editorStatus == 'opened') {
      this.editorStatus = 'closed';
    } else if (this._editorStatus == 'closed') {
      this.editorStatus = 'opened';
    }
    this.toggleEditor();
    event.stopPropagation();
  }

  toggleEditor() {
    let composer = this.template.querySelector('.slds-docked-composer')

    if (this._editorStatus == 'closed') {
      composer.classList.add('closing');
      setTimeout(this.animateEditor.bind(this), 1000);
    }
    if (this._editorStatus == 'opened') {
      this.animateEditor();
    }
  }

  animateEditor() {
    let node = this.template.querySelector('.slds-docked-composer');

    if (!node) {
      return null;
    }

    if (this._editorStatus == 'closed') {
      node.classList.add('slds-is-closed');
      node.classList.remove('slds-is-open');
      node.classList.remove('closing');
    }
    if (this._editorStatus == 'opened') {
      node.classList.remove('slds-transition-hide');
      node.classList.remove('slds-is-closed');
      node.classList.add('slds-transition-show');
      node.classList.add('slds-is-open');
    }
    if (this._editorStatus == 'invisible') {
      node.classList.add('slds-transition-hide');
      node.classList.remove('slds-transition-show');
      node.classList.remove('slds-is-closed');
      node.classList.remove('slds-is-open');
    }

  }

  exitEditor() {
    this.editorStatus = 'invisible';
    this.animateEditor();
  }

  handleExit(event) {
    if (this.noteEdited) {
      if (confirm('Your note contains unsaved changes. Are you sure?')) {
        this.template.querySelector('.notes-rich-text-editor').value = '';
        this.noteEdited = false;
        this.exitEditor();
      }
    } else {       
        this.exitEditor();
    }
    event.stopPropagation();
  }

  handleSave(event) {
   
    this.noteContent = this.template.querySelector('.notes-rich-text-editor').value;
    console.log('noteContent value : ',this.noteContent);
    let buttonId = event.target.dataset.id;
    if(this.noteContent){
    // saveNote({ noteId: this.noteIdToSend, recordId: this.recordId, noteTitle: this.noteTitleToSend, noteContent: this.noteContentToSend, acrId: this.acrId })
    //   .then(result => {
    //     fireEvent(this.pageRef,'refreshNote', result );

    //     const selectedEvent = new CustomEvent("refresh");
    //     this.dispatchEvent(selectedEvent);

    //     this.dispatchEvent(
    //       new ShowToastEvent({
    //         title: 'Saved!',
    //         message: 'Your Note was successfully saved.',
    //         variant: 'success'
    //       }));

    //     if (buttonId == 'saveAndCloseButton') {
          
    //       this.noteEdited = false;
    //       this.exitEditor();
    //     }
    //   })
    //   .catch(error => {
    //     this.error = error;
    //     console.log('There was an error: ' + this.error);
    //     this.dispatchEvent(
    //       new ShowToastEvent({
    //         title: 'Error!',
    //         message: this.error.body.message,
    //         variant: 'error'
    //       }));
    //   });
   }else{
    this.dispatchEvent(
      new ShowToastEvent({
        title: 'Error!',
        message: 'Can not save empty note',
        variant: 'Error'
      }));
   }
  }

  handleDelete(event) {
    console.log('noteIdToSend value : ',this.noteIdToSend);
    if(this.noteIdToSend == null){
      this.template.querySelector('.notes-rich-text-editor').value = '';
      this.noteEdited = false;
      this.exitEditor();
    }
    if(this.noteIdToSend){
    // deleteNote({ noteId: this.noteIdToSend, recordId: this.recordId,acrId: this.acrId })
    //   .then(result => {
    //     this.dispatchEvent(
    //       new ShowToastEvent({
    //         title: 'Success',
    //         message: 'Your Note was successfully deleted.',
    //         variant: 'success'
    //       }));

    //     this.exitEditor();
    //     fireEvent(this.pageRef,'refreshNote', result );
    //     //this.dispatchEvent(new CustomEvent('refresh'));
    //   })
    //   .catch(error => {
    //     this.error = error;
    //     console.log('There was an error: ' + this.error);
    //     this.dispatchEvent(
    //       new ShowToastEvent({
    //         title: 'Error!',
    //         message: this.error.body.message,
    //         variant: 'error'
    //       }));
    //   });
    }
  }

  renderedCallback() {
    this.adjustRichText();
  }

  adjustRichText() {
    let element = this.template.querySelector('lightning-input-rich-text');

    if (!element) {
      setTimeout(() => {
        this.adjustRichText()
      }, 100);

      return;
    }

    const style = document.createElement('style');
    style.innerText = '@media only screen and (min-width: 768px) {.ql-editor.slds-rich-text-area__content {min-height:17.4rem;}}';
    element.appendChild(style);
  }

  handleNoteEdited(event) {
    this.noteEdited = true;   
  }

  get noteIdToSend() {
    return this.noteId ? this.noteId : null;
  }
  

  get noteTitleToSend() {
    return this.noteTitle ? this.noteTitle : null;

  }

  get noteContentToSend() {
    return this.noteContent ? this.noteContent : null;
  }


}