Ember.TEMPLATES["agenda"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '';


  return buffer;
  
});

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.MenuView", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n\r\n<div id=\"wrapper\" ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("route_class")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n\r\n	<section id=\"content\">\r\n		\r\n		");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n\r\n	</section>\r\n	\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["blog"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("<h1>Blog</h1>\r\n\r\n<img src=\"./img/temp/blog_01.jpg\"/>");
  
});

Ember.TEMPLATES["home"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashTypes, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("<img src=\"./img/temp/home_01.png\"/>");
  }

  data.buffer.push("<div class=\"static_home\">");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "upac", options) : helperMissing.call(depth0, "linkTo", "upac", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</div>\r\n\r\n");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.HomeSlidesView", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  return buffer;
  
});

Ember.TEMPLATES["home_slides"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("<ul class=\"slideshow\">\r\n	<li><img src=\"./img/home01.jpg\"></li>\r\n	<li><img src=\"./img/home02.jpg\"></li>\r\n	<li><img src=\"./img/home03.jpg\"></li>\r\n</ul>");
  
});

Ember.TEMPLATES["menu"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashTypes, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n				<span class=\"ico\"></span>\r\n				<span class=\"caption\"><span>Entrada</span></span>\r\n			");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n				<span class=\"ico\"></span>\r\n				<span class=\"caption\"><span>Sobre a UPAC</span></span>\r\n			");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n				<span class=\"ico\"></span>\r\n				<span class=\"caption\"><span>Rede</span></span>\r\n			");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\r\n				<span class=\"ico\"></span>\r\n				<span class=\"caption\"><span>Blog</span></span>\r\n			");
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\r\n				<span class=\"ico\"></span>\r\n				<span class=\"caption\"><span>Agenda</span></span>\r\n			");
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\r\n\r\n		<li class=\"menu_it logout\">\r\n			");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "logout", options) : helperMissing.call(depth0, "linkTo", "logout", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n		</li>\r\n\r\n	");
  return buffer;
  }
function program12(depth0,data) {
  
  
  data.buffer.push("\r\n				<span class=\"ico\"></span>\r\n				<span class=\"caption\"><span>Sair</span></span>\r\n			");
  }

function program14(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\r\n\r\n		<li class=\"menu_it participate\">\r\n			");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "user", options) : helperMissing.call(depth0, "linkTo", "user", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n		</li>\r\n\r\n	");
  return buffer;
  }
function program15(depth0,data) {
  
  
  data.buffer.push("\r\n				<span class=\"ico\"></span>\r\n				<span class=\"caption\"><span>Participar</span></span>\r\n			");
  }

function program17(depth0,data) {
  
  
  data.buffer.push("\r\n				<span class=\"ico\"></span>\r\n				<span class=\"caption\"><span>Pesquisar</span></span>\r\n			");
  }

function program19(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\r\n\r\n		<li class=\"menu_it profile\">\r\n			");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(20, program20, data),contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede.perfil", "User.model", options) : helperMissing.call(depth0, "linkTo", "rede.perfil", "User.model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n		</li>\r\n\r\n		<li class=\"menu_it add rede\">\r\n			");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(22, program22, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede.add", options) : helperMissing.call(depth0, "linkTo", "rede.add", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n		</li>\r\n\r\n	");
  return buffer;
  }
function program20(depth0,data) {
  
  
  data.buffer.push("\r\n				<span class=\"ico\"></span>\r\n				<span class=\"caption\"><span>Meu perfil</span></span>\r\n			");
  }

