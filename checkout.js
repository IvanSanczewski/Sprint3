
// Exercise 6
function validate() {
	var error = 0;
	// Get the input fields
	var fName = document.getElementById("fName").value;
	var fEmail = document.getElementById("fEmail").value;
	var fAddress = document.getElementById("fAddress").value;
	var fLastN = document.getElementById("fLastN").value;
	var fPassword = document.getElementById("fPassword").value;
	var fPhone = document.getElementById("fPhone").value;


	// Get the error elements
	var errorName = document.getElementById("errorName");
	var errorEmail = document.getElementById("errorEmail");
	var errorAddress = document.getElementById("errorAddress");
	var errorLastN = document.getElementById("errorLastN");
	var errorPassword = document.getElementById("errorPassword");
	var errorPhone = document.getElementById("errorPhone");


	// Validate fields entered by the user: name, phone, password, and email

	if(fName == "" || fName == null || fName.length < 3 || fName.match(/[0-9]/) || fName.match(/[!@_#*%$&<>/()^-]/)){
		errorName.previousElementSibling.classList.add('is-invalid');
		error++;
	} else {
		errorName.previousElementSibling.classList.add('is-valid');
	}

	var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;	
	if(fEmail == "" || fEmail == null || fEmail.length < 3 || !expReg.test(fEmail)){
		errorEmail.previousElementSibling.classList.add('is-invalid');
		error++;
	} else {
		errorEmail.previousElementSibling.classList.add('is-valid');
	}

	if(fAddress == "" || fAddress == null || fAddress.length < 3){
		errorAddress.previousElementSibling.classList.add('is-invalid');
		error++;
	} else {
		errorAddress.previousElementSibling.classList.add('is-valid');
	}

	if(fLastN == "" || fLastN == null || fLastN.length < 3 || fLastN.match(/[0-9]/) || fLastN.match(/[!@_#*%$&<>/()^-]/)) {
		errorLastN.previousElementSibling.classList.add('is-invalid');
		error++;
	} else {
		errorLastN.previousElementSibling.classList.add('is-valid');
	}

	if(fPassword == "" || fPassword == null || fPassword.length < 8 || !fPassword.match(/[A-z]/) || !fPassword.match(/[0-9]/)) {
		errorPassword.previousElementSibling.classList.add('is-invalid');
		error++;
	} else {
		errorPassword.previousElementSibling.classList.add('is-valid');
	}

	if(fPhone == "" || fPhone == null || fPhone.length !== 9 ){
		errorPhone.previousElementSibling.classList.add('is-invalid');
		error++;
	} else {
		errorPhone.previousElementSibling.classList.add('is-valid');
	}

	if(error>0){
		alert("Error");
	}else{
		alert("OK");
	}

	return false;
}