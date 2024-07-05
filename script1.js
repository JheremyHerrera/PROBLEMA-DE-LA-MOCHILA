let numItems = 0;

function agregarItem() {
    numItems++;
    const divItems = document.getElementById("items");
    const nuevoItem = document.createElement("div");
    nuevoItem.innerHTML = `
        <label for="peso${numItems}">Peso del Objeto ${numItems} (kg):</label>
        <input type="number" id="peso${numItems}" min="1">
    `;
    divItems.appendChild(nuevoItem);
}

function calcularViajes() {
    const capacidad = parseInt(document.getElementById("capacidad").value);
    const pesos = [];

    for (let i = 1; i <= numItems; i++) {
        const peso = parseInt(document.getElementById(`peso${i}`).value);
        pesos.push(peso);
    }

    const resultado = mochilaViajes(capacidad, pesos);
    mostrarResultado(resultado);
}

function mochilaViajes(capacidad, pesos) {
    const viajes = [];
    pesos.sort((a, b) => b - a);

    while (pesos.length > 0) {
        let pesoActual = 0;
        let viaje = [];

        for (let i = 0; i < pesos.length; i++) {
            if (pesoActual + pesos[i] <= capacidad) {
                pesoActual += pesos[i];
                viaje.push(pesos[i]);
                pesos.splice(i, 1);
                i--; 
            }
        }

        viajes.push(viaje);
    }

    return viajes;
}

function mostrarResultado(viajes) {
    const resultadoDiv = document.getElementById("resultado");
    let texto = `Número de viajes necesarios: ${viajes.length}\n\n`;

    viajes.forEach((viaje, index) => {
        texto += `Viaje ${index + 1}: ${viaje.join(", ")} kg\n`;
    });

    resultadoDiv.innerText = texto;
}