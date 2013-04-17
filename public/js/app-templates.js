Ember.TEMPLATES["agenda"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("<h1>Agenda</h1>");
  
});

Ember.TEMPLATES["blog"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n		<a ");
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.href")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Destaques</a>\n	");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n		<a ");
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.href")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Mais recentes</a>\n	");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n		<a ");
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.href")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Mais comentadas</a>\n	");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n	\n		");
  hashTypes = {'tagName': "STRING",'href': "BOOLEAN"};
  options = {hash:{
    'tagName': ("li"),
    'href': (false)
  },inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "blog.user", options) : helperMissing.call(depth0, "linkTo", "blog.user", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n	");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n			<a ");
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.href")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Minhas colaborações</a>\n		");
  return buffer;
  }

  data.buffer.push("<h1>Blog</h1>\n\n<hr/>\n\n<ul class=\"nav nav-pills\">\n\n	");
  hashTypes = {'tagName': "STRING",'href': "BOOLEAN"};
  options = {hash:{
    'tagName': ("li"),
    'href': (false)
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "blog.index", options) : helperMissing.call(depth0, "linkTo", "blog.index", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n	");
  hashTypes = {'tagName': "STRING",'href': "BOOLEAN"};
  options = {hash:{
    'tagName': ("li"),
    'href': (false)
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "blog.recentes", options) : helperMissing.call(depth0, "linkTo", "blog.recentes", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n	");
  hashTypes = {'tagName': "STRING",'href': "BOOLEAN"};
  options = {hash:{
    'tagName': ("li"),
    'href': (false)
  },inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "blog.populares", options) : helperMissing.call(depth0, "linkTo", "blog.populares", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n	");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "App.TheUser.isAuthenticated", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n</ul>");
  return buffer;
  
});

Ember.TEMPLATES["home"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<h1>\n	<span>Universidade</span>\n	<span>Popular</span>\n	<span>de Arte</span>\n	<span>e Ciência</span>\n</h1>\n\n");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.HomeSlidesView", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  return buffer;
  
});

Ember.TEMPLATES["home_slides"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("<ul class=\"slideshow\">\n	<li><img src=\"./img/home01.jpg\"></li>\n	<li><img src=\"./img/home02.jpg\"></li>\n	<li><img src=\"./img/home03.jpg\"></li>\n</ul>");
  
});

Ember.TEMPLATES["menu"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashTypes, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("<span><span class=\"ico\"></span>Entrada</span>");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("<span><span class=\"ico\"></span>Sobre a UPAC</span>");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("<span><span class=\"ico\"></span>Rede</span>");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("<span><span class=\"ico\"></span>Blog</span>");
  }

function program9(depth0,data) {
  
  
  data.buffer.push("<span><span class=\"ico\"></span>Agenda</span>");
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n		\n		<li class=\"menu_it profile\">");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "perfil", options) : helperMissing.call(depth0, "linkTo", "perfil", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n\n		<li class=\"menu_it logout\">");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "logout", options) : helperMissing.call(depth0, "linkTo", "logout", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n\n	");
  return buffer;
  }
function program12(depth0,data) {
  
  
  data.buffer.push("<span><span class=\"ico\"></span>Meu perfil</span>");
  }

function program14(depth0,data) {
  
  
  data.buffer.push("<span><span class=\"ico\"></span>Sair</span>");
  }

function program16(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n\n		<li class=\"menu_it login\">");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "user", options) : helperMissing.call(depth0, "linkTo", "user", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n\n	");
  return buffer;
  }
