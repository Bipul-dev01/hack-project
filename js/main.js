// const milestonesAllData = JSON.parse(allData);
// console.log(milestonesAllData); // data: Array(15) [ {…}, {…}, {…}, … ]

const milestonesdata = JSON.parse(allData).data;
//console.log(milestonesdata); // Array(15) [ {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, … ]

//Load course milestones data

function loadMilestones() {
  let milestones = document.querySelector(".milestones");
  //console.log(milestones)

  //NB :  return `<div class="milestone border-b" ${milestone._id}> // Ekhane ei id ta deayar subudha holo indivisually protitti milestone er ekta kore id thakbe r eta lagbe markMileStone() function call houar somoy
  milestones.innerHTML = `${milestonesdata
    .map((milestone) => {
      //console.log(milestone)
      return `<div class="milestone border-b" id="${milestone._id}"> 
            <div class="flex">
              <div class="checkbox"><input type="checkbox" onclick="markMileStone(this, ${
                milestone._id
              })" /></div>
              <div onclick="openmilestone(this, ${milestone._id})">
                <p>

                ${milestone.name}
                  <span><i class="fas fa-chevron-down"></i></span>
                </p>
              </div>
            </div>
            <div class="hidden_panel">
              ${milestone.modules
                .map((module) => {
                  return `<div class="module border-b">
                 <p>${module.name}</p>
               </div>`;
                })
                .join("")}
            </div>
          </div>`;

          
    })
    .join("")}`;

  //     milestones.innerHTML = ` <div class="milestone border-b">
  //             <div class="flex">
  //               <div class="checkbox"><input type="checkbox" /></div>
  //               <div>
  //                 <p>
  //                   Milestone 1 name
  //                   <span><i class="fas fa-chevron-down"></i></span>
  //                 </p>
  //               </div>
  //             </div>
  //             <div class="hidden_panel">
  //               <div class="module border-b">
  //                 <p>Module Name</p>
  //               </div>
  //             </div>
  //           </div>`
}

function openmilestone(milestoneElement, id) {
  const currentPanel = milestoneElement.parentNode.nextElementSibling;
  const shownPanel = document.querySelector(".show");
  const active = document.querySelector(".active");

  //First remove previous active class if any (other than the clicked one)

  if (active && !milestoneElement.classList.contains("active")) {
    active.classList.remove("active");
  }

  // toggle current clicked one

  milestoneElement.classList.toggle("active");

  // First hide previous panel if open (Other than the clicked Element)

  if (!currentPanel.classList.contains("show") && shownPanel) {
    shownPanel.classList.remove("show");
  }

  // toggle current element

  currentPanel.classList.toggle("show");

  showMileStoneImage(id);
}

function showMileStoneImage(id) {
  const milestoneImage = document.querySelector(".milestoneImage");

  milestoneImage.style.opacity = "0";
  milestoneImage.src = milestonesdata[id].image;

  const title = document.querySelector(".title");
  const details = document.querySelector(".details");

  title.innerText = milestonesdata[id].name;
  details.innerText = milestonesdata[id].description;
}

// Listen for HERO image load

const milestoneImage = document.querySelector(".milestoneImage");
milestoneImage.onload = function () {
  this.style.opacity = "1";
};


function markMileStone(checkbox, id) {
  const doneList = document.querySelector(".doneList");
  const milestonesList = document.querySelector(".milestones");
  const item = document.getElementById(id);

  if (checkbox.checked) {
    // Move to done list
    if (milestonesList.contains(item)) {
      milestonesList.removeChild(item);
    }
    doneList.appendChild(item);
    orderingList(doneList);
  } else {
    // Move back to main list
    if (doneList.contains(item)) {
      doneList.removeChild(item);
    }
    milestonesList.appendChild(item);
    orderingList(milestonesList);
  }
}

// Sort function that keeps order ascending by ID
function orderingList(listContainer) {
  const items = Array.from(listContainer.children);

  // Sort numerically by id
  items.sort((a, b) => parseInt(a.id) - parseInt(b.id));

  // Re-append sorted items
  items.forEach(item => listContainer.appendChild(item));
}


loadMilestones();



//https://chatgpt.com/share/68e0cc33-f728-8012-a22f-c4a7d1a4c104