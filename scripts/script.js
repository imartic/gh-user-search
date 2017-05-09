var msg = document.getElementById('msg')
var userData = document.getElementById('userData')


window.onload = function() {
  document.getElementById('user').focus();
}

function search(){
    if(document.getElementById('user').value == '') {
        showMsg("Please enter a username!")
        return;
    }

    msg.style.display = 'none'
    userData.style.display = 'none'
    var request = new XMLHttpRequest()

    request.onload = checkUser
    request.open('get', 'https://api.github.com/users/' + document.getElementById('user').value)
    request.send()
}

function checkUser() {
    var responseObj = JSON.parse(this.responseText)
    console.log(responseObj.name + " has " + responseObj.public_repos + " public repositories!")
    console.log(responseObj, responseObj.message)

    if(typeof responseObj.message !== 'undefined'){
        showMsg("A user by the name \"" + document.getElementById('user').value + "\" does not exist!")
        return
    }

    showUser(responseObj)
}

function showMsg(txt){
    msg.style.display = 'block'
    msg.innerHTML = txt
}

function showUser(user){
    userData.style.display = 'block'
    document.getElementById('listTitle').innerHTML = ((user.name !== null) ? user.name : user.login) + " has " + user.public_repos + " public repositories!"
    document.getElementById('name').innerHTML = (user.name !== null) 
        ? user.name
        : user.login
    document.getElementById('bio').innerHTML = user.bio

    showRepos(user.repos_url)
}

function showRepos(url){
    var request = new XMLHttpRequest()

    request.onload = createReposList
    request.open('get', url)
    request.send()
}

function createReposList(){
    var responseObj = JSON.parse(this.responseText)
    var list = document.getElementById('repos')
    list.innerHTML = ''

    for(var i = 0; i < responseObj.length; i++) {
        var item = document.createElement('li')
        var link = document.createElement('a')
        link.setAttribute('href', responseObj[i].html_url)
        link.appendChild(document.createTextNode(responseObj[i].name))
        item.appendChild(link)
        list.appendChild(item)
    }
    return list
}