require('colors');
const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type:'list',
        name:'opciones',
        message:'¿Que desea Hacer ?',
        choices:[
            {
                value:1,
                name:`${'1.'.magenta.bold} Buscar Lugar `
            },
            {
                value:2,
                name:`${'2.'.magenta.bold} Historial de lugares`
            },
            {
                value:0,
                name:`${'0.'.magenta.bold} Salir`
            }
        ]
    }
]

//Funcion para imprimir el menu en consola 
const inquirerMenu = async() => {
    console.clear();
    console.log('=================================='.white);
    console.log('   Seleccione Una Opcion'.white);
    console.log('==================================\n'.white);

    const {opciones} = await inquirer.prompt(preguntas);
    return opciones
};

const pausa = async()=>{
    let question = [
        {
            type: 'input',
            name:'enter',
            message:`Presione ${'ENTER'.blue} para continuar`
        }
    ]
    console.log('\n')
    await inquirer.prompt(question);
}


const leerInput = async(mensaje) =>{
        const question= [
            {
                type:'input',
                name:'desc',
                message: mensaje,
                validate(value){
                    if(value.length === 0 ){
                        return 'Por favor ingresa un valor';
                    }
                    return true;
                }
            }
        ]

        const {desc}= await inquirer.prompt(question);

        return desc;

}

const listadoTareasBorrar = async(tareas = [])=>{
    const choices = tareas.map((tarea,i) => {
        const idx = `${i +1}.-`.green
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value:'0',
        name:'0.-'.green +'Cancelar'
    })

    const preguntas = [
        {
            type:'list',
            name:'id',
            message:'Borrar',
            choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas)
    return id
}

const mostrarListadoCheksList = async(tareas = [])=>{
    const choices = tareas.map((tarea,i) => {
        const idx = `${i +1}.-`.green
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked:(tarea.completadoEn)? true :false
        }
    });
    const preguntas = [
        {
            type:'checkbox',
            name:'ids',
            message:'Selecciones',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(preguntas)
    return ids
}

const confirmar = async(message = '') => {
    const question = [{
        type:'confirm',
        name:'ok',
        message
    }]

    const {ok} = await inquirer.prompt(question);
    return ok;
}

module.exports={
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheksList
}
