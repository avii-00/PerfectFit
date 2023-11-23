
/* JavaScript codes of quiz.html file */

/* Question 01... */
// Attach event listeners to buttons
document.getElementById('backBtn').addEventListener('click', goBack);
document.getElementById('nextBtn').addEventListener('click', showQuestion2);
document.getElementById('nextBtn2').addEventListener('click', showQuestion2);

// Function to show question2 and hide question1
function showQuestion2() {
    // Check if all fields in question1 are filled
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var height = document.getElementById('height').value;
    var weight = document.getElementById('weight').value;

    if (!name || !age || !height || !weight ) {
        alert('Please fill in all fields.');
        return;
    }

    // Hide question1
    document.getElementById('question1').style.display = 'none';

    // Show question2
    document.getElementById('question2').style.display = 'block';
}

// Function to handle back button
function goBack() {
    // Redirect to /Home/home.html
    window.location.href = '/Home/home.html';
}



/* Question 02... */

/* selection for question2 */
function toggleOval(element) {
    element.classList.toggle("selected");
}

function goToQuestion(questionNumber) {
    // Hide current question
    document.getElementById("question2").style.display = "none";
    // Show the specified question
    document.getElementById("question" + questionNumber).style.display = "block";
}

function validateAndGoToNextQuestion() {
    var selectedOvals = document.getElementsByClassName("oval selected");
    if (selectedOvals.length === 0) {
        alert("Please select at least one option.");
    } else {
        // Hide current question
        document.getElementById("question2").style.display = "none";
        // Show the next question
        document.getElementById("question" + 3).style.display = "block";
    }
}


/* Question 03... */

// Function to show Question 3 and hide Question 2
function showQuestion3() {
    // Hide Question 2
    document.getElementById("question2").style.display = "none";

    // Show Question 3
    document.getElementById("question3").style.display = "block";
}

// Function to handle the back button in Question 3
function goBackToQuestion2() {
    // Hide Question 3
    document.getElementById("question3").style.display = "none";

    // Show Question 2
    document.getElementById("question2").style.display = "block";
}

// Function to validate and proceed to Question 4
function validateAndGoToQuestion4() {
    // Check if all fields in Question 3 are filled
    var bust = document.getElementById("bust").value;
    
    if (!bust ) {
        alert("Please fill in the details.");
        return;
    }

    // Hide Question 3
    document.getElementById("question3").style.display = "none";

    // Show Question 4
    document.getElementById("question4").style.display = "block";
}

// Attach event listeners to buttons
document.getElementById("nextBtn2").addEventListener("click", function () {
    validateAndGoToNextQuestion();
});
document.getElementById("backBtn3").addEventListener("click", function () {
    goBackToQuestion2();
});
document.getElementById("nextBtn3").addEventListener("click", function () {
    validateAndGoToQuestion4();
});


/* Question 04... */

// Function to handle the back button in Question 4
function goBackToQuestion3() {
    // Hide Question 4
    document.getElementById("question4").style.display = "none";

    // Show Question 3
    document.getElementById("question3").style.display = "block";
}

// Function to validate Question 4 and go to Question 5
function validateAndGoToQuestion5() {
    // Check if all fields are filled
    var size = document.getElementById("size").value;
    

    if (size === "" ) {
        alert("Please fill in the field.");
    } else {
        // Go to Question 5
        document.getElementById("question4").style.display = "none";
        document.getElementById("question5").style.display = "block";
    }
}


/* Question 05... */

// Function to handle the back button in Question 5
function goBackToQuestion4() {
    // Hide Question 5
    document.getElementById("question4").style.display = "none";

    // Show Question 4
    document.getElementById("question3").style.display = "block";
}

// Function to validate Question 5 and go to Question 6
function validateAndGoToQuestion6() {
    // Check if skin tone is selected
    var skinValue = document.getElementById("skin").value;

    if (skinValue === "" ) {
        alert("Please fill in all fields.");
    } else {
        // Go to Question 6
        document.getElementById("question5").style.display = "none";
        document.getElementById("question6").style.display = "block";
    }
}


/* Question 06... */

// Function to handle the back button in Question 6
function goBackToQuestion5() {
    // Hide Question 6
    document.getElementById("question6").style.display = "none";

    // Show Question 5
    document.getElementById("question5").style.display = "block";
}

// Function to validate Question 6 and go to Question 7
function validateAndGoToQuestion7() {
    // Check if occasion is selected
    var occasionValue = document.getElementById("occasion").value;

    if (occasionValue === "") {
        alert("Please choose an occasion.");
    } else {
        // Go to Question 7
        document.getElementById("question6").style.display = "none";
        document.getElementById("question7").style.display = "block";
    }
}


/* Question 7... */

// Function to handle the back button in Question 7
function goBackToQuestion6() {
    // Hide Question 7
    document.getElementById("question7").style.display = "none";
    // Show Question 6
    document.getElementById("question6").style.display = "block";
}

// Function to validate Question 7 and go to loading
function validateAndGoToLoading() {
    // Check if type is selected
    var selectedType = document.getElementById("type").value;
    if (selectedType === "" || selectedType === null || selectedType === undefined) {
      alert("Please choose a body type");
    } else {
      // Go to loading
    //   document.getElementById("question7").style.display = "none";
    //   document.getElementById("loading").style.display = "block";
    //   startLoadingAnimation();
    }
  }

  
  

// Loading...

function startLoadingAnimation() {
    var loadingText = document.querySelector(".loading-text");
    var loadingSection = document.getElementById("loading");
    var nextButton = document.getElementById("nextBtn7");

    var progress = 0;

    function updateLoadingText() {
        loadingText.innerText = progress + "%";
        if (progress === 10) {
            clearInterval(interval);
            // Show the "next" button and disable loading
            nextButton.style.display = "block";
            nextButton.disabled = false;
            // loadingSection.style.display = "none";
        } else {
            progress++;
        }
    }

    updateLoadingText();
    var interval = setInterval(updateLoadingText, 4000);

    // Hide the "next" button and disable it initially
    nextButton.style.display = "none";
    nextButton.disabled = true;
    // Show the loading section
    loadingSection.style.display = "block";
}