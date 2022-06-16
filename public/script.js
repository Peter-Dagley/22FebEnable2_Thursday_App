`use strict`

// import the dom
import * as DOM from './dom.js';

// list item function
const writeItem = item => {
  const child = document.createElement(`li`);
  child.id = item._id;
  child.innerHTML = `(${item._id})` + ` Name: ` + `${item.name}` + `, Description: ` + `${item.description}` + `, Price: ` + `${item.price}`;
  DOM.listOutput.appendChild(child);
}

// GET all function
const get = () => {
  DOM.listOutput.innerHTML = ``;

  axios.get(`/read`)
    .then((response) => {
      if (!Array.isArray(response.data)) {
        writeItem(response.data);
      } else {
        for (let item of response.data) {
          writeItem(item);
        }
      }
    }).catch((err) => {
      console.log(err);
    });
}

// POST function
const post = () => {
  if (DOM.inputName.value == "" || DOM.inputDescription.value == "" || DOM.inputPrice.value == 0) {
    console.log("Empty fields.")
    alert("Empty fields.")
  } else {
  axios.post(`/create`, {   name : DOM.inputName.value,
                            description : DOM.inputDescription.value, 
                            price : DOM.inputPrice.value})
    .then((response) => {
      console.log(response);
      get();
    }).catch((err) => {
      console.log(err);
    });
  }}

// set up the buttons' on click events
DOM.buttonCreate.onclick = () => post();

// run the get function on page load
get();


// New stuff
// list item function
const writeItem2 = item => {
  const child = document.createElement(`li`);
  child.id = item._id;
  child.innerHTML = `(${item._id})` + ` Name: ` + `${item.name}` + `, Description: ` + `${item.description}` + `, Price: ` + `${item.price}`;
  DOM.listOutput2.appendChild(child);
}

// GET one function
const getOne = (id) => {
  if (DOM.inputId.value == 0) {
    console.log("Empty fields.")
    alert("Empty fields.")
  } else {
  DOM.listOutput2.innerHTML = ``;
  axios.get(`/read/${id}`)
    .then((response) => {
      if (!Array.isArray(response.data)) {
        writeItem2(response.data);
      } else {
        for (let item of response.data) {
          writeItem2(item);
        }
      }
    }).catch((err) => {
      console.log(err);
    });
}}

DOM.buttonGetOne.onclick = () => getOne(inputId.value);

//Update one function
const put = (id) => {
  if (DOM.inputName2.value == "" || DOM.inputDescription2.value == "" || DOM.inputPrice2.value == 0 || DOM.inputId2.value == 0) {
    console.log("Empty fields.")
    alert("Empty fields.")
  } else {
  axios.put(`/update/${id}`, {   name : DOM.inputName2.value,
                                 description : DOM.inputDescription2.value, 
                                 price : DOM.inputPrice2.value})
    .then((response) => {
      console.log(response);
      get();
    }).catch((err) => {
      console.log(err);
    });
}}

DOM.buttonPutOne.onclick = () => put(inputId2.value);

// Delete one function
const deleteOne = (id) => {
  if (DOM.inputId3.value == 0) {
    console.log("Empty fields.")
    alert("Empty fields.")
  } else {
  axios.delete(`/delete/${id}`)
    .then((response) => {
      console.log(response);
      get();
      }).catch((err) => {
      console.log(err);
    });
}}

DOM.buttonDeleteOne.onclick = () => deleteOne(inputId3.value);