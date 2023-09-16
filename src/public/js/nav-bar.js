function btnChange(id) {
  const btn = document.getElementById(id);
  btn.style.borderBottom = '1px solid #ffffff';
  btn.addEventListener('mouseover', () => {
    btn.style.borderBottom = 'none';
  });
  btn.addEventListener('mouseout', () => {
    btn.style.borderBottom = '1px solid #ffffff';
  });
}

window.addEventListener('load', () => {
  const path = window.location.pathname;

  if (path === '/') {
    btnChange('nav-1');
  }
  if (path === '/docs') {
    btnChange('nav-2');
  }
  if (path === '/about') {
    btnChange('nav-3');
  }
});
