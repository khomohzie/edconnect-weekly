// UPDATING THE NAVBAR IN ALL PAGES TO SHOW THAT THE USER HAS LOGGED IN

// Check for cookie on page load

window.addEventListener("load", function() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('uid'))
        .split('=')[1];
    if (cookieValue) {
        //alert(cookieValue);
        fetch("/api/users", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors',
            cache: 'default'
        })
            .then(function(res) {
                return res.json()
            })
            .then( (output) => {
                var navSignup = document.getElementById("hidesignup");

                navSignup.style.display = 'none';

                var navLogin = document.getElementById("hidelogin");

                navLogin.style.display = 'none';

                var navLogout = document.getElementById("logout");

                navLogout.style.display = 'inline';

                var navUsername = document.getElementById("username");

                navUsername.style.display = 'inline';

                //var usernameText = document.getElementById("usernametext");

                //usernameText.style.color = 'white';

                //usernameText.textContent = "Hi, " + output[0].firstname;

                return output;
            })
            .then( (specificOutput) => {
                for (var i = 0; i < specificOutput.length; i++) {
                    if (specificOutput[i].id == cookieValue) {
                        var usernameText = document.getElementById("usernametext");

                        usernameText.style.color = 'white';
                        usernameText.textContent = "Hi, " + specificOutput[i].firstname;
                        break;
                    }
                    else {
                        console.error();
                    }
                }

                return specificOutput;
            })
            .then( (checkOutput) => {
                var logoutFunc = document.getElementById("logout");

                var onLogoutClick = function() {
                    document.cookie = `uid=; expires=Thu, 01 Jan 1970T00:00:00Z`;

                    window.location.href = "index.html";
                }

                logoutFunc.addEventListener("click", onLogoutClick);

                return checkOutput;
            })
            .catch( (error) => {
                console.log('ERROR:', error.message);
            })
    }
})


var registerHtmlFile = document.getElementById("registerhtml");

