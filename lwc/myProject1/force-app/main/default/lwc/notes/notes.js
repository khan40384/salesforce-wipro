import { LightningElement, api, track, wire } from 'lwc';
//import getNotes from '@salesforce/apex/NoteWizardController.getNotes';
import { refreshApex } from '@salesforce/apex';
import ICONS from "@salesforce/resourceUrl/NotesComponentIcons";
import { NavigationMixin,CurrentPageReference } from 'lightning/navigation';
//import { fireEvent, registerListener, unregisterAllListeners } from 'c/pubsub';
export default class Notes extends NavigationMixin(LightningElement) {

  @api
  recordId;

  // invisible, open, or closed
  @track
  editorStatus = 'invisible';

  @track notes;

  notesCount = 0;

  error;

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

  @track
  selectedNote = { Id: '', Title: '', TextPreview: '', Content: '', CreatedByName: '', CreatedDate: '', CreatedByURL: '' }

  convertedNote;

  noteIcon = ICONS + "/NotesComponentIcons/Note_Icon.png";

  connectedCallback() {
    this.retrieveNotes();
    registerListener('refreshNote', this.handleEvent, this);
  }

  retrieveNotes() {
    
  }

  handleNoteClicked(event) {
    let noteId = event.target.dataset.id;
    this.selectedNote = this.notes.find(n => {
      return n.Id == noteId;
    });
    this.editorStatus = 'opened';
    this.template.querySelector("c-note-taker").editorStatus = 'opened';    
  }
  
  handleViewAllClicked(){
    window.open(this.viewAllLink,'_self');
  }

  /*handleNavigateViewAll(){
    this[NavigationMixin.Navigate]({
        "type": "standard__component",
        "attributes": {
            "componentName": "c__navigateToNotesRelatedListLWC"
        },
        state: {
          c__recordId: this.recordId,
          c__acrId: this.acrId
      }
    });
  }*/

  //Added workaround for LWC navigation to make it work in Mobile App
//   handleNavigateViewAll(){
//     var targetLWCDetails = {
//       componentDef: "c:notesRelatedListComponent",
//         attributes: {
//             recordId: this.recordId,
//             acrId: this.acrId
//         }
//     };
//     // Base64 encode the compDefinition JS object
//     var encodedtargetLWCDetails = btoa(JSON.stringify(targetLWCDetails));
//     this[NavigationMixin.Navigate]({
//         type: 'standard__webPage',
//         attributes: {
//             url: '/one/one.app#' + encodedtargetLWCDetails
//         }
//     });
//   }

  handleNewNote(event) {
    this.selectedNote = { Id: '', Title: '', TextPreview: '', Content: '', CreatedByName: '', CreatedDate: '', CreatedByURL: '' }
    this.editorStatus = 'opened';    
    let noteTaker = this.template.querySelector("c-note-taker");       
    noteTaker.noteContent = '';  
    noteTaker.noteId = '';
    noteTaker.noteTitle = '';
    noteTaker.noteCreatedName = '';
    noteTaker.noteCreatedDate = '';
    noteTaker.noteCreatedUrl = '';
    noteTaker.editorStatus = 'opened';  
  }

  get notesExist() {
    return this.notesCount != 0;
  }

  handleEvent(messageFromEvt){
    this.defineAttributes(messageFromEvt);
  }

  defineAttributes(noteList){
        this.notes = noteList;

          if (this.notes.length != 0) {
            this.viewAllLink = this.notes[0].AllNotesLink;
          }

          if (this.notes.length == 0) {
            this.notesCount = 0;
          } else if (this.notes[0].Count <= 3) {
            this.notesCount = this.notes[0].Count;
          } else {
            this.notesCount = '3+';
          }
  }
}