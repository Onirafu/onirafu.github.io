// Animation JS

// Typing Animation
class TypeWriter {
  constructor(txt, target, targetscore) {
    // Added class properties and initialized them in the constructor
    this.i = 0; 
    this.txt = txt; 
    this.speed = 25; 
    this.target = target;
    this.targetscore = targetscore;
  }

  typeWriter() {
    // Replaced let with this for class properties
    let i = this.i;
    let txt = this.txt; 
    let speed = this.speed; 
    this.targetscore.classList.remove('blink'); 
    if (i < txt.length) {
      let part = txt[i]; 
      if (part.text !== "brt") {
        let textElement = document.createElement("span"); 
        // Class Checker
        if (part.class) {
          textElement.classList.add(part.class);
          if(part.class2) textElement.classList.add(part.class2);
          if(part.class3) textElement.classList.add(part.class3);
          if(part.class4) textElement.classList.add(part.class4);
          if(part.id) textElement.setAttribute("id", part.id);
        }

        else if (part.text === "br") {
          part.text = "";
          let lbr = document.createElement("br"); 
          this.target.appendChild(lbr); // Changed from document.getElementById("demo").appendChild(lbr)
        }
        this.target.appendChild(textElement); // Changed from document.getElementById("demo").appendChild(textElement)
        this.typeText(part.text, 0, textElement); // Changed from typeText(part.text, 0, textElement)
      } else {
        this.targetscore.classList.toggle('blink'); 
        setTimeout(() => {
          this.i++; 
          this.typeWriter(); // Changed from typeWriter(); 
        }, part.breakTime);
        return; 
      }

      this.i++; 

      setTimeout(() => this.typeWriter(), part.text.length * speed + 100); // Changed from setTimeout(typeWriter, part.text.length * speed + 100)
    } else if (this.i === txt.length) { // Changed from else if (i === txt.length)
      this.targetscore.classList.add('blink'); 
    }
    return true;
  }

  typeText(text, index, element) {
    if (index <= text.length) {
      element.textContent = text.substring(0, index); 
      setTimeout(() => {
        this.typeText(text, index + 1, element); // Changed from typeText(text, index + 1, element)
      }, this.speed);
    } else {
    }
  }
}

const anim1 = new TypeWriter(
  [
    { text: "Loading ", class: "text-secondary"},
    { text: "onirafu.github.io ", class: "fw-bold"},
    { text: "", class: "fa", class2: "fa-spinner", class3: "fa-spin", id: "spinLoaded"},
    { text: "brt", breakTime: 1000}, //linebreak
    { text: "br"}, //linebreak
  ],
  document.getElementById('demo'),
  document.getElementById('unscore')
);

const anim2 = new TypeWriter(
  [
    { text: "Loaded.", class: "fw-bold"},
    { text: "br"}, //linebreak
    { text: "Closing", class: "fw-bold"},
    { text: " The Loader Page.", class: "text-secondary"}
  ],
  document.getElementById('demo'),
  document.getElementById('unscore')
);

//Reloaded Animation
const reload = new TypeWriter(
  [
    { text: "Page Reloaded. ", class: "fw-bold", class2: "text-secondary"},
    { text: "", class: "fa", class2: "fa-refresh", class3: "text-warning", class4: "fa-spin"}
  ],
  document.getElementById('demo'),
  document.getElementById('unscore')
);

// Window Section


// User Session
const isShown = sessionStorage.getItem('shown', true);

if (isShown == undefined) {
  console.log(isShown);
  anim1.typeWriter();

  window.addEventListener("load", function () {
    var loader = false;
    setTimeout(() => {
      document.getElementById("spinLoaded").classList.remove('fa-spinner');
      anim2.typeWriter();
      setTimeout(() => {
        $(function () {
          $('#loader').delay(600).fadeOut("fast");
          $('#main').delay(600).show();
          $('#loader-box').slideUp(400);
          sessionStorage.setItem('shown', true);
          loader = true; // Assign true to loader
        });
      }, 2000);

      setTimeout(() => {
        if (loader) { // Use loader variable for comparison
          $('#loader').remove();
          $('#loader-box').remove();
          console.log('deleted');
        }
      }, 5000);
    }, 2000); //HARDCODED
  });
} else if (isShown){
  reload.typeWriter();
  setTimeout(() => {
    $(function () {
      $('#loader').delay(250).fadeOut();
      $('#main').delay(250).show();
      $('#loader-box').fadeOut(80);
      sessionStorage.setItem('shown', true);
    });
  }, 700);
}

