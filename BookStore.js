// book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI constructor
function UI(){

}

//local storage constructor
class LocalStorage{
    static getBook(){
        let books;
        if(localStorage.getItem("books") === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }
    static addToLocalStorage(book){
        let books = LocalStorage.getBook();
        books.push(book)
        localStorage.setItem("books", JSON.stringify(books));
    }
    static displayBook(){
        let ui = new UI();
        let books = LocalStorage.getBook()
        books.forEach(function(book){
            ui.addBook(book)
        })
    }
    static removeBooks(isbn){
        console.log(isbn)
        let books = LocalStorage.getBook();
        books.forEach(function(book, index){
            if(isbn === book.isbn){
                books.splice(index,1);
            }
        })
        localStorage.setItem("books", JSON.stringify(books));
    }
}
//adding prototype addBook
UI.prototype.addBook = function(book){
    //defining ui variable
    const table = document.querySelector(".table");

    //creating table row
    let tr = document.createElement("tr")
    tr.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a  class = "delete-item">X<a/></td>
    `
    table.appendChild(tr);
}
//adding prototype showAlert
UI.prototype.showAlert = function(message, className){
    //defining UI variables
    const parent = document.querySelector(".heading");
    const h1 = document.querySelector("h1");
    //craete div
    const div = document.createElement("div")
    //add className
    div.className = `common ${className}`;
    //adding message to div
    div.appendChild(document.createTextNode(message));
    //inserting before h1
    parent.insertBefore(div, h1);
    //set timeout
    setTimeout(function(){
        document.querySelector(".common").remove();
    }, 2000)
}

//ading prototype clearBook
UI.prototype.clearInput = function(){
    //clearing input
    document.querySelector("#book-title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
}
//adding envent listners
document.querySelector("#submit").addEventListener("click", function(){
    //UI variables
    const bookTitle = document.querySelector("#book-title").value;
          author = document.querySelector("#author").value;
          isbn = document.querySelector("#isbn").value;
    
    //instantiating book object
    book = new Book(bookTitle, author, isbn);

    //instantiating UI
    ui = new UI();

    //validation
    if(bookTitle === "" || author ==="" || isbn === ""){
        //show alert box
        ui.showAlert("fill out the form bitch", "error");
    }else{
        //adding book to table
        ui.addBook(book);
        //add book to localStorage
        LocalStorage.addToLocalStorage(book);

        // show succes message
        ui.showAlert("book added succesfully", "succes")
        //clear input
        ui.clearInput();
    }
})
//add eventListner for the document
document.addEventListener("DOMContentLoaded", function(e){
   LocalStorage.displayBook();
})

//addEventListener for table
document.querySelector(".table-container").addEventListener("click", function(e){
    if(e.target.className === "delete-item"){
        e.target.parentElement.parentElement.remove();
        LocalStorage.removeBooks(e.target.parentElement.previousElementSibling.textContent);
        //show notification
        ui.showAlert("book removed succesfully", "succes")
    }
})