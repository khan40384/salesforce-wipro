import { LightningElement } from 'lwc';
import pubsub from 'c/pubSub';


export default class PubSubPublisher extends LightningElement {
    handleClick(){
        let message={
            "message" : 'Hello PubSub'
        }
        pubsub.fire('simplevt', message);

    }
}