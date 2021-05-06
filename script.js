// DOM elements
let startBtn = document.querySelector(".start");
let sentenceRandom = document.querySelector(".sentenceRandom");
let writtingText = document.getElementById("writtingText");
let time = document.querySelector(".timer");
let url = "https://type.fit/api/quotes";//API
let wordCount;// word count for random sentence
let interval;// for clearing timer 
let changeBtn = document.querySelector(".change");

// starting decoration 
sentenceRandom.style.height = "40px";
sentenceRandom.style.width = "57vw";
let i = 0;
let startText = "Welcome to Typing-Master!! Created By Paras Punjabi :)";
let timer = setInterval(() => {
  sentenceRandom.innerHTML += startText[i];
  i++;
  if (i >= startText.length + 1) {
    sentenceRandom.innerHTML = "";
    i = 0;
  }
}, 100);

// start button event listener
startBtn.addEventListener("click", () => {
  changeBtn.style.display = "block";
  time.style.opacity = "1";
  writtingText.disabled = false;
  sentenceRandom.style.height = "auto";
  clearInterval(timer);
  sentenceRandom.innerHTML = "";
  writtingText.value = "";
  startBtn.style.display = "none";
  FetchRandom();
  startTimer();
});

// random number generator for array of text API
function RandomNumber(item) {
  return Math.floor(Math.random() * item.length);
}

// Random text Generator
function FetchRandom() {
  writtingText.value = "";
  sentenceRandom.innerHTML = "";
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let text = data[RandomNumber(data)].text;
      sentenceRandom.innerHTML = text;
      wordCount = text.split(" ").length;
    });
}

// Start Timer
function startTimer() {
  let idx = 0;
  interval = setInterval(() => {
    time.innerHTML = `Time : ${idx}`;
    idx++;
  }, 1000);
}

// results function
Results = () => {
  sentenceRandom.style.display = "none";
  let btn = document.createElement("button");
  btn.classList.add("start");
  btn.style.width = "150px";
  btn.innerHTML = "Play Again";
  document.body.append(btn);
  let seconds;
  if(time.innerText[8]==undefined){
     seconds = time.innerText[7];
  }
  else{
     seconds = time.innerText[7] + time.innerText[8];
  }
  let timeTaken = (parseInt(wordCount) / parseInt(seconds)) * 60;
  writtingText.value = `Average Typing Speed : ${eval(
    Math.round(timeTaken)
  )} words/min`;
  writtingText.style.textAlign = "center";
  writtingText.style.fontSize = "39px";
  writtingText.disabled = true;

  clearInterval(interval);
  btn.addEventListener("click", () => {
    writtingText.value = "";
    writtingText.disabled = false;
    sentenceRandom.style.display = "block";
    writtingText.style.textAlign = "left";
    writtingText.style.fontSize = "1.3rem";
    FetchRandom();
    time.innerText = "Time : 0";
    startTimer();
    changeBtn.style.display = "block";
    btn.remove();
  });
};

// will show results only when every single word, character is same as random sentence
writtingText.addEventListener("input", () => {
  if (writtingText.value === sentenceRandom.innerHTML) {
    setTimeout(() => {
      Results();
      changeBtn.style.display = "none";
    }, 500);
  }
});

// to change senetnce
changeBtn.addEventListener("click", () => {
  FetchRandom();
  clearInterval(interval);
  time.innerHTML = "Time : 0";
  startTimer();
});
