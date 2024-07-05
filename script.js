function resolverMochila() {
    const capacidad = parseInt(document.getElementById('capacidad').value);
    const pesos = document.getElementById('pesos').value.split(',').map(Number);
    const valores = document.getElementById('valores').value.split(',').map(Number);

    const n = valores.length;
    const dp = Array.from({ length: n + 1 }, () => Array(capacidad + 1).fill(0));
    
    const barraProgreso = document.getElementById('progreso');
    barraProgreso.style.width = '0%';

    for (let i = 0; i <= n; i++) {
        for (let w = 0; w <= capacidad; w++) {
            if (i === 0 || w === 0) {
                dp[i][w] = 0;
            } else if (pesos[i - 1] <= w) {
                dp[i][w] = Math.max(valores[i - 1] + dp[i - 1][w - pesos[i - 1]], dp[i - 1][w]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
        barraProgreso.style.width = `${((i / n) * 100).toFixed(2)}%`;
    }

    const resultado = document.getElementById('resultado');
    resultado.textContent = `Valor máximo en la mochila = ${dp[n][capacidad]}\n\n`;

    // Para mostrar los elementos incluidos en la mochila
    let w = capacidad;
    resultado.textContent += 'Elementos incluidos:\n';
    for (let i = n; i > 0 && w > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            resultado.textContent += `Elemento ${i} (peso: ${pesos[i - 1]}, valor: ${valores[i - 1]})\n`;
            w -= pesos[i - 1];
        }
    }
}
