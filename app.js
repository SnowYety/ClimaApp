require('dotenv').config()
const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async()=> {
    let opt;
    const busquedas = new Busquedas;
    do{
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                const lugar = await leerInput('Ingrese el Lugar a buscar: ');

                const lugares = await busquedas.lugar(lugar);

                const idLugar = await listarLugares(lugares);

                const lugarSelec = lugares.find(l => l.id===idLugar)

                busquedas.buscarClimaLugar(lugarSelec.lat,lugarSelec.lng);


                console.log('\nInformacion del Lugar\n'.green);
                console.log('Lugar:', lugarSelec.nombre);
                console.log('Lat:' ,lugarSelec.lat);
                console.log('Lgn:',lugarSelec.lng);
                console.log('Temperatura:');
                console.log('Lugar:');
                console.log('Minima:');
                console.log('Maxima:');

                break;
        
            default:
                break;
        }

        if(opt!== 0) await pausa();
    }while(opt !==0);;

};

main();