// Firebase configuration and initialization
const firebaseConfig = {
  apiKey: "AIzaSyDbwzXlpurfSIA2cdrU0TVFVTDJs8zbJo4",
  authDomain: "spotify-f6bed.firebaseapp.com",
  projectId: "spotify-f6bed",
  storageBucket: "spotify-f6bed.firebasestorage.app",
  messagingSenderId: "296282590683",
  appId: "1:296282590683:web:a8a9caba8a9956cc7b2bfe",
  measurementId: "G-E58XBN8YJR",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Send OTP function
window.sendOTP = function () {
  const phoneNumber = document.getElementById("phone-number").value.trim();
  if (!phoneNumber) {
    alert("Please enter a valid phone number.");
    return;
  }

  // Use invisible reCAPTCHA in the background
  const appVerifier = new firebase.auth.RecaptchaVerifier('send-otp-btn', {
    size: 'invisible',
  });

  auth.signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert("OTP sent successfully.");
      document.getElementById("otp-login").style.display = "block";
      document.getElementById("phone-login").style.display = "none";
    })
    .catch((error) => {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP. Please try again.");
    });
};

// Verify OTP function
window.verifyOTP = function () {
  const otp = document.getElementById("otp").value.trim();
  if (!otp) {
    alert("Please enter the OTP.");
    return;
  }

  window.confirmationResult.confirm(otp)
    .then((result) => {
      const user = result.user;
      alert("OTP verified! User logged in.");
      // Redirect to Spotify search after OTP verification
      window.location.href = "https://open.spotify.com/search";
    })
    .catch((error) => {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Please try again.");
    });
};