function program22(depth0,data) {
  
  
  data.buffer.push("\r\n				<span class=\"ico\"></span>\r\n				<span class=\"caption\"><span>Adicionar</span></span>\r\n			");
  }

  data.buffer.push("<nav id=\"main_menu\" ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("route_class")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n	<ul>\r\n		<li class=\"menu_it home\">\r\n			");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "home", options) : helperMissing.call(depth0, "linkTo", "home", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n		</li>\r\n		<li class=\"menu_it upac\">\r\n			");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "upac", options) : helperMissing.call(depth0, "linkTo", "upac", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n		</li>\r\n		<li class=\"menu_it rede\">\r\n			");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede", options) : helperMissing.call(depth0, "linkTo", "rede", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n		</li>\r\n		<li class=\"menu_it blog\">\r\n			");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "blog", options) : helperMissing.call(depth0, "linkTo", "blog", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n		</li>\r\n		<li class=\"menu_it agenda\">\r\n			");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "agenda", options) : helperMissing.call(depth0, "linkTo", "agenda", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n		</li>\r\n	</ul>\r\n</nav>\r\n\r\n<div id=\"sec_menu\" ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("route_class")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n	<ul>\r\n	");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "User.auth.loggedIn", {hash:{},inverse:self.program(14, program14, data),fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n		<li class=\"menu_it busca rede\">\r\n			");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede.index", options) : helperMissing.call(depth0, "linkTo", "rede.index", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n		</li>\r\n\r\n	");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "User.auth.loggedIn", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n	</ul>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["rede"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.RedeMapaView", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n\r\n<div id=\"rede_sidebar\">\r\n	");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["rede/add"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n		\r\n		<h3>O que gostaria de adicionar?</h3>\r\n\r\n		<input type=\"text\"/>\r\n\r\n	");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\r\n		<p>Conecte-se e participe da nossa rede!</p>\r\n		<p>");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "user", options) : helperMissing.call(depth0, "linkTo", "user", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</p>\r\n	");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push("Participar");
  }

  data.buffer.push("<div class=\"pad\">\r\n	");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "User.auth.loggedIn", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["rede/avatar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\r\n		<h2>\r\n			");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "User.auth.username", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n		</h2>\r\n\r\n		");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.UserPhoto", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n		\r\n		");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede.perfil", "User.model", options) : helperMissing.call(depth0, "linkTo", "rede.perfil", "User.model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n		");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede.perfil", "User.model", options) : helperMissing.call(depth0, "linkTo", "rede.perfil", "User.model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n		\r\n\r\n	");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("salvar");
  }

function program4(depth0,data) {
  
  
  data.buffer.push("cancelar");
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\r\n		<p>Conecte-se e participe da nossa rede!</p>\r\n		<p>");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn")
  },inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "user", options) : helperMissing.call(depth0, "linkTo", "user", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</p>\r\n	");
  return buffer;
  }
function program7(depth0,data) {
  
  
  data.buffer.push("Participar");
  }

  data.buffer.push("<div class=\"pad\">\r\n	");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "User.auth.loggedIn", {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["rede/editar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Cancelar");
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n				<div class=\"alert alert-error\">\r\n				  ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "flashMsg", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n				</div>\r\n				");
  return buffer;
  }

  data.buffer.push("<div class=\"pad\">\r\n	<h2>Editar perfil</h2>\r\n	<form id=\"editar_perfil\">\r\n		<div class=\"control-group\">\r\n			<label class=\"control-label\" for=\"name\">Nome e sobrenome</label>\r\n			<div class=\"controls\">\r\n				<input type=\"text\" id=\"name\" name=\"name\" placeholder=\"\" ");
  hashTypes = {'value': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'value': ("User.model.name")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onFocus", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n			</div>\r\n		</div>\r\n		<div class=\"control-group\">\r\n			<label class=\"control-label\" for=\"email\">E-mail</label>\r\n			<div class=\"controls\">\r\n				<input type=\"text\" id=\"email\" name=\"email\" placeholder=\"\" ");
  hashTypes = {'value': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'value': ("User.model.email")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onFocus", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n			</div>\r\n		</div>\r\n		<div class=\"control-group\">\r\n			<label class=\"control-label\" for=\"about\">Sobre você</label>\r\n			<div class=\"controls\">\r\n				");
  hashTypes = {'valueBinding': "STRING",'rows': "STRING",'id': "STRING",'name': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextArea", {hash:{
    'valueBinding': ("User.model.about"),
    'rows': ("5"),
    'id': ("about"),
    'name': ("about")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("  \r\n			</div>\r\n		</div>\r\n		<div class=\"control-group\">\r\n			<div class=\"controls\">\r\n				<p>\r\n					<button type=\"submit\" class=\"btn btn-primary\" ");
  hashTypes = {'disabled': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'disabled': ("isPosting")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "submit", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Salvar</button>\r\n					");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede.perfil", "User.model", options) : helperMissing.call(depth0, "linkTo", "rede.perfil", "User.model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n				</p>\r\n				");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "flashMsg", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n			</div>\r\n		</div>\r\n	</form>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["rede/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push(", <span class=\"upper\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "User.auth.username", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n	\r\n	<p>Buscando dados...</p>\r\n\r\n");
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\r\n\r\n	");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "User.auth.loggedIn", {hash:{},inverse:self.program(9, program9, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\r\n		\r\n		<p>");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn")
  },inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede.perfil", "User.model", options) : helperMissing.call(depth0, "linkTo", "rede.perfil", "User.model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</p>\r\n\r\n	");
  return buffer;
  }
