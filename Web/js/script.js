$(document).ready(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBtg-lOL3UQylv990zx6di3Gs54qfpXtM4",
    authDomain: "web-final-29490.firebaseapp.com",
    databaseURL: "https://web-final-29490.firebaseio.com",
    projectId: "web-final-29490",
    storageBucket: "web-final-29490.appspot.com",
    messagingSenderId: "406296476548"
  };
  firebase.initializeApp(config);
  const $email = $('#email');
  const $password = $('#password');
  const $btnSignUp = $('#btnSignUp');
  const $btnSignIn = $('#btnSignIn');
  const $btnSignOut = $('#btnSignOut');
  const $signInfo = $('#sign-info');
  const auth = firebase.auth();

  // SignUp
  $btnSignUp.click(function(e){
    const email = $email.val();
    const pass = $password.val();    
    // signUp
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(function(e){
      console.log(e.message);
      $signInfo.html(e.message);
    });
  });

  // SignIn
  $btnSignIn.click(function(e){
    const email = $email.val();
    const pass = $password.val();
    // signIn
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(function(e){
      console.log(e.message);
      $signInfo.html(e.message);
    });
  });
  // Listening Login User
  firebase.auth().onAuthStateChanged(function(user){
    if(user) {
      console.log(user);
      $signInfo.html(user.email+" is login...");
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: "+profile.providerId);
        console.log("  Provider-specific UID: "+profile.uid);
        console.log("  Name: "+profile.displayName);
        console.log("  Email: "+profile.email);
        console.log("  Photo URL: "+profile.photoURL);
      });
    } else {
      console.log("not logged in");
    }
  });
  $btnSignOut.click(function(){
    firebase.auth().signOut();
    $signInfo.html('No one login...');
  });
});
