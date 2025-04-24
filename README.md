# Portfólio de Eduardo Meireles - Analista de Projetos

Este é um site portfólio responsivo criado com HTML, CSS e JavaScript, com foco em design moderno e efeitos visuais atraentes.

## Características

- Design moderno com paleta de cores em tons de azul
- Layout totalmente responsivo (mobile, tablet e desktop)
- Animações e efeitos visuais com GSAP
- Scroll suave com biblioteca Lenis
- Efeito de "mundo/globo" inspirado no site Shakers Agência
- Código HTML semântico e CSS bem estruturado
- Boas práticas de UX/UI

## Estrutura do Projeto

```
portfolio/
├── css/
│   └── style.css
├── img/
│   ├── pattern.png
│   ├── projeto-alura.jpg
│   ├── projeto-botafogo.jpg
│   ├── projeto-fiap.jpg
│   └── projeto-pm3.jpg
├── js/
│   └── main.js
├── index.html
├── paleta_cores.txt
└── README.md
```

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- GSAP (GreenSock Animation Platform)
- ScrollTrigger
- ScrollToPlugin
- Lenis (para scroll suave)
- Font Awesome (para ícones)
- Google Fonts (Poppins e Montserrat)

## Como Usar

1. Baixe todos os arquivos mantendo a estrutura de pastas
2. Abra o arquivo `index.html` em seu editor de código (como VS Code)
3. Personalize o conteúdo conforme necessário
4. Substitua as imagens de exemplo na pasta `img` por suas próprias imagens
5. Ajuste os estilos em `css/style.css` se desejar alterar cores ou layouts
6. Modifique os efeitos em `js/main.js` para personalizar as animações

## Personalização

### Paleta de Cores

A paleta de cores está definida como variáveis CSS no início do arquivo `style.css`:

```css
:root {
    /* Cores principais */
    --azul-escuro: #0A2647;
    --azul-medio: #144272;
    --azul-claro: #205295;
    --azul-muito-claro: #2C74B3;
    
    /* Cores complementares */
    --branco: #FFFFFF;
    --cinza-claro: #F5F5F5;
    --cinza-medio: #CCCCCC;
    --preto: #000000;
    
    /* Cores de destaque */
    --azul-brilhante: #4DA9FF;
    --azul-turquesa: #00B4D8;
}
```

Você pode facilmente alterar estas variáveis para modificar toda a paleta de cores do site.

### Fontes

O site utiliza as fontes Poppins e Montserrat do Google Fonts. Você pode alterá-las modificando a importação no final do arquivo CSS e atualizando as variáveis:

```css
:root {
    --fonte-principal: 'Poppins', sans-serif;
    --fonte-secundaria: 'Montserrat', sans-serif;
}
```

## Responsividade

O site é totalmente responsivo com breakpoints em:
- 1024px (tablets e dispositivos menores)
- 768px (dispositivos móveis em modo paisagem)
- 576px (dispositivos móveis em modo retrato)

## Créditos


Desenvolvido para Eduardo Meireles - Analista de Projetos
