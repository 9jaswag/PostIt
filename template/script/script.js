const addUserForm = document.querySelector('.add-user-form');
const addUserTrigger = document.querySelector('.add-user-trigger');
const addUserCancel = document.querySelector('.adduser-cancel');
const postMessageForm = document.querySelector('.post-message');
const postMessageTrigger = document.querySelector('.post-message-toggle');
const postMessageCancel = document.querySelector('.post-message-cancel');

const addUser = () => {
  if (!postMessageForm.classList.contains('hide')) {
    postMessageForm.classList.add('hide');
    postMessageTrigger.classList.remove('hide');
  }
  addUserForm.classList.toggle('hide');
  addUserTrigger.classList.add('hide');
};

addUserCancel.addEventListener('click', () => {
  if (!addUserForm.classList.contains('hide')) {
    addUserForm.classList.add('hide');
    addUserTrigger.classList.remove('hide');
  }
});

const postMessage = () => {
  if (!addUserForm.classList.contains('hide')) {
    addUserForm.classList.add('hide');
    addUserTrigger.classList.remove('hide');
  }
  postMessageForm.classList.toggle('hide');
  postMessageTrigger.classList.add('hide');
};

postMessageCancel.addEventListener('click', () => {
  if (!postMessageForm.classList.contains('hide')) {
    postMessageForm.classList.add('hide');
    postMessageTrigger.classList.remove('hide');
  }
});