if ( registerHtmlFile ) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json')


    // Sending a GET request using the fetch API to populate my program select list.

    const programs = new Request('/api/programs', {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
    });


    //const ul = document.getElementById('program');  Get the list where we will place our programs

    //const url = '/api/programs';

    fetch(programs)
    .then( function(res) {
        if (res.status == 200) {
            return res.json();
        }
        else {
            throw new Error('cannot GET/api/programs');
        }
    })
    .then( (data) => {
        console.log(data);
        //let jsonData = JSON.stringify(data);
        //console.log(jsonData);
        //return jsonData;
        return data;
    })
    .then( (output) => {
        console.log(output);
        /*
        var prog1 = document.createElement("option");
        var ul = document.getElementById('program').appendChild(prog1);
        console.log(ul);
        prog1.textContent = output[0];
        console.log(prog1.textContent);
        console.log(prog1);
        */

        let allProg = [];
        for (var i = 0; i < output.length; i++) {
            var prog = document.createElement("option");
            var ul = document.getElementById('program').appendChild(prog);
            console.log(ul);
            prog.textContent = output[i];
            //console.log(prog.textContent);
            //console.log(prog);
            allProg.push(ul);
        }
        console.log(allProg);

        return allProg;
    })
    .catch( (error) => {
        console.log('ERROR:', error.message);
    })


    // Sending a GET request using the fetch API to populate my graduation select list.

    const graduationYears = new Request('/api/graduationYears', {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
    });

    fetch(graduationYears)
    .then( function(res) {
        if (res.status == 200) {
            return res.json();
        }
        else {
            throw new Error('cannot GET/api/graduationYears');
        }
    })
    .then( (data) => {
        console.log(data);
        return data;
    })
    .then( (output) => {
        console.log(output);
        
        let allGradYears = [];

        for (var i = 0; i < output.length; i++) {
            let gradYears = document.createElement('option');
            let ul = document.getElementById('graduationYear').appendChild(gradYears);
            
            gradYears.textContent = output[i];
            console.log(ul);

            allGradYears.push(ul);
        }
        console.log(allGradYears);
        
        return allGradYears;
    })
    .catch( (error) => {
        console.log('ERROR:', error.message);
    })


    // Sending a POST request containing the user's inputs using the fetch API to /api/request.

    // First find and store the element/form we want to listen to.

    var signupForm = document.getElementById('signupForm');

    // Defining the function that will be called.

    var onFormSubmit = function(event) {

    event.preventDefault(); //Without preventing the default, the browser would attempt to navigate to the URL of the form action attribute when the form is submitted.

    // Now, get the data to work with

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var matricNumber = document.getElementById("matricNumber").value;
    var program = document.getElementById("program").value;
    var graduationYear = document.getElementById("graduationYear").value;


    // fetch POST request

    fetch("/api/register", {
        method: 'POST',
        body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
            matricNumber: matricNumber,
            program: program,
            graduationYear: graduationYear
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
        .then(async function (res) {
            if (res.status == 200) {
                var response = await res.json()
                console.log(response);

                let name = "uid";
                let value = response.data.id;
                console.log(name, value);
                
                document.cookie = `${name}=${value}expires=Fri, 18 Oct 2020 17:00:40 GMT`;

                window.location.href = "index.html";

                return res;

                /* Okay, so basically my challenge has been that I've been calling the response.json() which will return the body of the response in json format together with the unique id attributed to data (response.data.id) after calling for the id in it. Now, this is a script, it runs line by line. So, calling the id from the response.json will be like "I can't find no id in any json." So, all I had to do was call for response.json before calling for id. So, I stored it in a variable, then used the variable to call it. Now, what the hell is 'await'? Now, res.json() returns a promise too which will be pending so I can't take anything from it. So, it needs to fulfill its promise before I can do anything which is why I said I will 'await' it. And you can't use await without 'async' */
            }
            else {
                var error = document.getElementById("alert");

                error.style.display = "block";

                error.innerHTML = "<p>A user with specified email address already exists</p><p>A user with specified matric number already exists</p>";
            }
        })
        .then( (data) => {
            console.log(data);
        })
        .catch( (err) => {
            console.log('ERROR:', err.message);
        })
    }

    // Then add the event listener for the form and function.

    signupForm.addEventListener("submit", onFormSubmit);
}


// Implementing the user login such that when the login button is pressed, the user will be able to login.

var loginHtmlFile = document.getElementById("loginhtml");

if (loginHtmlFile) {
    // Store the element we'll be working on in a variable going forward.

    var loginForm = document.getElementById("loginForm");

    // The function when submitted

    var onLoginSubmit = function(e) {
        e.preventDefault();

        // Refer to the value of the fields.

        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        // POST request using the fetch api.

        fetch("/api/login", {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
            .then( async function(res) {
                if (res.status == 200) {
                    var response = await res.json();

                    let name = "uid";
                    let value = response.data.id;
                    let date = new Date();

                    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000) );

                    var expire = 'expires=' + date.toUTCString();

                    document.cookie = name + '=' + value + ';' + expire;

                    window.location.href = "index.html";

                    return res;
                }
                else {
                    var error = document.getElementById("alert");

                    error.style.display = "block";

                    error.innerHTML = "<p>Invalid email/password</p>"; 
                }
            })
            .then( (data) => {
                console.log(data);
            })
            .catch( (error) => {
                console.log('ERROR:', error.message);
            })
    }

    // Add the event listener to the form/element.

    loginForm.addEventListener("submit", onLoginSubmit);
}


var createHtmlFile = document.getElementById("createhtml");

if (createHtmlFile) {

    window.addEventListener("load", function() {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('uid'))
            .split('=')[1];
        if (!cookieValue) {
            alert("Log in");
            window.location.href = "login.html"
        }
    })
    
    // Sending a POST request containing the create project inputs using the fetch API to /api/projects.

    // First find and store the element/form we want to listen to.

    var createProjectForm = document.getElementById('createProjectForm');

    // Defining the function that will be called.

    var onFormContinue = function(event) {

        event.preventDefault(); //Without preventing the default, the browser would attempt to navigate to the URL of the form action attribute when the form is submitted.

        // Now, get the data to work with

        var name = document.getElementById("name").value;
        var abstract = document.getElementById("abstract").value;
        var authors = document.getElementById("authors").value;
        var tags = document.getElementById("tags").value;
        

        // fetch POST request

        fetch("/api/projects", {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                abstract: abstract,
                authors: authors,
                tags: tags,
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
            .then(function(res) {
                if (res.status == 200) {
                    window.location.href = "index.html";
                }
                else {
                    var projAlert = document.getElementById("projAlert");

                    projAlert.style.display = 'block';

                    projAlert.innerHTML = res.statusText;
                }
                return res;
            })
            .catch((err) => {
                console.log('ERROR:', err.message);
            })
    }

    // Then add the event listener for the form and function.

    createProjectForm.addEventListener("submit", onFormContinue);
}


// Update the project list on the home page.

var indexHtmlFile = document.getElementById("indexhtml");

if (indexHtmlFile) {

    // Send a GET request to /api/projects

    fetch("/api/projects", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        mode: 'cors',
        cache: 'default'
    })
        .then(function(res) {
            return res.json();
        })
        .then( (output) => {
            
            var showProjTile1 = document.getElementById("projTitle1");
            var showProjAuthor1 = document.getElementById("projAuthor1");
            var showProjAbstract1 = document.getElementById("projAbstract1");
            var showProjTag1 = document.getElementById("projTag1");

            var showProjTile2 = document.getElementById("projTitle2");
            var showProjAuthor2 = document.getElementById("projAuthor2");
            var showProjAbstract2 = document.getElementById("projAbstract2");
            var showProjTag2 = document.getElementById("projTag2");

            var showProjTile3 = document.getElementById("projTitle3");
            var showProjAuthor3 = document.getElementById("projAuthor3");
            var showProjAbstract3 = document.getElementById("projAbstract3");
            var showProjTag3 = document.getElementById("projTag3");

            var showProjTile4 = document.getElementById("projTitle4");
            var showProjAuthor4 = document.getElementById("projAuthor4");
            var showProjAbstract4 = document.getElementById("projAbstract4");
            var showProjTag4 = document.getElementById("projTag4");

            for (var i = 0; i < output.length; i++) {
                showProjTile1.textContent = output[0].name;
                showProjAuthor1.textContent = output[0].authors;
                showProjAbstract1.textContent = output[0].abstract;
                showProjTag1.textContent = output[0].tags;

                showProjTile2.textContent = output[1].name;
                showProjAuthor2.textContent = output[1].authors;
                showProjAbstract2.textContent = output[1].abstract;
                showProjTag2.textContent = output[1].tags;

                showProjTile3.textContent = output[2].name;
                showProjAuthor3.textContent = output[2].authors;
                showProjAbstract3.textContent = output[2].abstract;
                showProjTag3.textContent = output[2].tags;

                showProjTile4.textContent = output[3].name;
                showProjAuthor4.textContent = output[3].authors;
                showProjAbstract4.textContent = output[3].abstract;
                showProjTag4.textContent = output[3].tags;
            }

            return output;
        })
        .catch( (error) => {
            console.log('ERROR:', error.message);
        })
}


// Updating the viewProject page.

var viewHtmlFile = document.getElementById("viewhtml");

if (viewHtmlFile) {
    
    // Send a GET request to /api/projects/{id}

    fetch("/api/projects/qsf52khk5isu", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        mode: 'cors',
        cache: 'default'
    })
        .then(function(res) {
            return res.json();
        })
        .then( (output) => {

            var projName = document.getElementById("project_name");
            var projAuthor = document.getElementById("project_authors");
            var projAbstract = document.getElementById("project_abstract");
            var projTag = document.getElementById("project_tags");

            projName.textContent = output.name;
            projAuthor.innerHTML = "<p>" + output.authors[0] + "</p>" + "<p>" + output.authors[1] + "</p>";
            projAbstract.textContent = output.abstract;
            projTag.textContent = output.tags;
        })
        .catch( (err) => {
            console.log('ERROR:', err.message);
        })

    
    // I need to update the createdBy. So, I'm sending a GET request to /api/users/{id}
    
    fetch("/api/users/qsf52khk5isu", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        mode: 'cors',
        cache: 'default'
    })
        .then(function(res) {
            return res.json();
        })
        .then( (output) => {
            
            var proj_author = document.getElementById("project_author");

            proj_author.textContent = output.firstName + " " + output.lastName;

            return output;
        })
        .catch( (err) => {
            console.log('ERROR:', err.message);
        })
}