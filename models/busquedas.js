const axios = require('axios').default;

class Busquedas {

        async lugar(lugar=''){
            const lugares = await axios.get('https://reqres.in/api/users?page=2');

            console.log(lugares);
            return [];
        }
}


module.exports = Busquedas