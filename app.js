const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async()=> {
    let opt;
    const busquedas = new Busquedas;
    do{
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                const lugar = leerInput('Ingrese el Lugar a buscar: ');

                const lugares = busquedas.lugar(lugar);

                console.log('\nInformacion del Lugar\n'.green);
                console.log('Lugar:');
                console.log('Lat:');
                console.log('Lgn:');
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