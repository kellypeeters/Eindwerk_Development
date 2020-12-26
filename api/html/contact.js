   function getInputValue(){ 
        let categoriesoort = document.getElementById("onderwerp").value;
        let voornaam = document.getElementById("fname").value;
        let achternaam = document.getElementById("lname").value; 
        let email = document.getElementById("email").value;
        let bericht = document.getElementById("subject").value;

    let http = new XMLHttpRequest();
    let url = 'http://127.0.0.0:5432/post/formulier';
    http.open('POST', url, true);
    }