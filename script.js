// ===== NUMBER ANALYSIS =====
function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++)
        if (n % i === 0) return false;
    return true;
}

function toRoman(num) {
    const map = [
        ["M",1000],["CM",900],["D",500],["CD",400],
        ["C",100],["XC",90],["L",50],["XL",40],
        ["X",10],["IX",9],["V",5],["IV",4],["I",1]
    ];
    let r = "";
    for (let [s,v] of map) {
        while (num >= v) { r += s; num -= v; }
    }
    return r;
}

function isPerfect(n) {
    let sum = 0;
    for (let i = 1; i <= n / 2; i++)
        if (n % i === 0) sum += i;
    return sum === n && n !== 0;
}

function isArmstrong(n) {
    const d = n.toString().split("");
    const sum = d.reduce((a,c) => a + Math.pow(+c, d.length), 0);
    return sum === n;
}

function isFibonacci(n) {
    let a = 0, b = 1;
    while (b < n) [a, b] = [b, a + b];
    return b === n || n === 0;
}

function toggleTheme() {
    document.body.classList.toggle("light");
}

// ===== SEARCH =====
async function searchNumber() {
    const n = parseInt(numberInput.value);
    const result = document.getElementById("result");

    if (!n || n <= 0) {
        result.style.display = "block";
        numberInfo.innerHTML = `<p class="error">Please enter a valid number</p>`;
        wikiInfo.innerHTML = "";
        return;
    }

    numberInfo.innerHTML = `
        <h3>Number Analysis</h3>
        <p><b>Roman:</b> ${toRoman(n)}</p>
        <p><b>Prime:</b> ${isPrime(n)}</p>
        <p><b>Even / Odd:</b> ${n % 2 === 0 ? "Even" : "Odd"}</p>
        <p><b>Perfect:</b> ${isPerfect(n)}</p>
        <p><b>Armstrong:</b> ${isArmstrong(n)}</p>
        <p><b>Fibonacci:</b> ${isFibonacci(n)}</p>
    `;

    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${n}_(number)`;
    const res = await fetch(url);
    const data = await res.json();

    wikiInfo.innerHTML = data.extract
        ? `<h3>information</h3>
           <p>${data.extract}</p>
           <a class="wiki-link" target="_blank" href="${data.content_urls.desktop.page}">
             View on Wikipedia
           </a>`
        : `<p>No Wikipedia information available.</p>`;

    result.style.display = "block";
}

// ===== TRUE 3D STARFIELD =====
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const stars = [];
const STAR_COUNT = 180;

for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
        x: (Math.random() - 0.5) * canvas.width,
        y: (Math.random() - 0.5) * canvas.height,
        z: Math.random() * canvas.width
    });
}

let mouseX = 0, mouseY = 0;
addEventListener("mousemove", e => {
    mouseX = (e.clientX - innerWidth / 2) * 0.0004;
    mouseY = (e.clientY - innerHeight / 2) * 0.0004;
});

function animateBG() {
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    stars.forEach(s => {
        s.z -= 2;
        if (s.z <= 0) s.z = canvas.width;

        const scale = canvas.width / s.z;
        const x = s.x * scale + canvas.width / 2 + mouseX * s.z;
        const y = s.y * scale + canvas.height / 2 + mouseY * s.z;

        ctx.beginPath();
        ctx.arc(x, y, scale * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#9ad7ff";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#4fc3ff";
        ctx.fill();
    });

    requestAnimationFrame(animateBG);
}
animateBG();
