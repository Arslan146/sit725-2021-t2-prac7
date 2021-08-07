document.addEventListener('DOMContentLoaded', function () {
  // Initialize sidenav
  const sidenav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenav, {});

  // Initialize modals
  var modal = document.querySelectorAll('.modal');
  M.Modal.init(modal, {});
});
