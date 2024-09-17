let profileImg=document.querySelector(".img-profile")
console.log(profileImg.src)
let posts=document.querySelector(".posts")
let postImg=document.querySelector(".img-post")
let time=document.querySelector(".time")
let line=document.querySelector(".line")
let textPost=document.querySelector(".text-post")
let conter=document.querySelector(".conter")
let registerModel=document.querySelector("#register-model")
let showUsername=document.querySelector(".showusername")
let current=1
function loginbtn(){
    let pass=document.querySelector(".pass-input").value
    let userName=document.querySelector(".username-input").value
    let loginModel=document.querySelector("#login-model")
    
    axios.post("https://tarmeezacademy.com/api/v1/login",
        {
            "username" : userName,
            "password" : pass
        })
     .then(function (response) {
        console.log(response.data)
       let token=response.data.token
       localStorage.setItem("token",token)
       localStorage.setItem("user" ,JSON.stringify( response.data.user))
       console.log(token);
       var modal = bootstrap.Modal.getInstance(loginModel)
       modal.hide()
       maa()
    //    add()
    getpost()
profile()
       nav()

     })
     .catch(function (error) {
       console.log(error);
       alert(error.message)
     })
  }

function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    nav()
    lo()
    getpost()
profile()

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

      
    axios.post("https://tarmeezacademy.com/api/v1/register",
       forData,{
    
            headers:c
         })
     .then(function (response) {
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

let par=new URLSearchParams(window.location.search)
let id=par.get("id")

console.log(id)

function profile(){
   
   //let r=id==null || id ==""

    axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`)
    .then(function (response) 
    {
       console.log(response.data)
       let user=response.data.data
       console.log(user.id)

     document.querySelector(".email-profile").innerHTML=user.email
     document.querySelector(".name-profile").innerHTML=user.name
     document.querySelector(".username-profile").innerHTML=user.username
     document.querySelector(".counterpost").innerHTML=user.posts_count
     document.querySelector(".contercomment").innerHTML=user.comments_count
     document.querySelector(".img-post").src=user.profile_image
   

    })
    .catch(function (error) {
      console.log(error);
      alert(error.message)
    })
}
function getpost(){
    axios.get(`https://tarmeezacademy.com/api/v1/users/${id}/posts`)
    .then(function (response) {
        // handle success
    
        let po=response.data.data
        posts.innerHTML=" "
        for(x of po)
        { 
              
            let titlepost=""
            let user= data()
            let myuser=user !=null && x.author.id == user.id
            let postedit=``
        
            if(myuser){
                postedit=` <button class="btn btn-secondary" style="float:right" onclick="editpost('${encodeURIComponent(JSON.stringify(x))}')">Edit</button>
                <button class="btn btn-danger" style="float:right"onclick="deletpost(${x.id})" >Delet</button>
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
                            <div class="card-header">
                                <img src="${x.author.profile_image}" alt="" class="border border-2 img-profile " style="width: 44px;height: 44px; border-radius: 50%; ">
                                <b class="user-name">${x.author.username}</b>
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
            profile()
     
          })
          .catch(function (error) {
            console.log(error);
            alert(error.message)
          })
    
      }
    function img(){
        let token=localStorage.getItem("token")
         if(token!=null)
         {
            console.log("arwa")
            let users=data()
            document.querySelector(".nv-name").innerHTML=users.username
            document.querySelector(".nv-img").src=users.profile_image
         }
         else{
            console.log("sara")
         }
       
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
       // let addPost=document.querySelector(".add-post") 
    //    let addcoment=document.querySelector(".addcoment")
        if(token==null)
        {
       
           loginDiv.style.setProperty("display","flex","important")
           logoutDiv.style.setProperty('display', 'none', 'important');
           // addPost.style.setProperty('display', 'none', 'important');
        //    addcoment.style.setProperty('display', 'none', 'important');
       
        }
        else{
           loginDiv.style.setProperty("display","none","important")
           logoutDiv.style.setProperty("display","flex","important")
           // addPost.style.setProperty("display","flex","important")
        //    addcoment.style.setProperty("display","flex","important")
          
        
         
       
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
    alertmas()
    img()
getpost()
profile()
nav()
function profileclick(){
    let usere=data()
    let idpost=usere.id
    window.location=`profil.html?id=${idpost}`
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

// function postone(relod=true){
//     if(relod){
//         document.querySelector(".post").innerHTML=""
//        }
//     axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
//     .then(function (response) {
//         // handle success
//       //  last=response.data.meta.last_page
//         let x=response.data.data
//         let comments=x.comments
//     //    if(relod){
//         document.querySelector(".post").innerHTML=""
//     //    }
       
//             let titlepost=""
//             if(x.title !=null && x.title !="undefined")
//             {
//                 titlepost=x.title
        
//             }
//             let bodypost=""
//             if(x.body !=null && x.body !="undefined")
//             {
//                 bodypost=x.body
        
//             }
//     //         let imagepost=""
//     //         if(x.image !=null && x.image !=" ")
//     //         {
//     //             imagepost=x.image
        
//     //         }
//         let com=``
//         for(co of comments){
//             com+=`   <div class="p-3" style="background-color: rgb(219, 222, 224);">
//                                 <div>
//                                     <img src="${co.author.profile_image}" alt="" style="width: 44px;height: 44px; border-radius: 50%;">
//                                     <b>${co.author.username}</b>
//                                 </div>
//                                 <div>
//                                     <p>${co.body}</p>
//                                 </div>
//                             </div>`
//         }
//             console.log(x.tags)
//             document.querySelector(".usershow").innerHTML=x.author.username
//           document.querySelector(".post").innerHTML+=` 
                
                
//                     <div class="card">
//                         <div class="card-header">
//                             <img src="${x.author.profile_image}" alt="" class="border border-2 img-profile " style="width: 44px;height: 44px; border-radius: 50%; ">
//                             <b class="user-name">${x.author.username}</b>
//                         </div>
//                         <div class="card-body">
//                             <img src="${x.image}" class="card-img-top img-post" alt="..." style="height: 30%;">

//                             <h6 class="card-title text-secondary mt-1 time">${x.created_at}</h6>
//                             <h5 class="line">${titlepost}</h5>
//                             <p class="card-text text-post">${bodypost}</p>
//                             <hr>
//                             <div>
//                                 <i class="fa-solid fa-pen"></i>
//                                 <span>(<span class="conter">${x.comments_count}</span>) comments</span>
//                             </div>
//                         </div>
                    
//                     </div>
//                      <div>
//                      ${com}
//                      </div
//                     `
            
            
    
    
        
//       })
//       .catch(function (error) {
//         // handle error
//         console.log(error);
//       })
// }
// function addcoment(){
//     let body=document.querySelector(".bodycoment").value
//     let token=localStorage.getItem("token")
//     let c={
      
//         "authorization":`Bearer ${token}`
       
//        }
//     axios.post(`https://tarmeezacademy.com/api/v1/posts/${id}/comments`,
//         {
//             "body":body
//         },{
    
//             headers:c
//          })
//       .then(function (response) {
//          console.log(response.data.body)
//        postone()
//        body=" "
       
//       })
//       .catch(function (error) {
//         console.log(error);
//         alert(error.message)
//       })
// }
// postone()
// nav()
// alertmas()