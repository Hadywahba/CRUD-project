//global variables
var productName=document.getElementById("productName");
var productPrice=document.getElementById("productPrice");
var productCategory=document.getElementById("productCategory");
var productdescription=document.getElementById("productdescription");
var productImage=document.getElementById("productImage");
var productList=[];
var btnUpdate=document.getElementById("btnUpdate");
var btnAdd=document.getElementById("btnAdd");
var newIndex;
var regex={
  productName: {
    value:/^[A-Z][a-z0-9]{4,7}$/,
    status: false
  },
  productPrice: {
    value:/^([1-9][0-9]|100)$/,
    status: false
  },
  productdescription: {
    value:/[\w\d]{10,}$/,
    status: false
  },
  productCategory: {
    value:/(TV|Mobile|Laptop|Tab)/i,
    status: false
  }
}
if(localStorage.getItem("productList" ) != null ){
  productList = JSON.parse(localStorage.getItem("productList"));
  displayProduct(productList);
}



//starting code

// add product
function addProduct(){

    var Product={
           name : productName.value ,
           price: productPrice.value,
           Category:productCategory.value,
           desc: productdescription.value,
           image:`image/${productImage.files[0].name}`,
    }
    productList.push(Product);
    addLocalStorage()
    displayProduct(productList);
    updateInputsValue()
    btnAdd.disabled=true;
 
}
// display product
function displayProduct(list){
var cartona=``;
for(var i=0 ; i<list.length ; i++){
    cartona+=`
     <div class="col-md-4">
          <div class="border border-danger border-4 rounded rounded-4 overflow-hidden mb-5 ">
          <img src="${list[i].image}" class="w-100" alt="">
          <div class="px-4 text-white pt-4">
            <h2 class="bg-info  text-center">information</h2>
            <h1 class="h3 mt-3">Name : ${list[i].newName ?list[i].newName : list[i].name } </h1>
            <h3>price : ${list[i].price} </h3>
            <h3>Category : ${list[i].Category}</h3>
            <h3>desc : ${list[i].desc}</h3>
            <button onclick="getProductToUpdate(${i})" class="btn btn-danger w-100 mb-4">Update</button>
            <button onclick="deleteProduct(${i})" class="btn btn-warning w-100 mb-4">Delete</button>
          </div>
          </div>
        </div>
    `
}
document.getElementById("myData").innerHTML=cartona;
}

// delete product
function deleteProduct(index){
  productList.splice(index,1);
  displayProduct(productList);
  addLocalStorage()
}
//updateInputsValue
function updateInputsValue(data){
  productName.value= data ? data.name :'';
  productPrice.value= data ? data.price :'';
  productdescription.value= data ? data.desc :'';
  productCategory.value= data ? data.Category :'';
}

// getProductToUpdate
function getProductToUpdate(index){
updateInputsValue(productList[index]);
newIndex=index;
btnAdd.classList.add("d-none");
btnUpdate.classList.remove("d-none");
}
// UpdateProduct
function UpdateProduct(){
productList[newIndex].name=productName.value;
productList[newIndex].price=productPrice.value;
productList[newIndex].desc=productdescription.value;
productList[newIndex].Category=productCategory.value;
btnUpdate.classList.add("d-none");
btnAdd.classList.remove("d-none");
displayProduct(productList);
addLocalStorage()
updateInputsValue()
}
// search product
function search(searchValue){
  console.log(searchValue);
  var searchGroup=[];
for( var i=0 ; i<productList.length ; i++){
  item=productList[i];
if(item.name.toLowerCase().includes(searchValue.toLowerCase())  ){
  searchGroup.push(item)
  item.newName=item.name.toLowerCase().replace(searchValue,`<span class="text-warning fs-2  fw-bold">${searchValue}</span>`);
  console.log(item.newName);
}
}
displayProduct(searchGroup);
}
//clean code
function addLocalStorage(){
  localStorage.setItem("productList",JSON.stringify(productList));
}
// validation
function validation(element){
  if (regex[element.id].value.test(element.value)){
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
    regex[element.id].status=true;
  }
  else{
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.nextElementSibling.classList.remove("d-none");
  }
  toggleButton();
  
}
// status of button
function toggleButton(){
  if(regex.productName.status && regex.productPrice.status && regex.productdescription.status && regex.productCategory.status ){
    btnAdd.disabled=false;
  }
  else{
    btnAdd.disabled=true;
  }
}

