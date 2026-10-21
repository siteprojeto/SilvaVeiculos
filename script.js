
document.addEventListener('DOMContentLoaded', () => {
  const numeroWhatsApp = '5543999297433';

  // Configura todos os botões do WhatsApp.
  document.querySelectorAll('[data-message]').forEach((link) => {
    const mensagem = link.dataset.message;
    link.href = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  // Menu para celulares.
  const botaoMenu = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#menu');

  botaoMenu.addEventListener('click', () => {
    const aberto = botaoMenu.getAttribute('aria-expanded') === 'true';

    botaoMenu.setAttribute('aria-expanded', String(!aberto));
    botaoMenu.setAttribute('aria-label', aberto ? 'Abrir menu' : 'Fechar menu');
    menu.classList.toggle('open', !aberto);
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      botaoMenu.setAttribute('aria-expanded', 'false');
      botaoMenu.setAttribute('aria-label', 'Abrir menu');
    });
  });

  // Busca e filtro de câmbio do estoque.
  const busca = document.querySelector('#search');
  const filtro = document.querySelector('#transmission');
  const carros = document.querySelectorAll('.car');
  const mensagemVazia = document.querySelector('#empty');

  function filtrarCarros() {
    const texto = busca.value.toLocaleLowerCase('pt-BR').trim();
    const cambio = filtro.value;
    let encontrados = 0;

    carros.forEach((carro) => {
      const modelo = carro.dataset.model.toLocaleLowerCase('pt-BR');
      const cambioCarro = carro.dataset.transmission;

      const correspondeTexto = modelo.includes(texto);
      const correspondeCambio = !cambio || cambioCarro === cambio;
      const mostrar = correspondeTexto && correspondeCambio;

      carro.hidden = !mostrar;
      if (mostrar) encontrados++;
    });

    mensagemVazia.hidden = encontrados > 0;
  }

  busca.addEventListener('input', filtrarCarros);
  filtro.addEventListener('change', filtrarCarros);

  // Atualiza o ano no rodapé.
  document.querySelector('#year').textContent = new Date().getFullYear();
});

