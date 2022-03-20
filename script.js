
const listaPokemon = () => 
{
    var lista = document.getElementById("datalistOptions");
    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=6000&offset=0';
    fetch(url).then((res)=>{
        if(res.status!=200)
        {
            console.log("Error ");
            imgpokemon.setAttribute("src","error.jpg");
        }
        else
        {
            console.log(res);
            return res.json();
        }
        
    }).then((data)=>{
        console.log(data.results);
        data.results.forEach(element => {
            var opt = document.createElement('option');
            opt.value=element.name;
            opt.innerHTML=element.name;
            lista.appendChild(opt);
        });
    })
}


const fetchPokemon = () => 
{
    var pokename = document.getElementById("pokename").value.toLowerCase();
    var imgpokemon = document.getElementById("imgpokemon");
    var nombre = document.getElementById("nombre");
    var tipo = document.getElementById("tipo");
    var movimientos = document.getElementById("movimientos");
    let datos = "";
    let statName=[];
    let statValue=[];
    const url = 'https://pokeapi.co/api/v2/pokemon/'+pokename;
    fetch(url).then((res)=>{
        if(res.status!=200)
        {
            console.log("Error ");
            imgpokemon.setAttribute("src","error.jpg");
        }
        else
        {
            console.log(res);
            return res.json();
        }
        
    }).then((data)=>{
        console.log(data);
        // cambiando imagen
        let pokeimg = data.sprites.front_default;
        imgpokemon.setAttribute("src",pokeimg);
        // cambiando nombre
        nombre.value ="Nombre: "+data.name;
        // cambiando tipo
        data.types.forEach(element => {
            datos=datos+element.type.name+",";
        });
        datos=datos.substring(0,datos.length-1);
        tipo.value="Tipo: "+datos;
        // cambiando stats (barras)
        datos="";
        destruirBarras();
        var maestro = document.createElement("div");
            maestro.setAttribute("id","maestro");
            document.getElementById("estadisticas").appendChild(maestro);
        data.stats.forEach(element => {
            agregarBarra(element.base_stat,element.stat.name);
        });
        // eliminando movimientos
        console.log(movimientos.length)
        var contador=movimientos.length;
        for (var i=0; i<contador; i++) {
                movimientos.remove(0);
        }
        console.log(movimientos.length)
        //cambiando movimientos
        data.moves.forEach(element => {
            var opt = document.createElement('option');
            opt.value=element.move.name;
            opt.innerHTML=element.move.name;
            movimientos.appendChild(opt);
        });
        console.log(movimientos.length)
    })

}
function destruirBarras()
{
    const element = document.getElementById("estadisticas");
    if (element.childElementCount!=0)
    {
        const element2 = document.getElementById("maestro");
        element2.parentNode.removeChild(element2);
    }
}
function agregarBarra(valor,texto)
{
    let color="bg-danger";
    if(valor>=85){color="bg-success";}
    else if(valor>=70 && valor<85){color="bg-warning";}            
    var element = document.createElement("div");
    element.className="progress barras";
    var element2 = document.createElement("div");
    element2.className="progress-bar progress-bar-striped progress-bar-animated "+color;
    element2.setAttribute("role","progressbar");
    element2.setAttribute("aria-valuenow",valor);
    element2.setAttribute("aria-valuemin","0");
    element2.setAttribute("aria-valuemax","100");
    element2.setAttribute("style","width: "+valor+"%");
    element2.setAttribute("value","Total");
    element2.innerHTML=texto.toUpperCase()+" "+valor;
    element.appendChild(element2);
    document.getElementById("maestro").appendChild(element);
}

 