const cadastroForm = document.getElementById('cadastro-form');
const nomeInput = document.getElementById('nome');
const empresaInput = document.getElementById('empresa');

cadastroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = nomeInput.value;
    const empresa = empresaInput.value;
    console.log(`Nome: ${nome}, Empresa: ${empresa}`);
    // Aqui você pode salvar os dados em um banco de dados ou realizar outra ação
});