// Draggable Window-box

// Select all elements with the class name "each"

let containers = document.querySelectorAll(".window-box");
let containerHeaders = document.querySelectorAll(".window-header");

// Function to handle mouse drag for a specific container
function onMouseDrag(container, { movementX, movementY }) {
  let containerStyle = window.getComputedStyle(container);
  let leftValue = parseInt(containerStyle.left);
  let topValue = parseInt(containerStyle.top);
  
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let newLeftValue = leftValue + movementX;
  let newTopValue = topValue + movementY;

  // Boundary checks for the left side
  if (newLeftValue < 0) newLeftValue = 0;
  // Boundary checks for the right side
  if (newLeftValue + containerWidth > viewportWidth) newLeftValue = viewportWidth - containerWidth;
  // Boundary checks for the top side
  if (newTopValue < 0) newTopValue = 0;
  // Boundary checks for the bottom side
  if (newTopValue + containerHeight > viewportHeight) newTopValue = viewportHeight - containerHeight;

  container.style.left = `${newLeftValue}px`;
  container.style.top = `${newTopValue}px`;
}

// Attach mouse event listeners to each container header
containerHeaders.forEach((containerHeader, index) => {
    containerHeader.addEventListener("mousedown", (event) => {
        // Find the corresponding container for the clicked header
        const container = containers[index];
        // Start tracking mouse movement only for this container
        document.addEventListener("mousemove", onMouseMove);
        // Function to handle mousemove event
        function onMouseMove(event) {
            onMouseDrag(container, {
                movementX: event.movementX,
                movementY: event.movementY
            });
        }
        // Function to handle mouseup event
        function onMouseUp(event) {
            // Remove mousemove and mouseup event listeners
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }
        // Attach mouseup event listener to document
        document.addEventListener("mouseup", onMouseUp);
    });
});

// Function to handle touch drag for a specific container
function onTouchDrag(container, { clientX, clientY }) {
  let containerStyle = window.getComputedStyle(container);
  let leftValue = parseInt(containerStyle.left);
  let topValue = parseInt(containerStyle.top);
  let touchOffsetX = clientX - leftValue;
  let touchOffsetY = clientY - topValue;

  // Function to handle touchmove event
  function onTouchMove(event) {
      let newLeftValue = event.touches[0].clientX - touchOffsetX;
      let newTopValue = event.touches[0].clientY - touchOffsetY;

      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Boundary checks
      if (newLeftValue < 0) newLeftValue = 0;
      if (newLeftValue + containerWidth > viewportWidth) newLeftValue = viewportWidth - containerWidth;
      if (newTopValue < 0) newTopValue = 0;
      if (newTopValue + containerHeight > viewportHeight) newTopValue = viewportHeight - containerHeight;

      container.style.left = `${newLeftValue}px`;
      container.style.top = `${newTopValue}px`;

      event.preventDefault(); // Prevent scrolling on touch devices
  }

  // Function to handle touchend event
  function onTouchEnd(event) {
      // Remove touchmove and touchend event listeners
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
  }

  // Attach touchmove event listener to document
  document.addEventListener("touchmove", onTouchMove, { passive: false });
  // Attach touchend event listener to document
  document.addEventListener("touchend", onTouchEnd);
}

// Attach touch event listeners to each container header
containerHeaders.forEach((containerHeader, index) => {
    containerHeader.addEventListener("touchstart", (event) => {
        // Find the corresponding container for the touched header
        const container = containers[index];
        // Start tracking touch movement only for this container
        onTouchDrag(container, {
            clientX: event.touches[0].clientX,
            clientY: event.touches[0].clientY
        });
    });
});

var scene = document.getElementById('logo');
var parallaxInstance = new Parallax(scene, {
  relativeInput: true,
  invertX: false,
  invertY: false,
  pointerEvents: true
});



//Rumus Center
//(VH - EH) / 2
//(VW - EW) / 2

