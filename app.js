require('dotenv').config()
const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async()=> {
    let opt;
    const busquedas = new Busquedas();
    do{
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                const lugar = await leerInput('Ingrese el Lugar a buscar: ');

                const lugares = await busquedas.lugar(lugar);

                const idLugar = await listarLugares(lugares);

                if(idLugar === '0') continue;
                const lugarSelec = lugares.find(l => l.id===idLugar);

                busquedas.agregarHistorial(lugarSelec.nombre);

                const clima = await busquedas.buscarClimaLugar(lugarSelec.lat,lugarSelec.lng);


                console.log('\nInformacion del Lugar\n'.green);
                console.log('Lugar:', lugarSelec.nombre);
                console.log('Lat:' ,lugarSelec.lat);
                console.log('Lgn:',lugarSelec.lng);
                console.log('Temperatura:',clima.temp);
                console.log('Descripcion:',clima.desc);
                console.log('Minima:',clima.min);
                console.log('Maxima:',clima.max);

                break;
        
            case 2:
                busquedas.historialCapitalizado.forEach((lugar,i) => {
                    idx = `${i + 1}.`.blue
                    console.log(`${idx} ${lugar}`);
                })
                break;
        }

        if(opt!== 0) await pausa();
    }while(opt !==0);;

};

main();