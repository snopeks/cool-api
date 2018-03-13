var $foodList;
var allFoods = [];

$(function(){
  console.log('app.js is connected!')

  $foodList = $('#foodTarget');
  $.ajax({
    method: 'GET',
    url: '/api/food',
    success: handleSuccess,
    error: handleError
  })
  $("#create-new-food").on('submit', function(e){
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: '/api/food',
      data: $(this).serializeArray(),
      success: postSuccess,
      error: postError
    })
  })

  $foodList.on('click', '.edit-food-button', function(){
    console.log('clicked edit button');
    $(this).parent().find('.edit-input').show();
  })
  $foodList.on('click', '.edit-food-submit-button', function(){
    console.log("clicked save button");
    $(this).parent().hide();
    var newName = $(this).parent().find("input").val();
    console.log($(this))
    console.log(newName)
    console.log($(this).parent().parent())
    var than = this;
    $.ajax({
      method: "PUT",
      url: `/api/food/${ $(this).attr('data-id') }`,
      data: { name: newName },
      success: function(food){
        console.log("this is food name", food.name)
        $(than).parent().parent().find('.food-name').html(food.name)
      },
      error: handleUpdateError
    })
  })
  $foodList.on('click', '.deleteBtn', function(){
    console.log('clicked delete button for food', '/api/food/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: 'api/food/' + $(this).attr('data-id'),
      success: deleteFoodSuccess,
      error: deleteFoodError
    })
  })

}) //end of onReady
function deleteFoodSuccess(json){
  console.log('this is your json', json)
  var food = json;
  var foodId = food._id;
  console.log('delete food', foodId)
  for(var index = 0; index < allFoods.length; index++){
    if(allFoods[index]._id === foodId){
      allFoods.splice(index, 1);
      break
    }
  }
  render();
}

function deleteFoodError(err){
  console.log("there was an error deleting your food!", err)
}

function handleUpdateSuccess(food){
  console.log("this is food", food)
  console.log('this is food.name', food.name)
  $(this).parent().parent().find('.food-name').html(food.name)
}
function handleUpdateError(){
  console.log("there was an error updating your food")
}

function getFoodHtml(food){
  return `<hr>
          <p>
            <b class="food-name">${food.name}</b>
            <span class="edit-input" style="display: none">
              <input type="text" value="${food.name}" />
              <button class="edit-food-submit-button" data-id="${food._id}">Save</button>
            </span>
            <button class="edit-food-button">Edit</button>
            <br>
            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id="${food._id}">Delete</button>
          </p>
          `;
}

function getAllFoodHtml(food){
  return food.map(getFoodHtml).join("");
}

function render() {
  $foodList.empty();
  var foodHtml = getAllFoodHtml(allFoods);
  $foodList.append(foodHtml);
}

function handleSuccess(json){
  allFoods = json;
  render();
}
function handleError(e){
  console.log('uh oh');
  $("#foodTarget").text('Failed to load food, is the server working?');
}

function postSuccess(json){
  console.log(json)
  $('#create-new-food input').val('')
  allFoods.push(json)
  render();
}
function postError(err){
  console.log("there was an error!", err)
}
