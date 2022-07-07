console.clear()
let inputText = document.querySelector('.input-text');
let btn_add = document.querySelector('.btn_add');
let deleteBtn = document.querySelector('.delete');
let deleteAll = document.querySelector('.deleteAll')
let list = document.querySelector('.list');
let list_num = document.querySelector('.list-num');
let tabs = document.querySelector('.tab');
let tabStatus = "all";
let data = [];

function init() {
    render(data);
}
init();
//1.新增待辦事項
btn_add.addEventListener('click',addItem);
function addItem(e){
  let temp = {
      inputText: inputText.value,
      id: new Date().getTime(),
      checked: ''
    }
  if(inputText.value == ""){
    alert("請輸入代辦事項");
  }else{
    data.push(temp);
    render(data);
    inputText.value = "";
  }
};
function render(data){
  let str = "";
  data.forEach( (item,i) => {
    str += `<li data-id="${item.id}" data-index="${i}">
          <label class="checkbox" for="">
            <input type="checkbox" ${item.checked}/>
            <span>${item.inputText}</span>
          </label>
          <a href="#" class="delete"></a>
        </li>`
  });
  list.innerHTML = str;
};
inputText.addEventListener("keyup", function (e) {
    //如果屬性的 key 值為 "Enter" 
    if (e.key === "Enter") {
    //符合條件就執行大括號內程式碼
       addItem();
    }
});
list.addEventListener('click',(e) => {
  const i = e.target.closest('li').dataset.index;
  const id = e.target.closest('li').dataset.id;
  if(e.target.getAttribute('class')==='delete'){
    e.preventDefault();
    if(confirm('Are you sure?')){
      data = data.filter(item => item.id != id);
    }
  }else if(e.target.getAttribute('type')==='checkbox'){
    data.forEach((item,index) =>{
      if(item.id == id){
        if(data[index].checked === ""){
            data[index].checked = "checked"
        }else{
            data[index].checked = ""
        }
      }
    })
  }else{
    return;
  }
  updateList();
});

tabs.addEventListener('click',(e) => {
  tabStatus = e.target.dataset.tab;
  const tab = document.querySelectorAll('.tab li');
  tab.forEach(item => {
    item.classList.remove('active');
  });
  e.target.classList.add('active');
  updateList();
});

function updateList(){
  let tabData = [];
  if(tabStatus === "all"){
    tabData = data;
  }else if(tabStatus === "onGoing"){
    tabData = data.filter(item => {
      return item.checked === ""
    });
  }else if(tabStatus === "done"){
    tabData = data.filter(item => {
      return item.checked === "checked"
    });
  }
  render(tabData);
  const len = tabData.length;
  list_num.textContent = `${len} 個待完成項目`;
}

deleteAll.addEventListener('click',(e)=>{
  e.preventDefault();
  if(confirm('Are you sure delete ALL projects?')){
    data = data.filter(item => item.checked === "");
  }
  updateList();
});
