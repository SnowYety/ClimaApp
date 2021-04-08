const { inquirerMenu, pausa } = require("./helpers/inquirer");

const main = async()=> {

    do{
        opt = await inquirerMenu();
        if(opt!== 0) await pausa();
    }while(opt !==0);;

};

main();