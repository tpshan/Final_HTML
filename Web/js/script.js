$(document).ready(function(){
  $('#menuButton').click(function(){
    $(this).toggleClass('open');
    $('#navbarSpace').slideToggle(400);
  });
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

  const auth = firebase.auth();
  const storageRef = firebase.storage().ref();
  const dbRef = firebase.database().ref();

  $.fn.showUserData = function(user) {
    user.providerData.forEach(function (profile) {
      console.log("Sign-in provider: "+profile.providerId);
      console.log("  Provider-specific UID: "+profile.uid);
      console.log("  Name: "+profile.displayName);
      console.log("  Email: "+profile.email);
      console.log("  Photo URL: "+profile.photoURL);
    });
  }

  // SignUp
  $btnSignUp.click(function(){
    const username = $('#username').val();
    const email = $email.val();
    const password = $password.val();
    // Sign Up Error
    if(username==='') {
      $('#signUpForm > #usernameBox').addClass('has-error');
      $('#usernameError').html('請填寫暱稱');
      return;
    } else {
      $('#signUpForm > #usernameBox').removeClass('has-error');
      $('#usernameError').html('');
    }
    if(email==='') {
      $('#signUpForm > #emailBox').addClass('has-error');
      $('#emailError').html('請填寫電子郵件位置');
      return;
    } else {
      $('#signUpForm > #emailBox').removeClass('has-error');
      $('#emailError').html('');
    }
    if(password==='') {
      $('#signUpForm > #passwordBox').addClass('has-error');
      $('#passwordError').html('請填寫密碼');
      return;
    } else if(password.length < 8) {
      $('#signUpForm > #passwordBox').addClass('has-error');
      $('#passwordError').html('密碼至少要八位數');
      return;
    } else {
      $('#signUpForm > #passwordBox').removeClass('has-error');
      $('#passwordError').html('');
    }
    // signUp
    auth.createUserWithEmailAndPassword(email, password).then(function() {
      const user = auth.currentUser;
      const username = $('#username').val();
      user.updateProfile({
        displayName: username
      });
      firebase.database().ref('users/' + user.uid).set({
        email: user.email
      });
      alert("註冊成功！");
      window.location.href = "./index.html";
    }).catch(function(error) {
      alert("註冊失敗！\n" + error.message);
    });
  });

  // SignIn
  $btnSignIn.click(function(){
    const email = $email.val();
    const password = $password.val();
    if(email==='') {
      $('#signInForm > #emailBox').addClass('has-error');
      $('#emailError').html('請填寫電子郵件位置');
      return;
    } else {
      $('#signInForm > #emailBox').removeClass('has-error');
      $('#emailError').html('');
    }
    if(password==='') {
      $('#signInForm > #passwordBox').addClass('has-error');
      $('#passwordError').html('請填寫密碼');
      return;
    } else {
      $('#signInForm > #passwordBox').removeClass('has-error');
      $('#passwordError').html('');
    }
    // signIn
    loginAction = auth.signInWithEmailAndPassword(email, password).then(function() {
      alert(auth.currentUser.email + " 歡迎登入！");
      window.location.href = "./index.html";
    }).catch(function(error) {
      alert("登入失敗！\n" + error.message); 
    });
  });

  // Listening Login User
  auth.onAuthStateChanged(function(user){
    if(user) {
      $('#userMessage').html(user.displayName + ' 你好！');
      $('.noUser').hide();
      $('.hasUser').show();
      $.fn.showUserData(user);
    }
    else {
      $('.noUser').show();
      $('.hasUser').hide();
    }
  });

  $btnSignOut.click(function(){
    auth.signOut();
    alert("登出成功！");
  });
});
