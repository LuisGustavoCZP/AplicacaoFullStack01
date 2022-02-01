function NewUser ()
{
    const nuser = {
        "name":document.getElementById("input-name").value,
        "email":document.getElementById("input-email").value,
        "extension":document.getElementById("input-ext").value,
        "birthDay":document.getElementById("input-birth").value,
        "sector":document.getElementById("input-sector").value
    };

    if(nuser.name == undefined || nuser.email == undefined || nuser.extension == undefined || nuser.birthDay == undefined || nuser.sector == undefined)
    {
        alert("Complete todos os requisitos para criar um novo usuario!");
        return;
    }

    fetch("http://localhost:3000/newclient", 
    {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(nuser),
        headers: { 'Content-Type': 'application/json' }
    })
    .then((resp) => resp.json())
    .then(function (data) {
        //console.log('Request succeeded with JSON response', data);
        console.log(data);
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });

    return nuser;
}