function program7(depth0,data) {
  
  
  data.buffer.push("Meu perfil");
  }

function program9(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\r\n		\r\n		<p>Conecte-se e participe da nossa rede!</p>\r\n		<p>");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn")
  },inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "user", options) : helperMissing.call(depth0, "linkTo", "user", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</p>\r\n\r\n	");
  return buffer;
  }
function program10(depth0,data) {
  
  
  data.buffer.push("Participar");
  }

  data.buffer.push("<div class=\"pad\">\r\n	\r\n	<h1>Bem-vindo a rede UPAC");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "User.auth.loggedIn", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h1>\r\n\r\n\r\n");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "App.MapController.isFetching", {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["rede/perfil"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\r\n\r\n		<div class=\"rede_perfil_foto\">\r\n			");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "isTheLoggedUser", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n			<img src=\"/img/home02.jpg\"/>\r\n		</div>\r\n\r\n		<h2>\r\n			");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "nick", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n		</h2>\r\n\r\n		<p>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "about", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</p>\r\n\r\n		<hr/>\r\n		\r\n		");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "isTheLoggedUser", {hash:{},inverse:self.program(17, program17, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n	");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\r\n				");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn rede_perfil_foto_editar")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede.avatar", options) : helperMissing.call(depth0, "linkTo", "rede.avatar", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n			");
  return buffer;
  }
function program3(depth0,data) {
  
  
  data.buffer.push("Mudar foto <span class=\"fui-new\"></span>");
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\r\n			");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "App.MapController.isMarking", {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n		");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n			\r\n				<div class=\"pad over\">\r\n					<p>Navegue pelo mapa e clique no ponto em que você deseja marcar sua localização.</p>\r\n					<p>\r\n						<a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "finishMarking", "App.MapController", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"btn btn-primary\">Salvar posição</a>\r\n						<a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelMarking", "App.MapController", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"btn btn-danger\">Cancelar</a>\r\n					</p>\r\n				</div>\r\n\r\n			");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\r\n				\r\n				");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "geo.length", {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n				<p>");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn")
  },inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede.editar", options) : helperMissing.call(depth0, "linkTo", "rede.editar", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</p>\r\n\r\n				<p>");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn-")
  },inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "timeline", "model", options) : helperMissing.call(depth0, "linkTo", "timeline", "model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</p>\r\n\r\n			");
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n					<p><a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "startMarking", "App.MapController", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"btn\"><span class=\"fui-location\"></span> Editar localização</a></p>\r\n				");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n					<p><a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "startMarking", "App.MapController", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"btn\"><span class=\"fui-location\"></span> Marque sua localização</a></p>\r\n				");
  return buffer;
  }

function program13(depth0,data) {
  
  
  data.buffer.push("<span class=\"fui-new\"></span> Editar perfil");
  }

function program15(depth0,data) {
  
  
  data.buffer.push("Linha do tempo");
  }

function program17(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\r\n\r\n			<p>");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn-")
  },inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "timeline", "model", options) : helperMissing.call(depth0, "linkTo", "timeline", "model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</p>\r\n			\r\n		");
  return buffer;
  }

function program19(depth0,data) {
  
  
  data.buffer.push("\r\n		<p>carregando perfil</p>\r\n	");
  }

  data.buffer.push("<div class=\"pad\">\r\n	");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "isLoaded", {hash:{},inverse:self.program(19, program19, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["rede_mapa"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("<div id=\"map_canvas\"></div>");
  
});

Ember.TEMPLATES["timeline"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n	\r\n	");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n	\r\n");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n\r\n<p>Carregando...</p>\r\n\r\n");
  }

  data.buffer.push("<div class=\"row-fluid\">\r\n");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "isLoaded", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["timeline/editar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var stack1, hashTypes, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\r\n\r\n<div class=\"span8\">\r\n\r\n	<h1 class=\"upper\">\r\n		");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "name", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	</h1>\r\n\r\n	<hr/>\r\n\r\n	<p>");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "timeline.index", "model", options) : helperMissing.call(depth0, "linkTo", "timeline.index", "model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</p>\r\n	");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.UserPhoto", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n\r\n</div>\r\n\r\n<div class=\"span1\">\r\n	&nbsp;\r\n</div>\r\n\r\n<div class=\"span3\">\r\n	\r\n	<p></p>\r\n\r\n	<dl class=\"\">\r\n	  <dt>login</dt>\r\n	  <dd>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "username", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</dd>\r\n	  <dt>e-mail</dt>\r\n	  <dd>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "email", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</dd>\r\n	  <dt>participa desde</dt>\r\n	  <dd>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "createdAt", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</dd>\r\n	  <dt>último login</dt>\r\n	  <dd>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "lastLogin", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</dd>\r\n	</dl>\r\n\r\n</div>\r\n\r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n			");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "name", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n		");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n			");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "username", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n		");
  return buffer;
  }

