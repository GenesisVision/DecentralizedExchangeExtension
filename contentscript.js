const web3Js = chrome.extension.getURL('web3.js/dist/web3.min.js')
const myScript = chrome.extension.getURL('webinterceptor.js')

$.get(web3Js, 
function(data) {

    // inject in-page script
    var scriptTag = document.createElement('script')
    scriptTag.textContent =  data;
    scriptTag.onload = function () { this.parentNode.removeChild(this) }
    $.get(myScript, 
      function(data2) {
        scriptTag.textContent+=data2;
        
        var container = document.documentElement;
        // append as first child
        container.insertBefore(scriptTag, container.children[0])
      });
}
);

function checkOrderData(){
  document.getElementById('verification-data-wrapper').getAttribute('data-clipboard-text')
}