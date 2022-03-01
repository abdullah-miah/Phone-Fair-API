// fetch search input
const searchphone = ()=>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value ='';
    if(searchText ==''){
      document.getElementById('valid-number').style.display='block';
      
    }else{
      const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
      fetch(url)
      .then(res => res.json())
      .then(data =>displaysearchResult(data.data));
    }
    
    
    // console.log(searchText);    
};
const displaysearchResult = phones =>{
   const searchResult = document.getElementById('search-result');
  //  clear display data
  searchResult.textContent ='';
  if(phones.length == 0){
    document.getElementById('no-result').style.display='block';
  }
   phones.slice(0,20).forEach(phone => {
       const div = document.createElement('div');
       div.classList.add('col');
       div.innerHTML=`
       <div class="card">
       <img src="${phone.image}" class="card-img-top w-75 mx-auto p-3" alt="...">
       <div class="card-body">
         <h5 class="card-title text-center">Model:  ${phone.phone_name}</h5>
         <p class="card-text text-center">Brand:    ${phone.brand}</p>
         <div class=" w-25 mx-auto">
         <button onclick="loadPhoneDetails('${phone.slug}')" class="btn  px-4 btn-primary">Details</button>
       </div>
       </div>
     </div>
       `;
       searchResult.appendChild(div);
   });
};
const loadPhoneDetails = phoneId =>{
    // console.log(phoneId);
    const url =` https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data.data));
};
const displayPhoneDetail = phone=>{
    const phoneDetails = document.getElementById('phone-details');
  //  old phone details remove
    phoneDetails.textContent ='';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML=`
    <img src="${phone.image}" class="card-img-top w-50 mx-auto py-3" alt="...">
    <div class="card-body">
      <h2 class="card-title text-center">Model:  ${phone.name}</h2>
      <h3 class ="text-center"> Brand: ${phone.brand}</h3>
      <h5 class ="text-center"> Release Date: ${phone.releaseDate}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item text-center">Memory:   ${phone.mainFeatures.memory} </li>
      <li class="list-group-item text-center">Chipset:  ${phone.mainFeatures.chipSet} </li>
      <li class="list-group-item text-center">Sensors:  
      ${phone.mainFeatures.sensors[0]}, 
      ${phone.mainFeatures.sensors[1]},
      ${phone.mainFeatures.sensors[2]}
      ${phone.mainFeatures.sensors[3]}
      </li>
      <li class="list-group-item text-center">Others :${phone.others.WLAN}</li>
    </ul>
    <div class="card-body w-25 mx-auto">
    <button type="button" class="btn btn-success">Buy Now</button>

    </div>
    `;
    phoneDetails.appendChild(div);
}