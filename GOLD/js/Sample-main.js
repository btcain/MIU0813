$('#home').on('pageinit', function(){
if (localStorage.length <= 0) {
    var myJSON = confirm("Would you like to create sample contacts??");
    if (myJSON === true) {

        for (var i = 0; i < objItems.length; i++) {
            localStorage.setItem(objItems[i].id, JSON.stringify(objItems[i]));
        }
    } else {
        alert("Ok, I won't add any contacts for you.");
    }
}

});	
		
$('#additem').on('pageinit', function(){

		var myForm = $('#myform');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			addNew();
		}
	});
	
});



function caller() {
document.getElementById("myList").innerHTML = "";
console.log("running caller");
document.getElementById("bubbleCount").innerText = localStorage.length;
document.getElementById("bBubbleCount").innerText = localStorage.length;
document.getElementById("addBubbleCount").innerText = localStorage.length;
    if (localStorage.length === 0) {
        document.getElementById("myContent").innerHTML = "<p>You haven't added any friends yet!</p>";
    } else {
        for (var i = 0, j = localStorage.length; i < j; i++) {
            var container = document.getElementById("myList");
            var key = localStorage.key(i);
                var retrievedObject = localStorage.getItem(key);
                container.innerHTML = (container.innerHTML +("<li id='" + JSON.parse(retrievedObject).id + "'><a href='#details' data-ajax='false' onClick='updateDetails(" + JSON.parse(retrievedObject).id + ")'><h3>" + JSON.parse(retrievedObject).fName + " " +JSON.parse(retrievedObject).lName + "</h3></a>"));
                
            
        }
		sortUnorderedList("myContent");
		console.log("running sorty");
    }
};

// This block of code takes the Unordered List, puts it into an array, then sorts that array. For some reason it doesn't like it when I put in the "onclick" function on a link, though.. 
function sortUnorderedList(ul, sortDescending) {
  if(typeof ul == "string")
    ul = document.getElementById(ul);


  // Get the list items and setup an array for sorting
  var lis = ul.getElementsByTagName("LI");
  var vals = [];

  // Populate the array
  for(var i = 0, l = lis.length; i < l; i++)
    vals.push(lis[i].innerHTML);

  // Sort it
  vals.sort();

  // Sometimes you gotta DESC
  if(sortDescending)
    vals.reverse();

  // Change the list on the page
  for(var i = 0, l = lis.length; i < l; i++)
    lis[i].innerHTML = vals[i];
};

function updateDetails(key){
var retrievedObject = localStorage.getItem(key);
document.getElementById("myDetails").innerHTML = "<li id='" + JSON.parse(retrievedObject).id + "'><h3>" + JSON.parse(retrievedObject).fName + " " +JSON.parse(retrievedObject).lName + "</h3> <br><p>" + "Address: " + JSON.parse(retrievedObject).address + "<br>" + "Email: " + JSON.parse(retrievedObject).email + "<br>" + "Phone: " + JSON.parse(retrievedObject).phone + "<br>" + "Favorite? " + JSON.parse(retrievedObject).fav + "<br><a href='#browse' data-role='button' data-icon='delete' data-corners='true' data-theme='c' data-iconpos='notext' data-inline='true' onClick='deleteme(" + JSON.parse(retrievedObject).id + ");'>Delete</a><a href='#' data-role='button' data-icon='gear' data-corners='true' data-theme='c' data-iconpos='notext' data-inline='true' onClick='editMe(" + JSON.parse(retrievedObject).id + ");'>Edit</a></p></li>"
};

function deleteme(key){
var cm = confirm("Are you sure you want to delete this contact?");
if (cm === true){
	localStorage.removeItem(key);
	document.location.href = "#browse";A
	document.location.reload(true);
	}else{
		alert("Action Cancelled");
	}
}

function deleteAll(){
	var confirmation = confirm("Are you sure you wish to delete ALL contacts? This is irreversable!")
	if (confirmation === true) {
localStorage.clear();
alert("Ok, i've deleted all your contacts.");
location.href="#home";
location.reload();
    } else {
        alert("Ok, I'll keep your contacts!");
        
    }
};

function editMe(key){
var retrievedObject = localStorage.getItem(key);
document.location.href = "#additem";
console.log(retrievedObject);
document.getElementById("fName").value = JSON.parse(retrievedObject).fName;
document.getElementById("lName").value = JSON.parse(retrievedObject).lName;
document.getElementById("pAddress").value = JSON.parse(retrievedObject).address;
document.getElementById("email").value = JSON.parse(retrievedObject).email;
document.getElementById("pNumber").value = JSON.parse(retrievedObject).phone;
document.getElementById("fav").value = JSON.parse(retrievedObject).fav;
localStorage.removeItem(key);
};

/*
$('div').on('pagehide',function(event, ui){
console.log(event);
console.log(event.currentTarget.id);
if(event.currentTarget.id === "details"){
	console.log("details?");
	$.mobile.activePage.attr("id")
}else{
	console.log("Not details?");
	$.mobile.activePage.attr("id")
		
}
*/

  //location.reload();
	
function addNew() {
    var nEntry = {
        id: localStorage.length,
        fName: document.getElementById("fName").value,
        address: document.getElementById("pAddress").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("pNumber").value,
        lName: document.getElementById("lName").value,
        fav: document.getElementById("fav").value
    };
    localStorage.setItem(nEntry.id, JSON.stringify(nEntry));
    console.log(localStorage);
    console.log(nEntry);
    window.location = "#home";
    caller();
};	

window.onload= 	caller();