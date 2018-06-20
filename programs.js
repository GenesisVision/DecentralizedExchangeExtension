function init() {
    var request = {
        sender : "programsPage",
        method : "getPrograms"
    };
    chrome.runtime.sendMessage(request, function (response) { 
        var listHtml = "";
        response = JSON.parse(response);
        for(var i = 0;i<response.investmentPrograms.length;i++){
            if(response.investmentPrograms[i].isEnabled == false || response.investmentPrograms[i].isDecentralized == false) continue;
            listHtml += '<br><a href="/investmentProgram.html?id='+ response.investmentPrograms[i].id + '">' + response.investmentPrograms[i].title + "</a>";
        }
        $("#programsList").html(listHtml);
    })
}
window.onload = init;



