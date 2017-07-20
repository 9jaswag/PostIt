const addUserForm = document.querySelector('.add-user-form');
const addUserTrigger = document.querySelector('.add-user-trigger');
const postMessageForm = document.querySelector('.post-message');
const postMessageTrigger = document.querySelector('.post-message-toggle');

const addUser = () => {
  addUserForm.classList.toggle('display-block');
  addUserTrigger.classList.toggle('display-none');
};

const postMessage = () => {
  postMessageForm.classList.toggle('display-block');
  postMessageTrigger.classList.toggle('display-none');
};
