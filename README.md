# Lines Overlay - web extension

Extensão de navegador usada para medir espaçamentos entre elementos de sites (veja as imagens abaixo).

<div style="display: flex; max-width: max-content;">
  <img src="./src/assets/exemplo.png" width="370" />
  <img src="./src/assets/exemplo1.png" width="370" style="margin-left: 12px;" />
</div>

## 1 - Download e configuração

1. Baixe este repositório: clique no botão "Code" de cor verde acima e depois em "Download ZIP"
2. Rode o comando `npm install` para instalar as dependências do Node.js
3. Rode o comando `npm run build` para gerar a extensão

## 2 - Instalação no navegador

1. Abra o navegador Google Chrome
2. Digite na barra de endereço: chrome://extensions
3. Habilite o modo de desenvolvedor
4. Clique em "Carregar sem compactação"
5. Selecione a pasta do repositório e selecione a pasta `dist`

## 3 - Como usar a extensão

1. Clique no ícone da extensão na barra de ferramentas
2. Clique no botão "Ativar"
3. Clique no botão "Desativar"

### Por que essa extensão é útil?

Essa extensão é especialmente útil para desenvolvedores medirem espaçamentos entre textos e outros elementos, visto que textos não têm base ou topo bem definidos, nem mesmo com line-height=1. Além disso, outro uso pode ser para a criação de outras extensões, reaproveitando o modelo do projeto.