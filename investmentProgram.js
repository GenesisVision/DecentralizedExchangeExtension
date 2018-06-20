function init() {
    var params = window
    .location
    .search
    .replace('?','')
    .split('&')
    .reduce(
        function(p,e){
            var a = e.split('=');
            p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        },
        {}
    );
    $("#app").html(params['id']);
    if(params['id'] != undefined){
        getProgram(params['id']);
    }else
    {
        var request = {
            sender : "investmentProgram",
            method : "getProgramId"
        };
        chrome.runtime.sendMessage(request, function (response) {
            getProgram(response);
        });
    }
    
};
window.onload = init;

function getProgram(id){
    var request = {
        sender : "investmentProgram",
        method : "getProgram",
        id : id
    };
    chrome.runtime.sendMessage(request, function (response) {
        response = JSON.parse(response);
        $("#title").html(response.investmentProgram.title);
        $("#description").html(response.investmentProgram.description);
    });
}