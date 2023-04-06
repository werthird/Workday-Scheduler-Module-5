// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


//==========================
// ------- ARRAYS -------
//==========================
let array;





// Checks if local storage already has score stored
  if ( localStorage.getItem('task') ) {
    const stringArray = localStorage.getItem('task');
    array = JSON.parse(stringArray);
  } else {
    array = [];
  };


$(function () {

  // ==================== CLICK FUNCTION ====================
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
    // ====== Push object into array
    array.push(task);
    // ====== Change array into string
    const arrayString = JSON.stringify(array);
    // ====== Send arrayString into local storage
    localStorage.setItem('task', arrayString);
  });


  // ==================== CLICK FUNCTION ====================
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?



  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  

  // $('.description').text();

  // for (let i=0; i<array.length; i++) {
  //   console.log(array[i].timeBlock);
  //   let timeBlockId = $(this).closest('.row').attr('id');
  //   console.log(timeBlockId);
  //   // if (array[i].timeBlock === ) {

  //   // }
  // }
  // const divsToCheck = document.querySelectorAll('');

  // Loop through each div and run a function on them
  $('div').each(function() {
    let divId = $(this).attr('id');

    for (let i=0; i<array.length; i++) {
      if ( divId === array[i].timeBlock ) {
        $(this).closest('.row').find('.description').text(array[i].textfield);
        break;
      };
    };
  });


  // TODO: Add code to display the current date in the header of the page.
  $('#currentDay').text(dayjs().format('dddd - MMM DD, YYYY'));
});