function program6(depth0,data) {
  
  
  data.buffer.push("Salvar");
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\r\n	\r\n	Você não pode editar esse perfil. ");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "timeline.index", "model", options) : helperMissing.call(depth0, "linkTo", "timeline.index", "model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n");
  return buffer;
  }
function program9(depth0,data) {
  
  
  data.buffer.push("Voltar");
  }

  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "isTheLoggedUser", {hash:{},inverse:self.program(8, program8, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["timeline/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\r\n			  <dt>último login</dt>\r\n			  <dd>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.momentago),stack1 ? stack1.call(depth0, "lastLogin", options) : helperMissing.call(depth0, "momentago", "lastLogin", options))));
  data.buffer.push("</dd>\r\n		  ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\r\n				");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn btn-large")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "timeline.editar", "model", options) : helperMissing.call(depth0, "linkTo", "timeline.editar", "model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n			");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push("Editar meu perfil");
  }

function program6(depth0,data) {
  
  
  data.buffer.push("Localizar no mapa");
  }

  data.buffer.push("<div class=\"row\">\r\n	<div class=\"span12\">\r\n		<h1 class=\"upper\">\r\n			");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "nick", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n		</h1>\r\n		<hr/>\r\n	</div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n\r\n	<div class=\"span3\">\r\n		\r\n		<p><img src=\"./img/perfil_user.png\"/></p>\r\n\r\n		<dl class=\"\">\r\n		  <dt>login</dt>\r\n		  <dd>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "username", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</dd>\r\n		  <dt>e-mail</dt>\r\n		  <dd>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "email", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</dd>\r\n		  <dt>participa desde</dt>\r\n		  <dd>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.momentago),stack1 ? stack1.call(depth0, "createdAt", options) : helperMissing.call(depth0, "momentago", "createdAt", options))));
  data.buffer.push("</dd>\r\n		  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "lastLogin", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n		</dl>\r\n\r\n	</div>\r\n\r\n	<div class=\"span1\">\r\n		&nbsp;\r\n	</div>\r\n\r\n	<div class=\"span8\">\r\n\r\n		\r\n\r\n		<p>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "about", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</p>\r\n\r\n		<p>\r\n\r\n			");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "isTheLoggedUser", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n			");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn btn-large")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede.perfil", "model", options) : helperMissing.call(depth0, "linkTo", "rede.perfil", "model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n		</p>\r\n\r\n	</div>\r\n\r\n</div>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["upac"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("<h1 class=\"logo\">UPAC</h1>\r\n\r\n<p>Nossa proposta educacional está calcada em uma visão de educação que toma  a vivência como caminho e considera o saber-de- experiência-feito como ponto de partida, base da produção do conhecimento. Aqui referenciamos um dos nossos mestres, Paulo Freire, que nos ensina que o conhecimento provém da experiência. Nos ensina ainda, dialogando com nossa mestra maior, Nise da Silveira, que não se educa só pela racionalidade. Portanto apresentamos a amorosidade como princípio fundante de nosso caminho pedagógico e que gera o afeto catalisador, grande legado de Nise que, por sua vez, gera cuidado e alegria também conceitos que nos iluminam e orientam o nosso caminhar.</p>\r\n\r\n<iframe width=\"560\" height=\"315\" src=\"http://www.youtube.com/embed/XCVsm-_B_pU\" frameborder=\"0\" allowfullscreen></iframe>\r\n\r\n<div class=\"upac-row white\">\r\n	<div class=\"row-fluid\">\r\n		<div class=\"span5\">\r\n			<p><img src=\"./img/upac_figura_01.jpg\"/></p>\r\n		</div>\r\n		<div class=\"span7\">\r\n			<p>Aprendemos com Baruch de Spinoza que somos afetados pelas paixões e que as paixões que geram alegria  despertam nossa potência de viver. Portanto as paixões alegres constituem-se também referencias de nossa pratica pedagógica. Também dialogando com Nise e Spinoza referendamos a idéia de Deus  como algo inerente ao humano, síntese entre transcendência e imanência, sagrado e profano, corpo e espírito. Apresentamos a vida como centralidade, biocentrismo em vez de antropocentrismo. Portanto nossa universidade referencia as praticas tradicionais como o xamanismo, o candomblé e tantas outras, como caminhos de aprendizagens significativas, de fortalecimento da identidade e dos desvelamento do que Jung chamou de  inconsciente coletivo.</p>\r\n		</div>\r\n	</div>\r\n</div>\r\n\r\n<div class=\"upac-row\">\r\n	<div class=\"row-fluid\">\r\n\r\n		<div class=\"span7\">\r\n			<p>Na UPAC propomos uma ciência intuitiva, que considera a importância do ato criador e onde criação não se separa da invenção. Onde a poesia e a cultura popular revelam a beleza do conhecer  que gera luz, faz nascer novas possibilidades de transformação do cotidiano em suas complexidades. Referenciamos ainda Paulo Freire  ao compreendermos o humano como inacabado em sua incompletude que valoriza o saber do outro e da outra respeitando as diferenças e reconhecendo as semelhanças propondo o exercício da alteridade produtor de polifonias e policromias.</p>\r\n			<p><strong>Parte de uma visão ética que considera a fraternidade e a solidariedade como ideias-força e compreendendo a circularidade sistêmica, propõe mandalas como sínteses reflexivas e movimentos  em teias que referendam a conjugação do verbo esperançar como estratégia de conquista da liberdade.</strong></p>\r\n		</div>\r\n\r\n		<div class=\"span5\">\r\n			<p><img src=\"./img/upac_figura_02.jpg\"/></p>\r\n		</div>\r\n	</div>\r\n</div>\r\n\r\n<div class=\"contato upac-row white\">\r\n	<h2>Contato</h2>\r\n	<p>\r\n		<span class=\"icon marker\"></span>\r\n		<strong>Universidade Popular de Arte e Ciência</strong>\r\n		<br/>Inst. Mun. de Assistência À Saúde Nise da Silveira\r\n		<br/>R. Ramiro Magalhães, 521 - Engenho de Dentro\r\n		<br/>Rio de Janeiro - RJ, 20730-460\r\n	</p>\r\n	<p>\r\n		<span class=\"icon email\"></span>\r\n		<strong><a href=\"mailto:contato@upac.br\">contato@upac.br</a></strong>\r\n	</p>\r\n</div>");
  
});

