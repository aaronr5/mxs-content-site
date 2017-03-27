function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

var itemTemplate =
'<div class="item-wrapper">' +
  '<a class="item-url">' +
      '<div class="item">' +
      '<div class="item-img-wrapper">' +
        '<img class="item-img">' +
        '</div>' +
        '<div class="item-info">' +
            '<h2 class="item-title"></h2>' +
            '<p class="item-creator"></p>' +
            '<p class="item-downloads"></p>' +
            '<p class="item-description"></p>' +
        '</div>' +
      '</div>' +
    '</a>' +
'</div>';

//DOM RENDERERS
function renderCards(data) {
  console.log(data);
  var elements = data.map(function(item) {
    var elementTemplate = $(itemTemplate);
    elementTemplate.find('.item-url').attr('href', '/uploads/id/' + item.id);
    elementTemplate.find('.item-img').attr('src', item.imgLocation);
    elementTemplate.find('.item-img').attr('alt', item.name);
    elementTemplate.find('.item-title').text(item.name);
    elementTemplate.find('.item-creator').html('By <a href="#">' + item.creator + '</a>');
    elementTemplate.find('.item-downloads').text(item.downloadCount + ' Downloads');
    elementTemplate.find('.item-description').html('Type - ' + capitalizeFirstLetter(item.itemType) + ' ' + capitalizeFirstLetter(item.category));
    return elementTemplate;
  });
  $('.results').html('');
  $('.results').append(elements);
}

//REQUESTS
function getUploads(filter) {
  $.ajax({
    type: 'GET',
    url: '/uploads/' + filter,
    dataType: 'json',
  })
  .done(function(data){
    renderCards(data);
  })
  .fail(function(err) {
    console.log(err);
  });
}

//Event Handlers
function filterUpdate() {
  $('.filter-select').on('change', function() {
    $('.results').html('');
    getUploads($(this).val());
  });
}

$(function() {
  getUploads($('.filter-select').val());

  //initialzing event Handlers
  filterUpdate();
});