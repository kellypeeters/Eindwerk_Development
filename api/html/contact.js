$(document).ready(function() {
    $('#btnInsert').on("click", function (e) {

    e.preventDefault();

    let userObject = {
        voornaam: $('#fname').val(),
        achternaam: $('#lname').val(),
        email: $('#email').val(),
        onderwerp: $('#onderwerp').val(),
        subject: $('#subject').val()
    };

    $.ajax({
        url: 'http://127.0.0.0:5432/post/insertForm',
        method: 'POST',
        data: userObject
    }).done(function (data) {
        alert('yesssss');
        console.log('User inserted');
    }).fail(function (er1, er2) {
        console.log(er1);
        console.log(er2);
    });
});
});