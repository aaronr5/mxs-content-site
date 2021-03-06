var loggedIn = false;

// DOM MANIPULATION //
function renderLoginOptions() {
  $('.login').show();
  $('.responsive-login').show();
  $('.user-info').hide();
  $('.user-option').hide();
  $('.log-out').hide();
}

function renderUserOptions(user) {
  $('.login').hide();
  $('.responsive-login-option').hide();
  $('.user-options').show();
  $('.responsive-user-option').show();
  $('.user-name').text(user.username);
}

// Event HANDLERS //
function watchForLogout() {
  $('.log-out').click(function(event) {
    localStorage.removeItem('authToken');
    window.location.href = '/';
  });
}

function mobileMenuClick() {
  $('.menu-button').click(function(event) {
  if ($('.nav').is(':visible')) {
    $('.nav').slideUp();
  } else {
      $('.menubar').css('background', '#333333');
      $('.nav').slideDown();
    }
    });
}

// READY FUNCTION //
$(function() {
  if ($('.menu-button').is(':visible')) {
    $('.nav').hide();
  }

$.ajax({
  type: 'GET',
  url: '/users/me',
  dataType: 'json',
  'headers': {
    'content-type': "application/json",
    'Authorization': localStorage.getItem('authToken')
  }
})
.done(function(data) {
  renderUserOptions(data.user);
  loggedIn = true;
  $('.upload-btn').show();
  $('.loader-wrapper').hide();
})
.fail(function(err) {
  loggedIn = false;
  $('.upload-btn').hide();
  localStorage.clear();
  renderLoginOptions();
  $('.loader-wrapper').hide();
});

$(window).resize(function() {
  if ($('.menu-button').is(':visible')) {
    $('.nav').hide();
  } else if ($('.menu-button').is(':hidden')) {
    $('.nav').show();
    $('.user-nav').show();
  }
});
//initializing event handlers//
watchForLogout();
mobileMenuClick();
});
