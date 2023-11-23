import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getAuth, } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  // Your Firebase project's configuration
  apiKey: "AIzaSyCFMZiI81PLeSUfWSZJA78ppkOuLfgt8zU",
  authDomain: "perfect-fit-web.firebaseapp.com",
  projectId: "perfect-fit-web",
  storageBucket: "perfect-fit-web.appspot.com",
  messagingSenderId: "89161650010",
  appId: "1:89161650010:web:fe2058ac70b91f7e5aed63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

const database = getDatabase(app);
const auth = getAuth();
window.onload = function () {
  console.log("logged");
  auth.onAuthStateChanged((user) => {
    console.log("logged In");
    if (!user) {
      // User is not authenticated, redirect to the login page or any other desired page
      window.location.href = "/Login/login.html";
    }
  });
}

const bannerImageUpload = document.querySelector('#banner-upload');
const uploadButton = document.querySelector('#image-upload');
const blogTitleField = document.querySelector('.title');
const blogArticleField = document.querySelector('.article');

let uploadedBannerURL =  "";

//upload blogs collection to the firebase
bannerImageUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  console.log(file);

  const storageRef = ref(storage, 'banners/' + file.name);
  uploadBytes(storageRef, file)
    .then(() => {
      // Upload successful, get the download URL
      return getDownloadURL(storageRef);
    })
    .then((downloadURL) => {
      console.log(downloadURL);
      // Update the banner image in the HTML
      const bannerImage = document.querySelector('.banner');
      bannerImage.style.backgroundImage = `url(${downloadURL})`;
      uploadedBannerURL = downloadURL;
    })
    .catch((error) => {
      console.error('Error uploading banner image:', error);
    });
});


const publishButton = document.querySelector('.publish-btn');
publishButton.addEventListener('click', async () => {
  const blogTitle = blogTitleField.value;
  const blogArticle = blogArticleField.value;

  const blogsCollection = collection(firestore, 'blogs');
  const blogData = {
    bannerImage:uploadedBannerURL,
    title: blogTitle,
    article: blogArticle
    // Add any other blog details you want to save
  };

  try {
    const docRef = await addDoc(blogsCollection, blogData);
    console.log('Blog details saved successfully with ID:', docRef.id);
    // Redirect to a success page or perform any other desired action
  } catch (error) {
    console.error('Error saving blog details:', error);
    // Handle the error appropriately
  }
});
