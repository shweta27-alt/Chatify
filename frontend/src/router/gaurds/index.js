//if user is login then will go to the chat if not it will move to login
import store from '../../store'



export function checkAuthenticatedUser(to,from,next){
    console.log(store,to,from,next);
    console.log(store.state.userData.isLoggedInUser)
    store.dispatch("getUserData").then((response)=>{
       if(response.isLoggedInUser){
        return next()
       }
       window.location.href= `${window.location.origin}/auth/login`
    })
    .catch((error)=>{
      window.location.href= `${window.location.origin}/auth/login`
      console.log(error)
    })
}


export function checkNonAuthenticatedUser(to,from,next){
    console.log(store,to,from,next)
    console.log(store.state.userData.isLoggedInUser)
    store.dispatch("getUserData").then((response)=>{
        console.log(response)
        if(!response.isLoggedInUser){
        return next()
        }
        window.location.href= `${window.location.origin}/chat`
     })
     .catch((error)=>{
       next()
       console.log(error)
     })
}
