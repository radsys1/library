let library = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

Book.prototype.changeStatus = function(value) {
    this.status = value;
}

function addbookToLibrary(title, author, pages, status, array) {
    var checkIf;

    array.forEach(item => {
        if (item.title == title) {
            checkIf =  true;
        } else {
            checkIf = false;
        }
    })

    if (checkIf) {
        return 'Book Exists'
    } else {
        if (title == '' || author == '' || pages == '' || status == '') {
            return ' Please complete all fields'
        } else {

            const newBook = new Book(title, author, pages, status);
            array.push(newBook)
            return '';

        }
        
    }
}

const addEvents = () => {

    let options = Array.from(document.querySelectorAll('.changes'));

    options.forEach(option => {
        console.log(option)
        option.addEventListener('change', function() {
            let book = library[parseInt(this.parentElement.parentElement.firstElementChild.innerHTML)-1];

            if (option.value == 'true') {
                book.changeStatus('Read')
                tbody.innerHTML = render(library);
                
            } else if (option.value == 'false') {
                book.changeStatus('Not Read')
                console.log('status changed')
                tbody.innerHTML = render(library);
            } else {
                library = library.filter(item => item.title != book.title);
                tbody.innerHTML = render(library);
            }
        })
    })
}

const cleanFields = () => {

    title.value = '';
    author.value = '';
    pages.value = ''
}

function render(books) {
    const temp = books.map((book,i ) => {
        return `
            <tr>
                <td>${i+1}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.pages}</td>
                <td>${book.status}</td>
                <td>
                  <select class='changes' name='status' id='status'>
                    <option value='change'> Change</option>
                    <option value="true">Read</option>
                    <option value="false">Not Read</option>
                    <option value="delete">Delete</option>
                 </select>
                
                </td>
            </tr>
        `
    }).join('')

    if(temp.length == 0) {
        return ''
    } else {
        setTimeout(addEvents, 50)
        return temp;
    }

}
const h4 = document.querySelector('h4');
const button = document.querySelector('button');
const tbody = document.querySelector('tbody');
const title = document.querySelector('#name');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const status = document.querySelector('select');


button.addEventListener('click', function() {
    h4.innerHTML = addbookToLibrary(title.value, author.value, pages.value, status.value, library);

    const temp = render(library);
    tbody.innerHTML = temp;
    cleanFields();
})

