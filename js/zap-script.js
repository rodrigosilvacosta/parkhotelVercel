const form = document.getElementById('form-msg-zap');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.querySelector('input[name="nome"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const tel = document.querySelector('input[name="telefone"]').value;
  const checkIn = document.querySelector('input[name="check-in"]').value;
  const checkOut = document.querySelector('input[name="check-out"]').value;
  const adults = document.querySelector('select[name="adultos"]').value;
  const children = document.querySelector('select[name="crianca"]').value;
  const rooms = document.querySelector('select[name="quarto"]').value;
  let ages = [];

  if (children && children > 1) {
    for (let i = 1; i <= children; i++) {
      let age = document.querySelector(`select[name="idade${children}.${i}"]`)?.value || null;
      if (age) {
        ages.push(fixAgeOptions(age));
      }
    }
  } else {

    let age = document.querySelector(`select[name="idade1"]`)?.value || null;

    if (age) {
      ages.push(fixAgeOptions(age));
    }
  }

  //encodeURIComponent
  const texto = encodeURIComponent(`
  nome: ${name}
  e-mail: ${email}
  telefone: ${tel}
  check-in: ${checkIn}
  check-out: ${checkOut}
  adultos: ${adults}
  crianças: ${children}
  idades: (${ages.join(', ')})
  quartos: ${rooms}
  `);

  // número no formato internacional: 55 = Brasil, depois DDD + número
  const numero = "55035991376569";

  const url = `https://wa.me/${numero}?text=${texto}`;
  window.open(url, "whatsappWindow");
}, true);

function fixAgeOptions(age) {
  return parseInt(age) - 1;
}