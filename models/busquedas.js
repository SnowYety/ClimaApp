const fs = require('fs');
const axios = require('axios').default;

class Busquedas {

    historial = [];
    dbPath = './db/database.json';

    constructor (){
        this.leerDb();
    }

    get historialCapitalizado(){
        return this.historial.map( lugar => {

            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );

            return palabras.join(' ')

        })
    }

    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_key,
                    'limit': 5,
                    'language': 'es'
        }
    }

   get paramsOpenWeather(){
        return {
            appid:process.env.OPENWEATHER_KEY,
            units:'metric',
            lang:'es'
        }
    }
    async lugar(lugar=''){
        try {
            
            const instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            })
            const lugares = await instance.get();

            return lugares.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))
        } catch (error) {
            return [];
        }
       
    }

    async buscarClimaLugar(lat,lon){
        try {

            const instances = axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenWeather,lat,lon}
            })
            const clima = await instances.get();
            const { weather,main}=clima.data;
            return  {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            };
        } catch (error) {
            console.log(error)

            return error;
        }
    }

    agregarHistorial(lugar =''){
        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return;
        }

        this.historial = this.historial.splice(0,5);
        
        this.historial.unshift(lugar.toLocaleLowerCase());

        this.guardarDb();
    }

    guardarDb(){

        const payload = {
            historial : this.historial
        };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDb(){
        if(!fs.existsSync(this.dbPath)){
            return null;
        }

        const info = fs.readFileSync(this.dbPath,{encoding: 'utf-8'});
        const data = JSON.parse(info);

        this.historial = data.historial;
    }
}


module.exports = Busquedas