function program17(depth0,data) {
  
  
  data.buffer.push("<span><span class=\"ico\"></span>Participar</span>");
  }

  data.buffer.push("<nav id=\"main_menu\" ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("route_class")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n	<ul>\n		<li class=\"menu_it home\">");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "home", options) : helperMissing.call(depth0, "linkTo", "home", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n		<li class=\"menu_it upac\">");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "upac", options) : helperMissing.call(depth0, "linkTo", "upac", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n		<li class=\"menu_it rede\">");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede", options) : helperMissing.call(depth0, "linkTo", "rede", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n		<li class=\"menu_it blog\">");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "blog", options) : helperMissing.call(depth0, "linkTo", "blog", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n		<li class=\"menu_it agenda\">");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "agenda", options) : helperMissing.call(depth0, "linkTo", "agenda", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n	</ul>\n</nav>\n\n<div id=\"sec_menu\">\n\n	");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "User.auth.loggedIn", {hash:{},inverse:self.program(16, program16, data),fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["perfil"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n\n<div class=\"row-fluid\">\n	\n	<div class=\"span8\">\n\n		<h1 class=\"upper\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "User.auth.username", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h1>\n	\n		<hr/>\n\n		<h3>Publicações no site</h3>\n\n		<p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, rem, nesciunt, repellendus, ab saepe libero dignissimos placeat animi nostrum eius molestiae obcaecati labore provident quasi excepturi voluptatum qui iure consequuntur.</p>\n\n		<hr/>\n\n		<h3>Comentários</h3>\n		\n		<p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, rem, nesciunt, repellendus, ab saepe libero dignissimos placeat animi nostrum eius molestiae obcaecati labore provident quasi excepturi voluptatum qui iure consequuntur.</p>\n\n	</div>\n\n	<div class=\"span1\">\n		&nbsp;\n	</div>\n	\n	<div class=\"span3\">\n		\n		<p></p>\n\n		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, ducimus, ut quasi enim quibusdam culpa impedit esse cupiditate incidunt tempore consequatur in fuga a hic nobis dolores mollitia et voluptatem!</p>\n\n	</div>\n	\n</div>\n\n");
  return buffer;
  }

  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "User.auth.loggedIn", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["rede"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n	\n	<div class=\"rede_bar rede_bar_fetching\">\n		<p>Buscando dados...</p>\n	</div>	\n\n");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n\n	");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "User.auth.loggedIn", {hash:{},inverse:self.program(9, program9, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n		\n		");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "App.MapController.isMarking", {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n	");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n\n		<div class=\"rede_bar rede_bar_logged\">\n			<p><strong class=\"upper\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "User.auth.username", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</strong>, navegue pelo mapa e clique no lugar que você deseja criar seu marcador.</p>\n			<p>\n				<a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "finishMarking", "App.MapController", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"btn\">Salvar posição</a>\n				<a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelMarking", "App.MapController", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"btn\">Cancelar</a>\n			</p>\n		</div>	\n\n		");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n		\n		<div class=\"rede_bar rede_bar_logged\">\n			<p>Bem-vindo(a) a nossa rede, <strong class=\"upper\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "User.auth.username", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</strong></p>\n			<p><a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "startMarking", "App.MapController", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"btn\">Mudar minha posição no mapa</a></p>\n		</div>\n\n		");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n		\n		<div class=\"rede_bar rede_bar_unlogged\">\n			<p>Conecte-se e participe da nossa rede!</p>\n			<p>");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn")
  },inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "user", options) : helperMissing.call(depth0, "linkTo", "user", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</p>\n		</div>\n\n	");
  return buffer;
  }
function program10(depth0,data) {
  
  
  data.buffer.push("Participar");
  }

  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.RedeMapaView", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "App.MapController.isFetching", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  
});

Ember.TEMPLATES["rede_mapa"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("<div id=\"map_canvas\"></div>");
  
});

