
const DB_URL = "https://bookmanagementapp-733a0-default-rtdb.asia-southeast1.firebasedatabase.app/books";


const bookList = document.getElementById("bookList");
const addBookForm = document.getElementById("addBookForm");


async function fetchBooks() {
    const res = await fetch(DB_URL + ".json");
    const data = await res.json();

    bookList.innerHTML = "";

    if (!data) return;

    Object.entries(data).forEach(([id, book]) => {
        bookList.innerHTML += `
            <div class="book-card">
                <img src="${book.coverImageURL}">
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Price: $${book.price}</p>

                <button onclick="updateAuthor('${id}', '${book.author}')">Update</button>
                <button onclick="deleteBook('${id}')">Delete</button>
                <button onclick="viewDetails('${book.title}', '${book.author}', '${book.price}', '${book.coverImageURL}')">View</button>
            </div>
        `;
    });
}

setInterval(fetchBooks, 2000);
fetchBooks();


addBookForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newBook = {
        title: title.value,
        author: author.value,
        price: Number(price.value),
        coverImageURL: image.value
    };

    await fetch(DB_URL + ".json", {
        method: "POST",
        body: JSON.stringify(newBook)
    });

    addBookForm.reset();
});


window.deleteBook = async (id) => {
    await fetch(`${DB_URL}/${id}.json`, {
        method: "DELETE"
    });
};


window.updateAuthor = async (id, oldAuthor) => {
    const newAuthor = prompt("Enter new author:", oldAuthor);
    if (!newAuthor) return;

    await fetch(`${DB_URL}/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify({ author: newAuthor })
    });
};


const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

window.viewDetails = (title, author, price, image) => {
    modal.classList.remove("hidden");
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalAuthor").textContent = author;
    document.getElementById("modalPrice").textContent = price;
    document.getElementById("modalImage").src = image;
};

closeModal.onclick = () => modal.classList.add("hidden");
