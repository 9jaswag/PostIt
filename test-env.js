global.$ = () => ({
  tabs: () => null,
  attr: () => null,
  sideNav: () => null,
  modal: () => null,
  parallax: () => null,
  show: () => null,
  hide: () => null,
  tooltip: () => null
});

global.tinymce = {
  remove: () => null,
  init: () => null,
  activeEditor: {
    getContent: () => null
  }
};


global.event = {
  target: {
    name: 'input',
    value: 'input'
  }
};

global.Materialize = {
  toast: jest.fn()
};

global.swal = () => Promise.resolve(true);
