const img = document.getElementById("cat-image");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let images = [];
let index = -1;

function show() {
    img.src = images[index];
    prevBtn.disabled = index <= 0;
}

function fetchRandomCatImage() {
    return fetch(API_URL, { headers: { "x-api-key": API_KEY } })
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP " + response.status);
            }
            return response.json();
        })
        .then(data => {
            images.push(data[0].url);
            index = images.length - 1;
            show();
        })
        .catch(error => console.error("Помилка запиту:", error));
}

nextBtn.addEventListener("click", () => {
    if (index < images.length - 1) {
        index++;
        show();
    } else {
        fetchRandomCatImage();
    }
});

prevBtn.addEventListener("click", () => {
    if (index > 0) {
        index--;
        show();
    }
});

fetchRandomCatImage();