Ember.TEMPLATES["upac"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("<h1 class=\"logo\">UPAC</h1>\n\n<p>Nossa proposta educacional está calcada em uma visão de educação que toma  a vivência como caminho e considera o saber-de- experiência-feito como ponto de partida, base da produção do conhecimento. Aqui referenciamos um dos nossos mestres, Paulo Freire, que nos ensina que o conhecimento provém da experiência. Nos ensina ainda, dialogando com nossa mestra maior, Nise da Silveira, que não se educa só pela racionalidade. Portanto apresentamos a amorosidade como princípio fundante de nosso caminho pedagógico e que gera o afeto catalisador, grande legado de Nise que, por sua vez, gera cuidado e alegria também conceitos que nos iluminam e orientam o nosso caminhar.</p>\n\n<iframe width=\"560\" height=\"315\" src=\"http://www.youtube.com/embed/XCVsm-_B_pU\" frameborder=\"0\" allowfullscreen></iframe>\n\n<p>Aprendemos com Baruch de Spinoza que somos afetados pelas paixões e que as paixões que geram alegria  despertam nossa potência de viver. Portanto as paixões alegres constituem-se também referencias de nossa pratica pedagógica. Também dialogando com Nise e Spinoza referendamos a idéia de Deus  como algo inerente ao humano, síntese entre transcendência e imanência, sagrado e profano, corpo e espírito. Apresentamos a vida como centralidade, biocentrismo em vez de antropocentrismo. Portanto nossa universidade referencia as praticas tradicionais como o xamanismo, o candomblé e tantas outras, como caminhos de aprendizagens significativas, de fortalecimento da identidade e dos desvelamento do que Jung chamou de  inconsciente coletivo.</p>\n\n<p>Na UPAC propomos uma ciência intuitiva, que considera a importância do ato criador e onde criação não se separa da invenção. Onde a poesia e a cultura popular revelam a beleza do conhecer  que gera luz, faz nascer novas possibilidades de transformação do cotidiano em suas complexidades. Referenciamos ainda Paulo Freire  ao compreendermos o humano como inacabado em sua incompletude que valoriza o saber do outro e da outra respeitando as diferenças e reconhecendo as semelhanças propondo o exercício da alteridade produtor de polifonias e policromias.</p>\n\n<p>Parte de uma visão ética que considera a fraternidade e a solidariedade como ideias-força e compreendendo a circularidade sistêmica, propõe mandalas como sínteses reflexivas e movimentos  em teias que referendam a conjugação do verbo esperançar como estratégia de conquista da liberdade.</p>\n\n<h2>UPAC na rede</h2>\n\n<p>Este site é uma plataforma de colaboração para os integrantes da UPAC e quem mais estiver interessado em ingressar na nossa rede.</p>\n\n<p>Navegue pelos conteúdos através do menu à esquerda. Cada botão leva a um espaço diferente:</p>\n\n<img src=\"./img/upac_sobre_icones.png\"/>\n\n<p>E para entrar com seu perfil ou se cadastrar, clique no botão à direita:</p>\n\n<img src=\"./img/upac_sobre_login.png\"/>\n\n<h2>Contato</h2>\n\n<p>\n	<strong>Universidade Popular de Arte e Ciência</strong>\n	<br/>Inst. Mun. de Assistência À Saúde Nise da Silveira\n	<br/>R. Ramiro Magalhães, 521 - Engenho de Dentro\n	<br/>Rio de Janeiro - RJ, 20730-460\n</p>\n\n<p><strong>contato@upac.br</strong></p>");
  
});

Ember.TEMPLATES["user"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n\n	<p><strong class=\"upper\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "User.auth.username", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</strong>, você está conectado e pronto para participar.</p>\n	\n	<p><div class=\"btn-group\">\n		");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn btn-large")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "perfil", options) : helperMissing.call(depth0, "linkTo", "perfil", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n		");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn btn-large")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede", options) : helperMissing.call(depth0, "linkTo", "rede", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n		");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn btn-large")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "blog", options) : helperMissing.call(depth0, "linkTo", "blog", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n	</div></p>\n	\n	<p><small>Deseja ");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "logout", options) : helperMissing.call(depth0, "linkTo", "logout", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("?</small></p>\n\n");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("Veja o seu perfil");
  }

function program4(depth0,data) {
  
  
  data.buffer.push("Veja a rede");
  }

function program6(depth0,data) {
  
  
  data.buffer.push("Escreva uma publicação");
  }

