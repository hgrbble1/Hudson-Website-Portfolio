


function sendEmail(event) {
  event.preventDefault();
  var email = $("#Email").val();
  var firstName= $("#FirstName").val();
  var lastName = $("#LastName").val();
  var message = $("#Message").val();
  var captcha =$("#g-recaptcha-response").val();
  data = {"email":email, "firstName":firstName, "lastName":lastName, "message":message, "captcha":captcha};

  $.post("/email",{"email":email, "firstName":firstName, "lastName":lastName, "message":message, "captcha":captcha}, function(data, status, xhr) {
    console.log("Sending Request");
    emailSentAnimation();

  })
  .done(function() {
    console.log("Request Done");
  })
  .fail(function(jqxhr, settings, err) {
    console.log(err);
  })
}

function emailSentAnimation() {
  $("#emailMessage").css("opacity","1");
}

$("#button").on("click", sendEmail);
