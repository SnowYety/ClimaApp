const axios = require('axios').default;

class Busquedas {

    cosntructor (){

    }

    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_key,
                    'limit': 5,
                    'language': 'es'
        }
    }

    paramsOpenWeather(lat,lon){
        return {
            lat,
            lon,
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
                baseURL:`api.openweathermap.org/data/2.5/weather`,
                params: this.paramsOpenWeather(lat,lon)
            })
            const clima = await instances.get();
            console.log(clima.data)
            return  clima;
        } catch (error) {
            console.log(error)

            return error;
        }
    }
}


module.exports = Busquedas