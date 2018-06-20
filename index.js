function init() {
    var request = {
        sender : "authPage",
        method : "isAuth"
    };
    chrome.runtime.sendMessage(request, function (response) {
        if(response == true){ 
            request = {
                sender : "investmentProgram",
                method : "isExistProgramId"
            };
            chrome.runtime.sendMessage(request, function (response2) {
                if(response2 == true){{ $(location).attr('href',"/investmentProgram.html"); } }
                else { $(location).attr('href',"/programs.html"); }
            });
        }
    });
}
window.onload = init;


$('#btnSignIn').bind('click', function(){
    var login = {
        email : $("#login").val(),
        password : $("#password").val(),
        sender : "authPage",
        method : "signIn"
    };
    chrome.runtime.sendMessage(login, function (response) {
        if(response == true){ $(location).attr('href',"/programs.html"); }
    })
});

