function Consulta (label, action, input)
{
    return {
        label,
        action,
        input
    };
}

function OnChangeTypes (t) 
{
    const type = parseInt(t);
    const consultaAtual = consultas[type];
    console.log("Tipo selecionado foi  "+ type);
    
    if(consultaAtual.input)
    {
        boxConsulta.classList.remove("hidden");
        labelConsulta.innerText = consultaAtual.input.label;
        inputConsulta.type = consultaAtual.input.type;
        inputConsulta.name = "n";
        inputConsulta.value = "";
        consultaConfig = {
            route:consultaAtual.action,
            param: "n"
        };
    }
    else
    {
        boxConsulta.classList.add("hidden");
        labelConsulta.innerText = "";
        inputConsulta.name = "";
        consultaConfig = {
            route:consultaAtual.action,
            param: undefined
        };
    }
}

function CreateItem (item)
{
    const li = document.createElement("li");
    const idEl = document.createElement("h4");
    idEl.innerText = item.id;
    li.append(idEl);
    const nameEl = document.createElement("h5");
    nameEl.innerText = item.name;
    li.append(nameEl);
    const sectorEl = document.createElement("h5");
    sectorEl.innerText = item.sector;
    li.append(sectorEl);
    const emailEl = document.createElement("h5");
    emailEl.innerText = item.email;
    li.append(emailEl);
    const birthEl = document.createElement("h6");
    birthEl.innerText = item.birthDay;
    li.append(birthEl);
    const extensionEl = document.createElement("h5");
    extensionEl.innerText = item.extension;
    li.append(extensionEl);
    return li;
}

var consultaConfig;
const inputConsulta = document.getElementById("input-consulta");
const labelConsulta = document.getElementById("label-consulta");
const outputConsulta = document.getElementById("output-consulta");
const boxConsulta = labelConsulta.parentElement;
const consultas = 
[
    Consulta("Aniversariantes", "bybirthmount", {label:"Mês", type:"number"}),
    Consulta("Por Setor", "bysector", {label:"Setor", type:"text"}),
    Consulta("Ramais", "ramals", undefined)
];

function CreateTypes () {
    const tipoConsulta = document.getElementById("tipo-consulta");
    tipoConsulta.onchange = evt => {OnChangeTypes (evt.target.value)};
    let i = 0;
    consultas.forEach(item => 
    {
        const optEl = document.createElement("option");
        optEl.textContent = item.label;
        optEl.value = i++;
        //optEl.onselect = x => {OnChangeType (i++)};
        tipoConsulta.append(optEl);
    });
}

function Consultar () 
{ 
    fetch("http://localhost:3000/"+consultaConfig.route+"?"+(consultaConfig.param ? consultaConfig.param+"="+inputConsulta.value : ""))
    .then((resp) => resp.json())
    .then(function (data) {
        console.log(data);
        outputConsulta.innerHTML = "";
        if(data) {
            data.forEach(item => 
            {
                
                outputConsulta.append(CreateItem (item));
            });
        }
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}

CreateTypes ();
OnChangeTypes(0);