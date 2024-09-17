let profileImg=document.querySelector(".img-profile")
console.log(profileImg.src)
let posts=document.querySelector(".posts")
let postImg=document.querySelector(".img-post")
//let userName=document.querySelector(".user-name")
let time=document.querySelector(".time")
let line=document.querySelector(".line")
let textPost=document.querySelector(".text-post")
let conter=document.querySelector(".conter")
let registerModel=document.querySelector("#register-model")
let showUsername=document.querySelector(".showusername")
let current=1
let last=1
window.addEventListener("scroll",function(){
    const end=window.innerHeight+window.pageYOffset>=document.body.scrollHeight;
    if(end && current<last){
        getpost(false,current+1)
        current=current+1
    }
})
function getpost(relod=true,page=1){
    togole(true)
axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=2&page=${page}`)
.then(function (response) {
    togole(false)
    // handle success
    last=response.data.meta.last_page
    let po=response.data.data
   if(relod){
    posts.innerHTML=""
   }
    for(x of po)
    { 
        let titlepost=""
        let user= data()
        let myuser=user !=null && x.author.id == user.id
        let postedit=``
    
        if(myuser){
            postedit=`<div> <button class="btn btn-secondary" style="float:right" onclick="editpost('${encodeURIComponent(JSON.stringify(x))}')">Edit</button>
            <button class="btn btn-danger" style="float:right"onclick="deletpost(${x.id})" >Delet</button></div>
            `
        }
        if(x.title !=null && x.title !="undefined")
        {
            titlepost=x.title
    
        }
        let bodypost=""
        if(x.body !=null && x.body !="undefined")
        {
            bodypost=x.body
    
        }
        let imagepost=""
        if(x.image !=null && x.image !=" ")
        {
            imagepost=x.image
    
        }
    
        console.log(x.tags)
      posts.innerHTML+=` <div class="post my-3" >
      <div class="card" >
                        <div class="card-header d-flex justify-content-between">
                        <div onclick="userprofile(${x.author.id})" class="d-flex" style="cursor:pointer">
                            <img src="${x.author.profile_image}" alt="" class="border border-2 img-profile " style="width: 44px;height: 44px; border-radius: 50%; ">
                            <b class="user-name">${x.author.username}</b>
                            </div>

                           ${postedit}
                        </div>
                        <div class="card-body" onclick="postclick(${x.id})">
                            <img src="${imagepost}" class="card-img-top img-post" alt="..." style="height: 30%;">

                            <h6 class="card-title text-secondary mt-1 time">${x.created_at}</h6>
                            <h5 class="line">${titlepost}</h5>
                            <p class="card-text text-post"> ${bodypost}</p>
                            <hr>
                            <div>
                                <i class="fa-solid fa-pen"></i>
                                <span>(<span class="conter">${x.comments_count}</span>) comments</span>
                            </div>
                        </div>
                    
                    </div>
                    </div>`
        
        


    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}
function userprofile(idpost){
    // let user=data()

    // alert(user.id)
    window.location=`profil.html?id=${idpost}`
}

 getpost()

 function loginbtn(){
    let pass=document.querySelector(".pass-input").value
    let userName=document.querySelector(".username-input").value
    let loginModel=document.querySelector("#login-model")
    togole(true)
    axios.post("https://tarmeezacademy.com/api/v1/login",
        {
            "username" : userName,
            "password" : pass
        })
     .then(function (response) {
        togole(false)
        console.log(response.data)
       let token=response.data.token
       localStorage.setItem("token",token)
       localStorage.setItem("user" ,JSON.stringify( response.data.user))
       console.log(token);
       var modal = bootstrap.Modal.getInstance(loginModel)
       modal.hide()
       maa()
    //    add()

       nav()

     })
     .catch(function (error) {
        togole(false)
       console.log(error);
       alert(error.message)
     })
  }

function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    nav()
    lo()
}

function nav(){
 let token=localStorage.getItem("token")
 let loginDiv=document.querySelector("#login-div") 
 let logoutDiv=document.querySelector("#logout-div")
 let namee=document.querySelector(".regname-input").value
 //let userName=document.querySelector(".username-input").value
// let regpass=document.querySelector(".regpass-input").value
// let reguserName=document.querySelector(".regusername-input").value 
let img=document.querySelector(".regimg-input").files[0]
let addPost=document.querySelector(".add-post") 

 if(token==null)
 {
    loginDiv.style.setProperty("display","flex","important")
    logoutDiv.style.setProperty('display', 'none', 'important');
    addPost.style.setProperty('display', 'none', 'important');

 }
 else{
    loginDiv.style.setProperty("display","none","important")
    logoutDiv.style.setProperty("display","flex","important")
    addPost.style.setProperty("display","flex","important")
    // addPost.innerHTML=` <div class="position-fixed d-flex justify-content-center" style=" border-radius:50%; width:  100px;height: 100px; background-color: blue; bottom: 20px; right:  30px;">
    // <i class="fa-solid fa-plus" style="font-size: 100px; color: aliceblue ; "></i>
    // </div>`
    let user=data()
    document.querySelector(".nav-name").innerHTML=user.username
    document.querySelector(".nav-img").src=user.profile_image
    // showUsername.innerHTML=`<div class="d-flex">
    // <img src="${img}" style="width: 30px;height: 30px; border-radius: 50%; "/>
    // <p>${namee}</p></div>`

 }
}

function alertmas(){
    let mag=document.querySelector("#alertmag")
    let logoutalert=document.querySelector("#alertlogout")
    let regmag=document.querySelector("#alertmagreg")
    mag.style.setProperty("display","none","important")
    logoutalert.style.setProperty("display","none","important")
    regmag.style.setProperty("display","none","important")
}

