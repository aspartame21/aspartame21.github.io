const TypeWriter = function(container, words, delay = 3000) {
  this.container = container;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.delay = parseInt(delay, 10);
  this.type();
  this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function() {
  // Current index of word
  // Get full text of current word
  const fullTxt = this.words[this.wordIndex];

  // Check if deleting
  if(this.isDeleting) {
    // Remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Insert txt into element
  this.container.innerHTML = this.txt;

  // Initial Type Speed
  let typeSpeed = 300;

  if(this.isDeleting) {
    typeSpeed /= 2;
  }

  // If word is complete
  if(!this.isDeleting && this.txt === fullTxt) {
    // Make pause at end
    typeSpeed = this.delay;
    // Set delete to true
    this.isDeleting = true;
  } else if(this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    // Move to next word
    this.wordIndex = (this.wordIndex + 1) % this.words.length;   
    // Pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
}


// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  console.log()
  const words = JSON.parse(txtElement.getAttribute('data-words').replace(/'/g,"\"")); 
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}