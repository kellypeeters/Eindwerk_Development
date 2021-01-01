$('#btnInsert').click((e) => {
  e.preventDefault();
    console.log('clicksubmit');
    /*const categoriesoort = document.getElementById("onderwerp").value;
    const voornaam = document.getElementById("fname").value;
    const achternaam = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const bericht = document.getElementById("subject").value; 
    console.log(voornaam);

    let data = {
      categoriesoort: categoriesoort, 
      voornaam: voornaam, 
      achternaam: achternaam, 
      email: email, 
      bericht: bericht 
    };
    
    console.log(data);
  
    $.ajax({
      url: 'http://localhost:5432/post/formulier',
      method: 'POST',
      dataType: 'json',
      data: data
    }).done(function (data, status) {
      alert("Data: " + data + "\nStatus: " + status); 
    }).fail(function (er1, er2) {
      console.log(er1);
      console.log(er2);
    }); */

    $.ajax({
      url: 'http://localhost:5432/get/:alleVragen',
      method: 'GET',  
      dataType: 'json'
    }).done(function (data) {
      for (let b = 0; b < data.length; b++) {
        console.log(data);
        $('#IngeleverdeForms').append(`<p class=\"form\"> ${data[b].value} </p>`);
      }
    }).fail(function (er1, er2) {
      console.log(er1);
      console.log(er2); 
    });
  });  

//Hide quotes and time
/*function showUserQuotes() {
$.ajax({
    url: 'http://127.0.0.0:5432/get/:alleVragen',
    method: 'GET',
    dataType: 'json'
  }).done(function (data) {
    for (let b = 0; b < data.length; b++) {
      console.log(data);
      $('#IngeleverdeForms').append(`<p class=\"form\"> ${data[b].value} </p>`);
    }
  }).fail(function (er1, er2) {
    console.log(er1);
    console.log(er2);
  });*/