Ember.TEMPLATES["user"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\r\n	\r\n	<h2 class=\"upper\">Olá, ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "User.auth.username", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("!</h2>\r\n\r\n	<p>você está conectado e pronto para participar:</p>\r\n	\r\n	<p>\r\n		<div class=\"btn-group\">\r\n			");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn btn-large")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede.perfil", "User.model", options) : helperMissing.call(depth0, "linkTo", "rede.perfil", "User.model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n		</div>\r\n	</p>\r\n	\r\n	<hr/>\r\n\r\n	<p>Quer saber tudo o que você pode fazer como participante?\r\n	<br/>Assista ao vídeo abaixo para ver como navegar e colaborar na nossa rede:</p>\r\n\r\n	<iframe width=\"560\" height=\"315\" src=\"http://www.youtube.com/embed/rZNMXflQRcE\" frameborder=\"0\" allowfullscreen></iframe>\r\n	\r\n	<hr/>\r\n\r\n	<p><small>Esta não é a sua conta? ");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "logout", options) : helperMissing.call(depth0, "linkTo", "logout", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</small></p>\r\n\r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("ver o meu perfil");
  }

function program4(depth0,data) {
  
  
  data.buffer.push("Desconectar-se.");
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\r\n\r\n	<ul class=\"nav nav-pills\">\r\n\r\n		");
  hashTypes = {'tagName': "STRING",'href': "BOOLEAN"};
  options = {hash:{
    'tagName': ("li"),
    'href': (false)
  },inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "user.index", options) : helperMissing.call(depth0, "linkTo", "user.index", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n		");
  hashTypes = {'tagName': "STRING",'href': "BOOLEAN"};
  options = {hash:{
    'tagName': ("li"),
    'href': (false)
  },inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "user.cadastrar", options) : helperMissing.call(depth0, "linkTo", "user.cadastrar", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n	</ul>\r\n	\r\n	");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n\r\n");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n			<a ");
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.href")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Já tenho uma conta</a>\r\n		");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n			<a ");
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.href")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Quero me registrar</a>\r\n		");
  return buffer;
  }

  data.buffer.push("<div class=\"row\">\r\n	\r\n	<div class=\"span4\">\r\n		<h1 class=\"side_title\">entre na rede UPAC</h1>\r\n	</div>\r\n\r\n	<div class=\"span1\">\r\n		&nbsp;\r\n	</div>\r\n\r\n	<div class=\"span7\">\r\n\r\n		<p>&nbsp;</p>\r\n\r\n");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "User.auth.loggedIn", {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n	</div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["user/cadastrar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n			<div class=\"alert alert-error\">\r\n			  ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "flashMsg", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n			</div>\r\n			");
  return buffer;
  }

  data.buffer.push("<form id=\"register\" class=\"form-horizontal\">\r\n	<div class=\"control-group\">\r\n		<label class=\"control-label\" for=\"name\">Nome e sobrenome</label>\r\n		<div class=\"controls\">\r\n			<input type=\"text\" id=\"name\" name=\"name\" placeholder=\"\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onFocus", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n		</div>\r\n	</div>\r\n	<div class=\"control-group\">\r\n		<label class=\"control-label\" for=\"username\">Nome de usuário</label>\r\n		<div class=\"controls\">\r\n			<input type=\"text\" id=\"username\" name=\"username\" placeholder=\"\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onFocus", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n			<span class=\"help-block\">sem espaços ou acentos, seu login no site</span>\r\n		</div>\r\n	</div>\r\n	<div class=\"control-group\">\r\n		<label class=\"control-label\" for=\"email\">E-mail</label>\r\n		<div class=\"controls\">\r\n			<input type=\"text\" id=\"email\" name=\"email\" placeholder=\"\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onFocus", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n		</div>\r\n	</div>\r\n	<div class=\"control-group\">\r\n		<label class=\"control-label\" for=\"password\">Senha</label>\r\n		<div class=\"controls\">\r\n			<input type=\"password\" id=\"password\" name=\"password\" placeholder=\"\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onFocus", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n		</div>\r\n	</div>\r\n	<div class=\"control-group\">\r\n		<label class=\"control-label\" for=\"valpassword\">Repita a senha</label>\r\n		<div class=\"controls\">\r\n			<input type=\"password\" id=\"valpassword\" placeholder=\"\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onFocus", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n		</div>\r\n	</div>\r\n	<div class=\"control-group\">\r\n		<div class=\"controls\">\r\n			<p><button type=\"submit\" class=\"btn\" ");
  hashTypes = {'disabled': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'disabled': ("isPosting")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "submit", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Cadastrar</button></p>\r\n			");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "flashMsg", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n		</div>\r\n	</div>\r\n</form>");
  return buffer;
  
});