function program8(depth0,data) {
  
  
  data.buffer.push("desconectar-se");
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n\n	<ul class=\"nav nav-pills\">\n\n		");
  hashTypes = {'tagName': "STRING",'href': "BOOLEAN"};
  options = {hash:{
    'tagName': ("li"),
    'href': (false)
  },inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "user.index", options) : helperMissing.call(depth0, "linkTo", "user.index", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n		");
  hashTypes = {'tagName': "STRING",'href': "BOOLEAN"};
  options = {hash:{
    'tagName': ("li"),
    'href': (false)
  },inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "user.cadastrar", options) : helperMissing.call(depth0, "linkTo", "user.cadastrar", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n	</ul>\n	\n	");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n");
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n			<a ");
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.href")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Já tenho uma conta</a>\n		");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n			<a ");
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.href")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Quero me registrar</a>\n		");
  return buffer;
  }

  data.buffer.push("<div class=\"row-fluid\">\n	\n	<div class=\"span4\">\n		<h1 class=\"side_title\">entre na rede UPAC</h1>\n	</div>\n\n	<div class=\"span8\">\n\n		<p>&nbsp;</p>\n\n");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "User.auth.loggedIn", {hash:{},inverse:self.program(10, program10, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	</div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["user/cadastrar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n			<div class=\"alert alert-error\">\n			  ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "flashMsg", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n			</div>\n			");
  return buffer;
  }

  data.buffer.push("<form id=\"register\" class=\"form-horizontal\">\n	<div class=\"control-group\">\n		<label class=\"control-label\" for=\"username\">Nome de usuário</label>\n		<div class=\"controls\">\n			<input type=\"text\" id=\"username\" name=\"username\" placeholder=\"\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onFocus", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n		</div>\n	</div>\n	<div class=\"control-group\">\n		<label class=\"control-label\" for=\"email\">E-mail</label>\n		<div class=\"controls\">\n			<input type=\"text\" id=\"email\" name=\"email\" placeholder=\"\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onFocus", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n		</div>\n	</div>\n	<div class=\"control-group\">\n		<label class=\"control-label\" for=\"password\">Senha</label>\n		<div class=\"controls\">\n			<input type=\"password\" id=\"password\" name=\"password\" placeholder=\"\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onFocus", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n		</div>\n	</div>\n	<div class=\"control-group\">\n		<label class=\"control-label\" for=\"valpassword\">Repita a senha</label>\n		<div class=\"controls\">\n			<input type=\"password\" id=\"valpassword\" placeholder=\"\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onFocus", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n		</div>\n	</div>\n	<div class=\"control-group\">\n		<div class=\"controls\">\n			<p><button type=\"submit\" class=\"btn\" ");
  hashTypes = {'disabled': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'disabled': ("isPosting")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "submit", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Cadastrar</button></p>\n			");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "flashMsg", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		</div>\n	</div>\n</form>");
  return buffer;
  
});

Ember.TEMPLATES["user/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n			<div class=\"alert alert-error\">\n			  ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "flashMsg", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n			</div>\n			");
  return buffer;
  }

  data.buffer.push("<form id=\"login\" class=\"form-horizontal\">\n	<div class=\"control-group\">\n		<label class=\"control-label\" for=\"username\">Usuário ou e-mail</label>\n		<div class=\"controls\">\n			<input type=\"text\" id=\"username\" name=\"username\" placeholder=\"\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onFocus", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n		</div>\n	</div>\n	<div class=\"control-group\">\n		<label class=\"control-label\" for=\"password\">Senha</label>\n		<div class=\"controls\">\n			<input type=\"password\" id=\"password\" name=\"password\" placeholder=\"\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onFocus", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n		</div>\n	</div>\n	<div class=\"control-group\">\n		<div class=\"controls\">\n			<p><button type=\"submit\" class=\"btn\" ");
  hashTypes = {'disabled': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'disabled': ("isPosting")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "submit", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Entrar</button></p>\n			");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "flashMsg", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		</div>\n	</div>\n</form>\n\n");
  return buffer;
  
});