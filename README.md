# 📝 Feedback do Projeto — Loja Virtual

Este arquivo documenta os pontos de melhoria destacados pelo professor **Thiago Trojahn** do IFSP São Carlos no projeto de Loja Virtual. Esses feedbacks serão analisados e corrigidos nas próximas versões do sistema.

---

## ❌ Erros e Melhorias

### 1. **Uso de `onclick` diretamente no HTML**
- **Problema**: Eventos JavaScript foram atribuídos diretamente no HTML, como `onclick="cadastrarPessoas(e)"`, o que é considerado uma prática obsoleta e desencorajada no desenvolvimento moderno.
  - **Exemplo Problemático**:
    ```html
    <button onclick="cadastrarPessoas(e)">Cadastrar</button>
    ```
  - **Correção Sugerida**:
    Usar `addEventListener` via JavaScript:
    ```javascript
    button.addEventListener("click", cadastrarPessoas);
    ```

---

### 2. **Erro no console ao cadastrar uma pessoa**
- **Problema**: Ao cadastrar uma pessoa, o seguinte erro aparece no console:
    ```
    Uncaught ReferenceError: e is not defined
    ```
  - **Causa**: A variável `e` (evento) foi usada sem estar declarada ou passada corretamente.
  - **Correção Sugerida**: Passar o evento corretamente na função:
    ```javascript
    function cadastrarPessoas(e) {
        e.preventDefault();
        // restante do código
    }
    ```

---

### 3. **Identificação de usuários pelo nome**
- **Problema**: O sistema atual usa o nome da pessoa como critério de identificação, impedindo que dois usuários com o mesmo nome sejam cadastrados.
  - **Exemplo de Comportamento Atual**:
    - Não é possível cadastrar dois "José" ou duas "Maria", mesmo que isso seja algo comum na vida real.
  - **Correção Sugerida**:
    Implementar um identificador único (`id`) para cada pessoa, independente do nome. O `id` não deve ser baseado na posição no array nem se alterar com remoções/inserções.

---

## ✅ Próximos Passos

- [ ] Remover todos os eventos inline (`onclick`, `onsubmit`, etc.).
- [ ] Garantir que nenhuma função use variáveis não definidas (como `e`).
- [ ] Refatorar o sistema de cadastro para usar IDs únicos para identificação.
- [ ] Realizar testes para garantir que não há mensagens de erro no console.

---

Agradecemos ao professor **Thiago Trojahn** pelo feedback construtivo! Esses apontamentos serão fundamentais para a melhoria do nosso projeto e do nosso aprendizado em desenvolvimento web.
