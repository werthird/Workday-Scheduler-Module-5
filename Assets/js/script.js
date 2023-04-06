// ==================== ARRAYS ====================
let array;
let duplicateTracker = false;


// ==================== UPDATE FROM LOCAL STOAGE ====================
// Checks if local storage already has score stored
if ( localStorage.getItem('task') ) {
  const stringArray = localStorage.getItem('task');
  array = JSON.parse(stringArray);
  clearEmpty();
} else {
  array = [];
};

// ==================== CLEARS ARRAY OF EMPTY ====================
// Assures that no empty strings are sent to local storage
function clearEmpty() {
  for (let i=0; i<array.length; i++) {
    if (array[i].textfield === "") {
      array.splice(i, 1);
    };
  };
};


function updatePage() {

  // ==================== CLICK/TO LOCAL STORAGE FUNCTION ====================
  $('.saveBtn').click(function() {
    // ====== Grab the value of the textfield that was closest to the click event
    let textfieldValue = $(this).closest('.row').find('.description').val().trim();
    // ====== Grab the timeblock of the containing div that was closest to the click event
    let timeBlockNumber = $(this).closest('.row').attr('id');
    // ====== Put timeblock and value into an object
    let task = {
      timeBlock: timeBlockNumber,
      textfield: textfieldValue,
    }
    // ====== Loop through the array to check if there is any matchin timeBlock to task
    for (let i=0; i<array.length; i++) {
      if (array[i].timeBlock === task.timeBlock) {
    // ====== Replace the existing object with task
        array[i] = task;
    // ====== Update tracker so that task array can be pushed
        duplicateTracker = true;
        break;
      };
    };
    // ====== Push task object into array if tracker is true
    if (!duplicateTracker) {
      array.push(task);
    };
    // ====== Clears any empty strings from array
    clearEmpty();
    // ====== Change array into string
    const arrayString = JSON.stringify(array);
    // ====== Send arrayString into local storage
    localStorage.setItem('task', arrayString);
  });

  // ==================== CHANGE BACKGROUND FUNCTION ====================
  $('div.row').each(function() {
    // Grabs current hour
    let currentHour = dayjs().hour();
    //Grabs div id and changes to number to store in variable
    let timeBlockId = parseInt($(this).attr('id'));
    // Checks div id against current hour and sets background accordingly
    if (currentHour === timeBlockId) {
      $(this).removeClass('past future').addClass('present');
    } else if (currentHour > timeBlockId) {
      $(this).removeClass('present future').addClass('past');
    } else if (currentHour < timeBlockId) {
      $(this).removeClass('past present').addClass('future');
    }
  });

  // ==================== FROM LOCAL STORAGE FUNCTION ====================
  $('div.row').each(function() {
    // ====== Grab the id from that div
    let divId = $(this).attr('id');
    // ====== Loop through array and check if id of div matches the timeBlock of objects in array
    for (let i=0; i<array.length; i++) {
      if ( divId === array[i].timeBlock ) {
    // ====== If match, add arrray timeBlock value to textfield on page
        $(this).closest('.row').find('.description').text(array[i].textfield);
    // ====== Break from loop if matched
        break;
      };
    };
  });

  // ==================== HEADER DATE ====================
  $('#currentDay').text(dayjs().format('dddd - MMM DD, YYYY'));
};

// ==================== RUN FUNCTIONS ====================
// When page is loaded, run updatePage function, and re-run function every hour
$(function() {
  updatePage();
  setInterval(updatePage, 60*60*1000);
});