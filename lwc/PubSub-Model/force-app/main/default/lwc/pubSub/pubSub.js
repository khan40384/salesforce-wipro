var callbacks = {};

const register = (eventName, callback)=>{
    console.log(eventName+" register");
    if(!callbacks[eventName]){
        callbacks[eventName] = new Set();
    }
    callbacks[eventName].add(callback);
}

const unregister = (eventName, callback)=>{
    if(callbacks[eventName]){
        callbacks[eventName].delete(callback);
    }
}

const unregisterAll = ()=>{
    callbacks = {};
}

const fire = (eventName, payload)=>{
    console.log(eventName);
    console.log(callbacks[eventName]);
    if(callbacks[eventName]){
        console.log("here 1")
        callbacks[eventName].forEach(callback => {
            try{
                console.log("here 2");
                callback(payload); 
            }
            catch(error){
                console.log(error);
            }
        });
    }
}

export default {
    register,
    unregister,
    unregisterAll,
    fire
};