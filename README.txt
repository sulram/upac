O site UPAC foi desenvolvido com objetivo de apresentar a Universidade Popular de Arte e Ciência de uma maneira ousada e original, se baseando na própria história de ação e construção da Universidade: o trabalho, a pesquisa e as vivências em rede.

Existe hoje uma preocupação em não só estar a rede, mas proporcionar ferramentas que a desenvolvam e a organizem. Mas além disso, há também o questionamento sobre as ferramentas já disponíveis e amplamente usadas, que ao mesmo tempo oferecem ótimas interfaces de comunicação e mudaram nossa maneira de ser e estar no mundo físico e virtual, mas também detém todo tipo de controle dos nossos dados, utilizando nossa informações para seus interesses corporativos e políticos.

Por conta disso, decidimos que a plataforma, muito além de um site institucional, deveria oferecer uma alternativa à essas ferramentas.

Dividimos a plataforma em três interfaces colaborativas: o blog, a agenda e a cartografia.

No blog, os participantes podem publicar artigos, poesias, fotos, vídeos. Também podem relacionar suas publicações a palavras-chave, que ajudam na organização de todo o material e na indexação dos assuntos da rede.

A agenda também é colaborativa, todos os participantes podem informar à rede eventos relacionados aos temas tratados na Universidade.

A cartografia é o espaço onde é possível visualizar a rede em sua totalidade. Ela reúne não só os usuários, mas também os eventos que foram geolocalizados e os pontos "UPAC", marcadores que os participantes podem localizar no mapa indicando projetos, instituições e empresas que compartilham algo em comum com a Universidade, os atuais ou potenciais parceiros.

É importante frisar que em todas as nossas decisões de como funcionariam as interfaces, adotamos uma postura de permitir a ação dos participantes, nunca tolhe-los. Os participantes são a plataforma, as publicações, os eventos, o trabalho cartográfico. A participação é o ponto fundamental da plataforma, e por isso, tanto no design quanto na tecnologia escolhida, nossa preocupação foi tornar a experiência de uso mais simples e mais lúdica possível: poucos ícones, mas grandes e coloridos, fáceis de assimilar e navegar; velocidade nas trasições de tela para criar uma sensação de aplicativo e não website.

A página de entrada e a página institucional são os únicos conteúdos que podem ser editados apenas pelos moderadores da plataforma. Para isso foi criada uma área de administração de conteúdo, só para moderadores.

A página de entrada oferece espaço para cartazes e pequenos avisos, a fim de facilitar o anúncio de algum evento ou promover alguma informação.

O projeto foi desenvolvido principalmente com software livre, e o código escrito originalmente para o projeto são também livres, disponíveis na maior comunidade de software livre, o Github. Todo o sistema desenvolvido especificamente para o site pode e deve ser reaproveitado e distribuído dentro dos termos da licença Creative Commons Atribuição-Uso Não-Comercial-Compartilhamento pela mesma licença 2.5 Brasil, e a utilização dos trechos de código utilizados de outros projetos livres deve seguir suas próprias licenças FLOSS (Free Libre Open Source Software). Em outras palavras, qualquer pessoa pode pegar os códigos desenvolvidos pelo site e desenvolver sua própria plataforma baseada na UPAC, desde que esse site seja também aberto e livre pelas mesmas licenças. O código já está disponível para download.

Para a programação do servidor, utilizamos tecnologias livres recentes que estão se popularizando com muita velocidade e força, devido as suas qualidades: Node.js, que permite a criação de servidores muito rápidos, atendendo muitos usuários mesmo num servidor de pequeno porte. Utilizamos também o MongoDB como base de dados, igualmente veloz e muito usado em conjunto com Node.js.

Para a programação da interface de usuário, utilizamos o framework Ember.js, que proporciona a criação de aplicativos web com as mesmas tecnologias de um site. A velocidade de navegação entre as telas e conteúdos são méritos do Ember.js.

Outras bibliotecas usadas também foram fundamentais para este projeto:

- Leaflet: biblioteca para mapas interativos totalmente livre, que utiliza os mapas do OpenStreetMap e consegue em muitos aspectos superar o popular Google Maps
- Redactor: a única biblioteca não livre, mas excelente interface para edição de textos
- Select2: responsável pela interface de palavras-chave
- Dropzone.js: responsável pela interface de upload de imagens
- Fullcalendar: responsável pela interface de calendário
- Moment.js: responsável pela conversões de formatos de data
- jQuery
- Underscore.js
- Twitter Bootstrap
- Flat UI