class Book {
    constructor(title, author,publisher){
        this.title=title;
        this.author=author;
        this.publisher=publisher;
    }
}

//ui field
class Ui{
    static displayBooks(){

        
        const books=store.getbooks();

        books.forEach((book)=> Ui.addBookToList(book));
        
    }
    static addBookToList(book){
        const list = document.getElementById("book-list");

        const row=document.createElement("tr");

        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.publisher}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `
        list.appendChild(row);



    }
    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    static showAlert(message,className){
        const div = document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container=document.querySelector(".container");
        const form= document.querySelector("#book-form");
        container.insertBefore(div, form);

        //vanishing 3 sec
        setTimeout(() => 
            document.querySelector('.alert').remove(), 3000
        )

    }
    static clearFields(){
        document.querySelector('#title').value="";
        document.querySelector('#author').value="";
        document.querySelector('#publisher').value="";
        
        
    }

}
//local storage
class store{
    static getbooks(){
        let books ;
        if(localStorage.getItem('books')== null){
            books=[]
        }
        else{
            books=JSON.parse(localStorage.getItem('books'));
        }

        return books;

    }
    static addBook(book){
        const books= store.getbooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));

    }
    
    static removebook(publisher){
        const books =store.getbooks();

            books.forEach((book , index)=>
            {
                if(book.publisher===publisher){
                    books.splice(index, 1);

                }
            });
            Ui.showAlert("book removed from list", "danger");
        
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//DISPLAY BOOKS
document.addEventListener("DOMContentLoaded",Ui.displayBooks);

//ADD a book
document.querySelector("#book-form").addEventListener("submit", (e)=>{
    // prevent actual submit 
    e.preventDefault();
    const title=document.querySelector("#title").value;
    const author=document.querySelector("#author").value;
    const publisher=document.querySelector("#publisher").value;
    //validate 
    if(title ===""||author ===""||publisher ===""){
        Ui.showAlert("please fill in all fields","danger");
    }
        else{
            //instantiate book
    const book = new Book(title, author, publisher);
    
    //add book to ui
    Ui.addBookToList(book);

    //add back to store
    store.addBook(book);

    //success message
    Ui.showAlert("book added to list", "success");

    
    //clear fields
    Ui.clearFields();
        }

    
    


})

//remove a book 

document.querySelector("#book-list").addEventListener("click", (e)=>{
    Ui.deleteBook(e.target);


    //remove book from storage
    store.removebook(e.target.parentElement.previousElementSibling.textContent);


    //remove alert message
    
})

//search result

function searchbar(){

    
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("book-list");
    tr = table.getElementsByTagName("tr");

   
    
         
    for (i = 0; i < tr.length; i++) {
       

      td = tr[i].getElementsByTagName("td")[0];

      
      
      if (td) {
         
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1  ) {
            tr[i].style.display = "";
            
           
        }
         else {
            tr[i].style.display = "none";
        }
      }
    
}
}