const calendar = document.getElementById(calendario.divId)

calendar.classList.add(`bg-[${calendario.config.bgColor}]`)
calendar.classList.add(`rounded-[${calendario.config.cornerRadius}px]`)

var cambioMeses = 0

crearBarraSuperior(new Date())

function crearBarraSuperior(date) {
    calendar.innerHTML = `<div class="flex items-center justify-between py-2 px-6">
        <div>
            <span class="text-lg font-bold text-gray-800">${calendario.meses[date.getMonth()]}</span>
            <span class="ml-1 text-lg text-gray-600 font-normal">${date.getFullYear()}</span>
        </div>
        <div class="w-full">
        </div>
        <div class="px-1 w-[220px] mr-[20px]" style="padding-top: 2px;">
            <select id="calendario-time" class="text-gray-900 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="año">Año</option>
                <option value="mes" selected>Mes</option>
                <option value="semana">Semana</option>
                <option value="dia">Dia</option>
            </select>
        </div>
        <div class="border rounded-lg px-1 min-w-[90px]" style="padding-top: 2px;">
            <button type="button" onClick="anteriorMes()" class="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center">
                <svg class="h-6 w-6 text-gray-500 inline-flex leading-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>  
            </button>
            <div class="border-r inline-flex h-6"></div>		
            <button type="button" onClick="siguienteMes()" class="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center">
                <svg class="h-6 w-6 text-gray-500 inline-flex leading-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>									  
            </button>
        </div>
    </div>`


    crearCuerpoMes(date)
    
}

function crearCuerpoSemana() {
    
}

function crearCuerpoMes(date) {

    var fecha = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-01`);
    var diaSemana = fecha.getDay();
    var diasTranscurridos = (diaSemana >= 1) ? diaSemana - 1 : 6;

    var diasVaciosPrincipioMes = ``
    var diasMes = ``
    var diasVaciosFinalMes = ``

    for (let i = 0; i < diasTranscurridos + 1; i++) {
        diasVaciosPrincipioMes += `<div style="width: 14.28%; height: 120px" class="text-center border-r border-b px-4 pt-2"></div>`
    }

    var fechaDia = new Date(date.getFullYear(), date.getMonth(), 1)

    for (let i = 0; i < obtenerDiasDelMes(date.getFullYear(), date.getMonth()); i++) {
        fechaDia.setDate(i + 1)
        const objetosFiltrados = encontrarPorFecha(calendario.eventos, fechaDia);
        var tasks = []
        for (let a = 0; a < objetosFiltrados.length; a++) {
            tasks += `<a href="${objetosFiltrados[a].url}"><div class="px-2 py-1 rounded-lg mt-1 overflow-hidden border border-[${objetosFiltrados[a].color}] text-[${objetosFiltrados[a].color}] bg-[${objetosFiltrados[a].color}40]">
            <p class="text-sm truncate leading-tight">${objetosFiltrados[a].title}</p>
        </div></a>`
        }
        diasMes += `<div style="width: 14.28%; height: 120px" class="px-4 pt-2 border-r border-b relative">
            <div onClick="showEventModal(${fechaDia})" class="inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100 text-gray-700 hover:bg-blue-200">${i+1}</div>
            ${tasks}
        </div>`
    }

    for (let i = 7; i > fechaDia.getDay() + 1; i--) {
        diasVaciosFinalMes += `<div style="width: 14.28%; height: 120px" class="text-center border-r border-b px-4 pt-2"></div>`
    }

    calendar.innerHTML += `<div>
    <div class="flex flex-wrap" style="margin-bottom: -40px;">    
        <div style="width: 14.26%" class="px-2 py-2">
            <div class="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">${calendario.dias[0]}</div>
        </div>
        
        <div style="width: 14.26%" class="px-2 py-2">
            <div class="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">${calendario.dias[1]}</div>
        </div>
        
        <div style="width: 14.26%" class="px-2 py-2">
            <div class="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">${calendario.dias[2]}</div>
        </div>
        
        <div style="width: 14.26%" class="px-2 py-2">
            <div class="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">${calendario.dias[3]}</div>
        </div>
        
        <div style="width: 14.26%" class="px-2 py-2">
            <div class="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">${calendario.dias[4]}</div>
        </div>
        
        <div style="width: 14.26%" class="px-2 py-2">
            <div class="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">${calendario.dias[5]}</div>
        </div>
        
        <div style="width: 14.26%" class="px-2 py-2">
            <div class="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">${calendario.dias[6]}</div>
        </div>
    </div>
    <div class="flex flex-wrap border-t border-l"> 

        ${diasVaciosPrincipioMes}

        ${diasMes}

        ${diasVaciosFinalMes}

    </div>
</div>`
}

function anteriorMes() {
    cambioMeses--
    var fechaNueva = new Date();
    fechaNueva.setMonth(fechaNueva.getMonth() + cambioMeses);
    crearBarraSuperior(fechaNueva)
}

function siguienteMes() {
    cambioMeses++
    var fechaNueva = new Date();
    fechaNueva.setMonth(fechaNueva.getMonth() + cambioMeses);
    crearBarraSuperior(fechaNueva)
}

function obtenerDiasDelMes(mes, año) {
    var fecha = new Date(año, mes - 1, 1); // Establece la fecha al primer día del mes dado
  
    fecha.setMonth(fecha.getMonth() + 1);
    fecha.setDate(fecha.getDate() - 1);
  
    var diasEnMes = fecha.getDate();
    return diasEnMes;
}

function encontrarPorFecha(array, fecha) {

    const obs = []

    for (let i = 0; i < array.length; i++) {
        if (`${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}` === `${array[i].date.getFullYear()}-${array[i].date.getMonth() + 1}-${array[i].date.getDate()}`) {
            obs.push(array[i]);
        }
    }
    return obs; 
}

function handleResize() {
    console.log(calendar.clientWidth)
}
  
calendar.addEventListener('resize', handleResize);
