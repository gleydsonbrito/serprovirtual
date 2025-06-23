document.addEventListener('DOMContentLoaded', function () {
    fetch('../data/faq2.json')
        .then(res => res.json())
        .then(faqs => {
            const containerFAQ = document.querySelector('.container-faq');
            const filtro = document.querySelector('.filtroFAQ');

            let FAQsOriginal = [...faqs];
            let FAQsFiltradas = [...faqs];

            function renderFAQs(faqsToRender) {
                containerFAQ.innerHTML = '';

                faqsToRender.forEach(item => {
                    // Gerar conteúdo das respostas
                    let respostasContent = '';
                    
                    // Adicionar cada resposta com o ícone de check
                    item.resposta.forEach(res => {
                        respostasContent += `
                        <div class="respostas-faq-wrapper">
                            <img class="check-faq" src="../assets/icons/check.png" alt="">
                            <p class="respostas-faq">${res}</p>
                        </div>
                        </br>`;
                    });
                    
                    // Adicionar imagem se existir
                    if (item.imagem && item.imagem !== false) {
                        respostasContent += `
                        <div class="imagem-faq-wrapper">
                            <img class="faq-image" src="../assets/${item.imagem}" alt="Imagem ilustrativa">
                        </div>`;
                    }

                    const itemFAQ = `
                    <div class="item-faq">
                        <details class="detalhe-faq">
                            <summary class="summary-faq">${item.pergunta}</summary>
                            ${respostasContent}
                        </details>
                    </div>`;
                    containerFAQ.insertAdjacentHTML('beforeend', itemFAQ);
                });
                
                if (faqsToRender.length === 0) {
                    containerFAQ.innerHTML = '<p style="color: #FFF" class="sem-resultados">Desculpe. Nenhum resultado foi encontrado para sua busca.</p>';
                }
            }
            
            renderFAQs(FAQsFiltradas);

            filtro.addEventListener('input', event => {
                const busca = event.target.value.toLowerCase();

                if (busca === '') {
                    FAQsFiltradas = [...FAQsOriginal];
                } else {
                    FAQsFiltradas = FAQsOriginal.filter(faq => {
                        const perguntaContem = faq.pergunta.toLowerCase().includes(busca);
                        const respostaContem = faq.resposta.some(r => r.toLowerCase().includes(busca));
                        return perguntaContem || respostaContem;
                    });
                }
                renderFAQs(FAQsFiltradas);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar o FAQ:', error);
            document.querySelector('.container-faq').innerHTML =
                '<p style="color: #FFF" class="erro-carregamento">Erro ao carregar as perguntas frequentes.</p>';
        });
});

const btn = document.querySelector('.btn');
btn.addEventListener('click', function() {
    const allDetails = document.querySelectorAll('.detalhe-faq');
    const estadoInicial = allDetails[0]?.hasAttribute('open');

    allDetails.forEach(d => {
        if(estadoInicial) {
            d.removeAttribute('open');
        } else {
            d.setAttribute('open', '');
        }
    });

    btn.value = estadoInicial ? '+ Expandir tudo' : '- Contrair tudo';
});