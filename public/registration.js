const form = document.querySelector('form');
const tbody = document.querySelector('tbody');

// Função para adicionar um novo cliente
async function adicionarCliente(nome, email, data_nasc, cpf) {
  const response = await fetch('/resgistros', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome,
      email,
      data_nasc,  
      cpf
    })
  });

  if (!response.ok) {
    const message = `Ocorreu um erro: ${response.status}`;
    throw new Error(message);
  }

  const cliente = await response.json();
  return cliente;
}

// Função para exibir todos os clientes cadastrados
async function exibirClientes() {
  const response = await fetch('/pessoas');

  if (!response.ok) {
    const message = `Ocorreu um erro: ${response.status}`;
    throw new Error(message);
  }

  const clientes = await response.json();

  // Limpa a tabela de clientes antes de adicionar os novos
  tbody.innerHTML = '';

  // Adiciona cada cliente na tabela
  clientes.forEach((pessoa) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${pessoa.nome}</td>
      <td>${pessoa.email}</td>
      <td>${pessoa.data_nasc}</td>
      <td>${pessoa.cpf}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Adiciona um novo cliente ao enviar o formulário
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nome = form.elements.nome.value;
  const email = form.elements.email.value;
  const data_nasc = form.elements.data_nasc.value;
  const cpf = form.elements.cpf.value;
  
  try {
    const cliente = await adicionarCliente(nome, email, data_nasc, cpf);
    form.reset();
    await exibirClientes();
  } catch (error) {
    console.error(error);
    alert('Ocorreu um erro ao adicionar o cliente.');
  }
});

// Exibe todos os clientes ao carregar a página
exibirClientes();