Ember.TEMPLATES["user/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n			<div class=\"alert alert-error\">\r\n			  ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "flashMsg", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n			</div>\r\n			");
  return buffer;
  }

  data.buffer.push("<form id=\"login\" class=\"form-horizontal\">\r\n	<div class=\"control-group\">\r\n		<label class=\"control-label\" for=\"username\">Usuário ou e-mail</label>\r\n		<div class=\"controls\">\r\n			<input type=\"text\" id=\"username\" name=\"username\" placeholder=\"\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onFocus", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n		</div>\r\n	</div>\r\n	<div class=\"control-group\">\r\n		<label class=\"control-label\" for=\"password\">Senha</label>\r\n		<div class=\"controls\">\r\n			<input type=\"password\" id=\"password\" name=\"password\" placeholder=\"\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onFocus", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n		</div>\r\n	</div>\r\n	<div class=\"control-group\">\r\n		<div class=\"controls\">\r\n			<p><button type=\"submit\" class=\"btn\" ");
  hashTypes = {'disabled': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'disabled': ("isPosting")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "submit", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Entrar</button></p>\r\n			");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "flashMsg", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n		</div>\r\n	</div>\r\n</form>\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["user_photo"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("<input id=\"fileupload\" type=\"file\" name=\"image\"/>\r\n<div class=\"progress progress-striped active\">\r\n  <div class=\"bar\" style=\"width: 0%;\"></div>\r\n</div>");
  
});