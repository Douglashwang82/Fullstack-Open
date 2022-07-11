import axios from "axios";

const url = '/api/persons';

//get
function getPhoneBook() {
    const request = axios.get(url);
    return request.then(response => response.data);
}
//post

function addPhoneBook(newPhoneBook) {
    const request = axios.post(url, newPhoneBook);
    return request.then(response => response.data);
}

//put
function updatePhoneBook(id, newPhoneBook) {
    const request = axios.put(`${url}/${id}`, newPhoneBook);
    return request.then(response => response.data);
}

//del
const deletePhoneBook = id => {
    const request = axios.delete(`${url}/${id}`);
    return request.then(response => response.data);
}

const phoneBookServices = {getPhoneBook, addPhoneBook, updatePhoneBook, deletePhoneBook};

export default phoneBookServices;