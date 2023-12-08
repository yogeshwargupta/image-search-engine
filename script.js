const accessKey = "u4gskbaMRniGTfsX5jOXzBdqdA6vjv9Djx0xh05kBKE"; 
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreButton = document.getElementById("show-more-button");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (results && results.length > 0) {
        results.map((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.appendChild(image);

            searchResult.appendChild(imageLink);
        });
    } else {
        console.log("No results found");
    }
    
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchResult.innerHTML = ""; // Clear previous results before displaying new ones
    searchImages();
    showMoreButton.style.display = "block";
})
showMoreButton.addEventListener("click",()=>{
    page++;
    searchImages();
})

