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

  $.fn.showUserData = function(user) {
    user.providerData.forEach(function (profile) {
      console.log("Sign-in provider: "+profile.providerId);
      console.log("  Provider-specific UID: "+profile.uid);
      console.log("  Name: "+profile.displayName);
      console.log("  Email: "+profile.email);
      console.log("  Photo URL: "+profile.photoURL);
    });
  }

  $.fn.setUsername = function(user){
    const username = $('#username').val();
    //const photoURL = $('#photoURL').val();
    const setDataAction = user.updateProfile({
      displayName: username
      //photoURL: photoURL
    });
    $.fn.showUserData(user);
  }


  // SignUp
  $btnSignUp.click(function(){
    console.log('-1');
    const username = $('#username').val();
    const email = $email.val();
    const password = $password.val();
    // Sign Up Error
    if(username==='') {
      $('#usernameError').html('請填寫暱稱');
      return;
    }
    if(email==='') {
      $('#emailError').html('請填寫電子郵件位置');
      return;
    }
    if(password==='') {
      $('#passwordError').html('請填寫密碼');
      return;
    }
    else if(password.length < 8) {
      $('#passwordError').html('密碼至少要八位數');
      return;
    }
    // signUp
    console.log('0');
    const creatAction = auth.createUserWithEmailAndPassword(email, password);

    console.log('1');
    creatAction.catch(function(error) {
      console.log(error.message);
      $signInfo.html(error.message);
    });
    console.log('2');
    creatAction.then(function(){
      const user = auth.currentUser;
      $.fn.setUsername(user);
      alert("註冊成功！");
      window.location.href = "./index.html";
    });
    console.log('3');
    $.fn.showUserData(auth.currentUser);
  });

  // SignIn
  $btnSignIn.click(function(){
    console.log('btnSignIn');
    const email = $email.val();
    const password = $password.val();
    // signIn
    const loginAction = auth.signInWithEmailAndPassword(email, password);
    console.log('qq');
    loginAction.catch(function(error){
      console.log(error.message);
      $signInfo.html(error.message);
    });
    loginAction.then(function(){
      alert("登入成功！");
      window.location.href = "./index.html";
    });
  });

  // Listening Login User
  auth.onAuthStateChanged(function(user){
    if(user) {
      console.log(user);
      $signInfo.html(user.email+" is login...");
      $.fn.showUserData(user);
      
    } else {
      console.log("listening not logged in");
    }
  });

  $btnSignOut.click(function(){
    auth.signOut();
    $signInfo.html('No one login...');
    alert("登出成功！");
  });
});
