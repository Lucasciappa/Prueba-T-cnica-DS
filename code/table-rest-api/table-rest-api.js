const d = document,
$main = d.querySelector("main"),
$table = d.querySelector(".table"),
$tBody = d.querySelector("tbody")



let capitals = [
    "Buenos Aires",
    "Cordoba",
    "Rosario",
    "Mar del Plata",
    "Bariloche",
    "Mendoza",
    "Madrid",
    "Paris",
    "Barcelona"
];

async function loadWeather(){
    try {
    let url = `http://api.weatherstack.com/current?`;
    let params = new URLSearchParams({
        access_key: "ac9eeb01719974081955c3e7010c2f46",
        query: "Cordoba",
        units: "m"
    });
    let res = await fetch(`${url}${params}`),
     json = await res.json(),
     $template = "";
        
     console.log(json)

     if(!res.ok) throw {status: res.status, statusTest: res.statusText }

     capitals.forEach( async e => {
        //  console.log(e)
         try {

            let params = new URLSearchParams({
                access_key: "ac9eeb01719974081955c3e7010c2f46",
                query: e,
                units: "m"
            });
            let res = await fetch(`${url}${params}`),
            json = await res.json();

            if(!res.ok) throw {status: res.status, statusTest: res.statusText };

            $template += `
            <tr>
            <td data-label="Pais">${json.location.country}</td>
            <td data-label="Ciudad">${json.location.name}</td>
            <td data-label="Fecha">${json.location.localtime.slice(0, -5)}</td>
            <td data-label="Hora Local">${json.location.localtime.slice(-5)} hs</td>
            <td data-label="Nubosidad">${json.current.cloudcover}%</td>
            <td data-label="Temperatura">${json.current.temperature}°C</td>
            <td data-label="Humedad">${json.current.humidity}%</td>
            </tr>
            `

             
        } catch (err) {
            console.warn(err.statusTest || `Ocurrio un error ${err.status}`);
            
        }
    
        $tBody.innerHTML = $template;
});

        
    } catch (err) {
                console.warn(err)
                let message = err.statusTest || `Ocurrio un error`;
                $main.innerHTML = `<p>Error ${err.status}: ${message}</p>`
            }
}

d.addEventListener("DOMContentLoaded", e => loadWeather());