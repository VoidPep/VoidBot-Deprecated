Primeiramente eu queria começar dizendo que esse é um bot em desenvolvimento, não tem muita coisa, pra não dizer nada.
Basicamente só tenho a estrutura inicial do bot e dois comandos, $clear (pra limpar o chat) e o $ping (que faz o bot responder com pong) 

    Bom, o arquivo principal é o index.js, la onde ele segura toda a estrutura inicial do bot e principais comportamentos, um desses comportamentos é 
    correr pelas pastas procurando um arquivo com o final .js, arquivos esses encontrados na pastas, commands e events, que seguram arquivos que serão executados
    em uma quantidade de tempo menor que o arquivos principal (index.js).

    o gitignore é um arquivo que vai ignorar os arquivos escritos nele pelo git, para que nada seja vazado para o github

    .env segura constantes secretas, a chave de acesso do bot, a ID publica do bot, e o prefixo que será usada nos commandos '$'

    o resto foi gerado a partir do node.js, discord.js pelo 'npm install'