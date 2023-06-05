let myLeads = []
let oldLeads = []
const inputEl = document.getElementById("input-el") 
const inputbtn = document.getElementById('input-btn')
const deletebtn = document.getElementById('delete-btn')
const ulEl = document.getElementById('ul-el')
const tabBtn = document.getElementById('tab-btn')
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow:true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads" , JSON.stringify(myLeads))
        render(myLeads)
    })
})



function render(leads){
    
    let listitems = ""
    for (let i = 0; i < leads.length; i++){
        //listitems += "<li> <a target ='_blank' href ='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        listitems += `
        <li> 
            <a target ='_blank' href = '${leads[i]}'>
                ${leads[i]}
            </a>   
        </li>
        `
    }
    ulEl.innerHTML = listitems 
}
inputbtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = " " // to clear the input field after clicking save button
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
})
deletebtn.addEventListener("click", function (){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