function registerbtn(){
    console.log("kbfxzser")
    

    let namee=document.querySelector(".regname-input").value
let regpass=document.querySelector(".regpass-input").value
let reguserName=document.querySelector(".regusername-input").value
let img=document.querySelector(".regimg-input").files[0]


let c={
    " Content-Type":"multipart/form-data",
   
   }
    let forData=new FormData
    forData.append("username",reguserName)
    forData.append("password",regpass)
    forData.append("name",namee)
    forData.append("image",img)

    togole(true)
    axios.post("https://tarmeezacademy.com/api/v1/register",
       forData,{
    
            headers:c
         })
     .then(function (response) {
        togole(false)
        console.log(response.data)
       let token=response.data.token
       localStorage.setItem("token",token)
       localStorage.setItem("user" ,JSON.stringify( response.data.user))
       console.log(token);
       var modal = bootstrap.Modal.getInstance(registerModel)
       modal.hide()
       ma()

       nav()
     })
     .catch(function (error) {
        togole(false)
       console.log(error);
       alert(error.message)
     })
}
function maa(){
    let mag=document.querySelector("#alertmag")

    mag.style.setProperty("display","flex","important")
    setTimeout(function(){
        var alert = bootstrap.Alert.getOrCreateInstance(mag)
        alert.close()
    },1000)
 
}
function ma(){
    let mag=document.querySelector("#alertmagreg")

    mag.style.setProperty("display","flex","important")
    setTimeout(function(){
        var alert = bootstrap.Alert.getOrCreateInstance(mag)
        alert.close()
    },1000)
 
}
function lo(){
    let mag=document.querySelector("#alertlogout")

    mag.style.setProperty("display","flex","important")
    setTimeout(function(){
        var alert = bootstrap.Alert.getOrCreateInstance(mag)
        alert.close()
    },1000)
}
function data(){
    let user=null
    let storgeuser=localStorage.getItem("user")
    if( storgeuser !=null){
        user=JSON.parse(storgeuser)
    }
    return user
}
function newPost(){
   let postid= document.querySelector(".post-id-input").value
   
    //let idedit=postid == null || postid ==""
  
   
   
    let token=localStorage.getItem("token")
    let title=document.querySelector(".title-post-input").value
    let body=document.querySelector("#body-input").value
    let img=document.querySelector(".img-post-input").files[0]
   // let loginModel=document.querySelector("#login-model")
   let c={
    " Content-Type":"multipart/form-data",
    "authorization":`Bearer ${token}`
   }
    let forData=new FormData
    forData.append("title",title)
    forData.append("body",body)
    forData.append("image",img)
    let url=``
    let mp=document.querySelector(".tre-id-input").value
  

    if(mp =="true"){
     //url=`https://tarmeezacademy.com/api/v1/posts`
     forData.append("_method","put")
     url=`https://tarmeezacademy.com/api/v1/posts/${postid}`
    
    
    
    }
    else{
url=`https://tarmeezacademy.com/api/v1/posts`
    }
   
    axios.post(`${url}`,
        forData,{
     
            headers:c
         })
      .then(function (response) 
      {
         console.log(response)
         let postmodel=document.querySelector("#post-model")
         var modal = bootstrap.Modal.getInstance(postmodel)
         modal.hide()
         getpost()
     
 
      })
      .catch(function (error) {
        console.log(error);
        alert(error.message)
       })
   
  }
  function postclick(idpost){
window.location=`post.html?id=${idpost}`
  }
 function profileclick(){
    let usere=data()
    let idpost=usere.id
    window.location=`profil.html?id=${idpost}`
 }
  function editpost(postedit){
    let post=JSON.parse(decodeURIComponent(postedit))
    console.log(post)
    document.querySelector("#title-post-creat").innerHTML="Eidt post"
    document.querySelector(".title-post-input").value=post.title
    document.querySelector("#body-input").value=post.body
    document.querySelector(".post-id-input").value=post.id
     document.querySelector("#btn-creat").innerHTML="Update"
     document.querySelector(".tre-id-input").value=true

    let mm=new bootstrap.Modal(document.querySelector("#post-model"),{})
    mm.toggle()
  }
  function deletpost(delet){
    
    
    
    let token=localStorage.getItem("token")
    let title=document.querySelector(".title-post-input").value
    let body=document.querySelector("#body-input").value
    let img=document.querySelector(".img-post-input").files[0]
   // let loginModel=document.querySelector("#login-model")
   let c={
    " Content-Type":"multipart/form-data",
    "authorization":`Bearer ${token}`
   }
    let forData=new FormData
    forData.append("title",title)
    forData.append("body",body)
    forData.append("image",img)
       forData.append("_method","delete")
        url=`https://tarmeezacademy.com/api/v1/posts/${delet}`
    axios.post(`${url}`,
        forData,{
     
            headers:c
         })
      .then(function (response) 
      {
         console.log(response)
        //  let postmodel=document.querySelector("#post-model")
        //  var modal = bootstrap.Modal.getInstance(postmodel)
        //  modal.hide()
         getpost()
     
 
      })
      .catch(function (error) {
        console.log(error);
        alert(error.message)
      })

  }
 function newmodel()
 {
   document.querySelector("#btn-creat").innerHTML="Create"
    document.querySelector("#title-post-creat").innerHTML="Creat new post"
    document.querySelector(".title-post-input").value=" "
    document.querySelector("#body-input").value=" "
    document.querySelector(".post-id-input").value= " "

    let mm=new bootstrap.Modal(document.querySelector("#post-model"),{})
    mm.toggle()

 }
 function togole(show=true){
if(show)
{
    document.querySelector(".load").style.visibility="visible"

}
else{
    document.querySelector(".load").style.visibility="hidden"

}
 }
nav()
alertmas()
