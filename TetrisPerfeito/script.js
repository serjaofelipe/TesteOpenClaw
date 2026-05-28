const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');

let peças = [
    [[1, 1],
     [1, 1]],

    [[1, 1, 1, 1]],

    [[1, 1, 0],
     [0, 1, 1]],

    [[0, 1, 1],
     [1, 1, 0]],

    [[1, 1, 1],
     [0, 1, 0]],

    [[1, 1, 1],
     [1, 0, 0]],

    [[1, 1, 1],
     [0, 0, 1]]
];

let peçaAtual = {
    x: 0,
    y: 0,
    forma: peças[0]
};

function desenhaPeça() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < peçaAtual.forma.length; i++) {
        for (let j = 0; j < peçaAtual.forma[i].length; j++) {
            if (peçaAtual.forma[i][j] === 1) {
                ctx.fillStyle = 'black';
                ctx.fillRect(j * 20 + peçaAtual.x, i * 20 + peçaAtual.y, 20, 20);
            }
        }
    }
}

desenhaPeça();