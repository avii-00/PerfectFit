import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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

const fetchData = async () => {
    const blogsCollection = collection(firestore, 'blogs');
    const querySnapshot = await getDocs(blogsCollection);
  
    const blogContainer = document.querySelector('#blog-container');
  
    querySnapshot.forEach((doc) => {
      const blogData = doc.data();
  
      // Create new blog-card element
      const blogCard = document.createElement('div');
      blogCard.classList.add('blog-card');
  
      // Create elements for blog card content
      const blogImage = document.createElement('img');
      blogImage.classList.add('blog-image');
      blogImage.src = blogData.bannerImage; // Replace with appropriate image path
  
      const blogTitle = document.createElement('h1');
      blogTitle.classList.add('blog-title');
      blogTitle.textContent = blogData.title;
  
      const blogOverview = document.createElement('p');
      blogOverview.classList.add('blog-overview');
      blogOverview.textContent = blogData.article;
  
      const readMoreLink = document.createElement('a');
      readMoreLink.classList.add('btn', 'dark');
      readMoreLink.href = '/';
      readMoreLink.textContent = 'Read More';
  
      // Append elements to blog card
      blogCard.appendChild(blogImage);
      blogCard.appendChild(blogTitle);
      blogCard.appendChild(blogOverview);
      blogCard.appendChild(readMoreLink);
  
      // Append blog card to container
      blogContainer.appendChild(blogCard);
    });
};
  

fetchData();


