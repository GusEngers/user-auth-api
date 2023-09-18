class HomeForm {
  form = document.getElementById('form-home');
  email = document.getElementById('email');
  error = document.getElementById('error-home');
  btn = document.getElementById('submit-home');

  listen() {
    this.email.addEventListener('input', (e) => {
      e.preventDefault();
      const value = e.target.value;
      const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!reg.test(value)) {
        this.error.textContent = 'El correo ingresado no tiene un formato válido';
        this.error.style.display = 'block';
        this.btn.disabled = true;
      } else {
        this.error.textContent = '';
        this.error.style.display = 'none';
        this.btn.disabled = false;
      }
    });

    this.form.addEventListener('submit', () => {
      this.btn.outerHTML = `<span class="loader"></span>`;
    });
  }
}

new HomeForm().listen();
