import { LightningElement } from 'lwc';
import pubsub from 'c/pubSub';
export default class PubSubSubscriber extends LightningElement {
    message;
    connectedCallback(){
        console.log("connected");
        this.register();
    }

    register(){
        console.log("registering");
        pubsub.register('simplevt', this.handleEvent.bind(this));
    }
    handleEvent(messageFromEvt){
        console.log("received");
        this.message = messageFromEvt?JSON.stringify(messageFromEvt, null, '\t'):'no message payload';
    }
}