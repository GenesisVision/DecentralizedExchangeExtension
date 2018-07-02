var authToken = null;
var programId = null;



chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details)
    {
        var headers = details.requestHeaders;
        if(authToken != null && details.method == "POST")
        {          
            headers.push({ name:"authorization" , value: authToken });
            headers.push({ name:"programId" , value: programId });
            console.log(headers);
        }
        return { requestHeaders : headers };
    },
    {urls: [web3NodeHost]},
    ['blocking','requestHeaders']
);


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.sender) {
            case "authPage":
                sendResponse(authRoute(request, request.method));
            break;
            case "programsPage":
                sendResponse(programsRoute(request, request.method));
            break;
            case "investmentProgram":
                sendResponse(investmentProgram(request, request.method));
            break;
        }
    }
);
function investmentProgram(request, method){
    switch (method) {
        case "getProgram":
            return getProgram(request.id);
        break;
        case "isExistProgramId":
            console.log(programId != null);
            return programId != null;
        break;
        case "getProgramId":
            return programId;
        break;
    }
}
function authRoute(request, method){
    switch (method) {
        case "signIn":
            return signIn(request.email,request.password);
        break;
        case "isAuth":
            console.log(authToken != null);
            return authToken != null;
        break;
    }
}

function programsRoute(request, method){
    switch (method) {
        case "getPrograms":
            return getInvestmentPrograms();
        break;
    }
}

function getProgram(id){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", gvpHost + "/api/manager/investmentProgram?investmentProgramId="+id , false);
    xhr.setRequestHeader('authorization', authToken);
    xhr.send();
    if(xhr.status == 200){ programId = id;  }
    return xhr.responseText;
}

function getInvestmentPrograms(){
    var request = {}
    request.type = "All";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", gvpHost + "/api/manager/dashboard/programs" , false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('authorization', authToken);
    xhr.send(JSON.stringify((request)));
    return xhr.responseText;
}


function signIn(email,password){
    var login = {
        email : email,
        password : password,
    };
    var xhr = new XMLHttpRequest();
    xhr.open("POST", gvpHost + '/api/manager/auth/signIn', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify((login)))
    authToken = xhr.responseText;
    if(authToken != null && xhr.status == 200){
        authToken = "Bearer " + authToken;
        return true;
    }else { return false;}
}

function signOut(){
    authToken = null;
}