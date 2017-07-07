const addUser = () => {
  let addUserForm = document.querySelector('.add-user-form');
  let addUserTrigger = document.querySelector('.add-user-trigger')
  addUserForm.classList.toggle('display-block');
  addUserTrigger.classList.toggle('display-none');
}