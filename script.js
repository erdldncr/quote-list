
let personName=document.getElementById('person')
let quote=document.getElementById('quote')
let unorderedList= document.getElementById('itemList')
let addButton=document.getElementById('add')
let id;
let items;
//// displayItems
getItems()

////add item to list
addButton.addEventListener('click',()=>{
    addItems(id,personName.value,quote.value)
    items.push({'id':id,'personName':personName.value,'quote':quote.value})
    localStorage.setItem('items',JSON.stringify(items))
  
    personName.value=''
    quote.value=''
    id++;
})
///delete item from list
document.addEventListener('click',removeItem)
document.addEventListener('keydown',(e)=>{
   if(e.key=='Enter'){
    addItems(id,personName.value,quote.value)
    items.push({'id':id,'personName':personName.value,'quote':quote.value})
    localStorage.setItem('items',JSON.stringify(items))
  
    personName.value=''
    quote.value=''
    id++;
   }
})


function removeItem(event){
    if(event.target.classList.contains('fa-trash'))
    {
    let itemId=event.target.parentElement.querySelector('span').innerHTML
    itemId=itemId.slice(0,itemId.length-1)
    items=JSON.parse(localStorage.getItem('items'))
  
    items.forEach((item,index)=>{
        if(item['id']==itemId){
            items.splice(index,1)
        }
    })
    items.forEach((item,index)=>{
        if(Number(item['id'])>Number(itemId)){ 
       
            item['id']=Number(item['id'])-1;
        }
    })
   

    console.log(items)
    localStorage.setItem('items',JSON.stringify(items))

    event.target.parentElement.remove()
    unorderedList.innerHTML=''
    id=1
        getItems()
    
    }
}

function addItems(id,personName,quote){
    let unorderedList= document.getElementById('itemList')
    const li=document.createElement('li')
    li.innerHTML=`<span> ${id}.</span> <q>${quote}</q> ${personName} <i class="fas fa-trash"></i>`
    unorderedList.appendChild(li)
    
}
function getItems(){
    if(localStorage.getItem('items')===null){
        items=[]
        id=1
    }else{
        items=JSON.parse(localStorage.getItem('items'))
        items.forEach(item => {
           addItems(item['id'],item['personName'],item['quote']) 
        });
        if(items.length==0){
            id=1
        }else{
            id=items.length+1
        }
            
    }
}