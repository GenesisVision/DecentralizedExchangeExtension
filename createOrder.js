$("#amount").on('keyup',function(){
    var price = $("#price").val();
    var amount = $("#amount").val();
    $("#total").html(price*amount);
})
$("#price").on('keyup',function(){
    var price = $("#price").val();
    var amount = $("#amount").val();
    $("#total").html(price*amount);
})

$('#target').submit(function (eventObject) {
    event.preventDefault();
    var data = $( this ).serialize();
    var params = data.split("&");
    var dictionary = {};
    for (var i = 0; i < params.length; i++) {
        var key = params[i].substring(0,params[i].indexOf("="));
        dictionary[key]=params[i].substring(params[i].indexOf("=")+1,params[i].length);
    }
    var request = {
        sender:"createOrder",
        data:{
            actType: dictionary["actType"],
            type: dictionary["type"],
            price: dictionary["price"],
            amount: dictionary["amount"],
            total: dictionary["total"],
            currency: dictionary["currency"]
        }
    }
    chrome.runtime.sendMessage(request, function (response) {
        alert(response);
    });
});  

function init() {
        chrome.tabs.getSelected(null, function(tab) {
        if(tab.url.includes("https://idex.market/eth/")){

        }
        var currency = tab.url.replace("https://idex.market/eth/","");
        $('select option[value='+currency+'').attr("selected",true);
    });
};
window.onload = init;
