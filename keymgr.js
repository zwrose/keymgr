var request = require('request');

// config vars
// BasePaths should *NOT* include a trailing '/'
var stServerBasePath = "http://st.zwrose.com"
var bridgeBasePath = "http://node-playground-161360.nitrousapp.com:3000";
var bridgeID = 1;

function handleKeys() {
    request({
        'uri': bridgeBasePath + "/api/homeKeys" + bridgeID,
        'method': 'GET',
        'json': true
    }, function (error, response, body) {
        if (error) {
            console.log("Error:", error)
        } else {
            keyStack = body.keyStack;
            if(keyStack.length > 0) {
                request({
                    'uri': stServerBasePath + keyStack[0],
                    'method': 'GET',
                    'json': true
                }, function (error, response, body) {
                    if (error) {
                        console.log("Error:", error)
                    } else {
                        var currentdate = new Date(); 
                        console.log("Called " + stServerBasePath + keyStack[0] + ". Sent: " + (currentdate.getMonth()+1)  + "/" 
                                    + currentdate.getDate() + "/"
                                    + currentdate.getFullYear() + " @ "  
                                    + currentdate.getHours() + ":"  
                                    + currentdate.getMinutes() + ":" 
                                    + currentdate.getSeconds());
                        keyStack.shift();
                        // TODO need to shift on the server, too
                        TODO
                        
                        
                        setTimeout(handleKeys, 1000);
                        
                    }
                });
                
            } else {
                var currentdate = new Date(); 
                console.log("No keys found. Checked: " + (currentdate.getMonth()+1)  + "/" 
                            + currentdate.getDate() + "/"
                            + currentdate.getFullYear() + " @ "  
                            + currentdate.getHours() + ":"  
                            + currentdate.getMinutes() + ":" 
                            + currentdate.getSeconds());
                setTimeout(handleKeys, 1000);
            }
        }
    });
}