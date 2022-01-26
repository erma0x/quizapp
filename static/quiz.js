async function updateQuiz(req, res) {

  if (document.getElementById('form')) {
    document.getElementById('form').remove();
  }

  const url = '/quiz'; // get random quiz data
  let questions = await fetch(url)
    .then(res => res.json());

  const number_of_quizzes = 3;

  let my_test = new Array();
  let used_ids = new Array();

  let randomKey = 0;
  let question = {};

  let form = document.createElement("form");
  document.body.appendChild(form);
  form.setAttribute('id', 'form');
  form.setAttribute('type', 'post');
  form.setAttribute('style', 'text-align:center;');

  while (number_of_quizzes > my_test.length) {

    randomKey = Math.floor(Math.random() * questions.length);
    if (!(used_ids.includes(randomKey))) {
      question = {
        'id': questions[randomKey]['id'],
        'answers': questions[randomKey]['answers'],
        'question': questions[randomKey]['question']
      }
      my_test.push(question);
      used_ids.push(randomKey);

      ul = document.createElement('ul'); // single quiz question paragraph
      form.appendChild(ul);

      paragraph = document.createElement('p'); // single quiz question paragraph
      paragraph.textContent = question['question'];
      ul.appendChild(paragraph);

      for (answer_number in question['answers']) {

        spaced = document.createElement('br'); // single quiz question paragraph
        ul.appendChild(spaced);

        radio = document.createElement('input'); //unordered list containig the answers
        radio.setAttribute('type', 'radio');
        radio.setAttribute('name', question['id']);
        radio.setAttribute('value', answer_number);

        label_radio = document.createElement('label');
        label_radio.textContent = question['answers'][answer_number];

        ul.appendChild(radio);
        ul.appendChild(label_radio);

      }
    }
    document.body.appendChild(form);
  }

  document.addEventListener('submit', submitAnswer);

};


async function submitAnswer(event) {
  // event.preventDefault();
  // storage id_domanda : numero risposta

  let myForm = document.getElementById('form');
  let formData = new FormData(myForm);

  let myTestIDs = Array.from(formData.keys()); //      !!!  devo ottenere il JSON my_test dal form
  let myTestAnswers = Array.from(formData.values()); //      !!!  devo ottenere il JSON my_test dal form

  let myTest = {};

  //console.log(myTestIDs, myTestAnswers);

  for (let i = 0; i < myTestIDs.length; i++) { // COMPOSE /check JSON
    let myAnswerID = myTestIDs[i];
    let myAnswerIndex = myTestAnswers[i];

    myTest[myAnswerID] = myAnswerIndex;
  }

  // send myTest to /checkbox
  const xhr = new XMLHttpRequest();
  const url = 'https://checkbox/';
  xhr.open('POST',url);
  
  // xhr.onload = () => {
  //   const data = xhr.response;
  //   console.log(data);}
  
  //xhr.send(); 

  // retrive test correctness
  //const RESULT = await fetch(url, { method: 'POST' })

  document.getElementById('container').innerHTML = 'Correct Answers '+xhr.responseText;
};


