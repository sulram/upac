Ember.TEMPLATES["_anonymous"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashTypes, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Participar");
  }

  data.buffer.push("<p>Conecte-se e participe da nossa rede!</p>\n<p>");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "user", options) : helperMissing.call(depth0, "linkTo", "user", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</p>");
  return buffer;
  
});

Ember.TEMPLATES["_blogposts"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var stack1, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n	<div class=\"grid_posts\">\n		");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "articles.length", {hash:{},inverse:self.program(13, program13, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	</div>\n\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n			");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "article", "in", "articles", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n				");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "article.img", {hash:{},inverse:self.program(10, program10, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n					<article ");
  hashTypes = {'id': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'id': ("article._id")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"featured\">\n						");
  hashTypes = {'classNameBindings': "STRING"};
  options = {hash:{
    'classNameBindings': ("article.palette")
  },inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "blog.post", "article", options) : helperMissing.call(depth0, "linkTo", "blog.post", "article", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n					</article>\n				");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n							<div class=\"figure\" ");
  hashTypes = {'style': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'style': ("article.bgimg")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push("/>\n							</div>\n							<div class=\"info\">\n								<span class=\"title\">\n									");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "article.title", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n								</span>\n								<span class=\"date\">\n									");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "article.publicationDate", {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n								</span>\n								<span class=\"author\">\n									<span class=\"post_avatar\">\n										<img ");
  hashTypes = {'src': "ID"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'src': ("article.profile.avatar_icon")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push("/>\n									</span>\n									<span class=\"authorname\">\n										publicado por<br/>\n										<strong>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "article.profile.nick", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</strong>\n									</span>\n								</span>\n							</div>\n						");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n										");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.momentago),stack1 ? stack1.call(depth0, "article.publicationDate", options) : helperMissing.call(depth0, "momentago", "article.publicationDate", options))));
  data.buffer.push("\n									");
  return buffer;
  }

function program8(depth0,data) {
  
  
  data.buffer.push("\n										sem data\n									");
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n					<article ");
  hashTypes = {'id': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'id': ("article._id")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n						");
  hashTypes = {'classNameBindings': "STRING"};
  options = {hash:{
    'classNameBindings': ("article.palette")
  },inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "blog.post", "article", options) : helperMissing.call(depth0, "linkTo", "blog.post", "article", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n					</article>\n				");
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n							<div class=\"info\">\n								<span class=\"title\">\n									");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "article.title", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n								</span>\n								<span class=\"date\">\n									");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "article.publicationDate", {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n								</span>\n								<span class=\"excerpt\">\n									");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "article.excerpt", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n								</span>\n								<span class=\"author\">\n									<span class=\"post_avatar\">\n										<img ");
  hashTypes = {'src': "ID"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'src': ("article.profile.avatar_icon")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push("/>\n									</span>\n									<span class=\"authorname\">\n										publicado por<br/>\n										<strong>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "article.profile.nick", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</strong>\n									</span>\n								</span>\n							</div>\n						");
  return buffer;
  }

function program13(depth0,data) {
  
  
  data.buffer.push("\n			Não há mais postagens\n		");
  }

function program15(depth0,data) {
  
  
  data.buffer.push("\n\n	<p class=\"def_loading\">carregando publicações</p>\n\n");
  }

  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "isLoaded", {hash:{},inverse:self.program(15, program15, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["agenda"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("<h1>Seus eventos na rede</h1>\n<p>Em breve você poderá anunciar seus eventos na rede UPAC! Aguarde!</p>\n\n<p><img src=\"/img/temp/agenda_01.png\"></p>");
  
});

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n	");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.AddModalView", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n");
  return buffer;
  }

  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.MenuView", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n<div id=\"wrapper\" ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("route_class")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n\n	<section id=\"content\">\n		\n		");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n	</section>\n	\n</div>\n\n");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "contentModalVisible", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  return buffer;
  
});

Ember.TEMPLATES["blog"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashTypes, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("Blog");
  }

  data.buffer.push("<h1>");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "blog", options) : helperMissing.call(depth0, "linkTo", "blog", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</h1>\n\n");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  return buffer;
  
});

Ember.TEMPLATES["blog/post"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n		\n		<div class=\"row-fluid post_header\">\n			<div class=\"span8\">\n				<h3 class=\"title\">\n					");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "article.title", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				</h3>\n				<p class=\"date\">");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.momentdate),stack1 ? stack1.call(depth0, "article.publicationDate", options) : helperMissing.call(depth0, "momentdate", "article.publicationDate", options))));
  data.buffer.push(" (");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.momentago),stack1 ? stack1.call(depth0, "article.publicationDate", options) : helperMissing.call(depth0, "momentago", "article.publicationDate", options))));
  data.buffer.push(")</p>\n				<p class=\"excerpt\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "article.excerpt", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</p>\n			</div>\n			\n			<div class=\"span1\"></div>\n\n			<div class=\"span3 post_info\">\n				<div>\n					<a class=\"post_avatar\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "openProfile", "profile", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n						<img ");
  hashTypes = {'src': "ID"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'src': ("profile.avatar_icon")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push("/>\n					</a>\n\n					<p>Postado por <a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "openProfile", "profile", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "profile.nick", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</a></p>\n				</div>\n			</div>\n		</div>\n\n		<!--<div class=\"row-fluid\">\n			<div class=\"span12 firstimage\">\n				<img src=\"/img/home02.jpg\"/>\n			</div>\n		</div>-->\n		\n		<div class=\"row-fluid\">\n			\n			<div class=\"span8 post_content\">\n				");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "article.content", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n				<p class=\"tags\">\n					Palavras-chave: \n					");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "article.tags", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n				</p>\n				<hr/>\n				\n				");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "commentsLoaded", {hash:{},inverse:self.program(27, program27, data),fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n			</div>\n			\n			<div class=\"span1\"></div>\n\n			<div class=\"span3\">\n				");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "isOwner", {hash:{},inverse:self.noop,fn:self.program(29, program29, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("	\n			</div>\n\n		</div>\n\n	");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n						");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "article.title", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n					");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n						");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "isOwner", {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("	\n					");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n							<a ");
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("edit_link")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Sem título</a>\n						");
  return buffer;
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\n							Sem título\n						");
  }

function program9(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n					");
  hashTypes = {'unescaped': "STRING"};
  stack1 = helpers._triageMustache.call(depth0, "article.content", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n						<a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "openTag", "", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "name", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</a>\n					");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n\n					<div class=\"post_comments\">\n						\n						");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "commentCount", {hash:{},inverse:self.program(17, program17, data),fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n					</div>\n					\n					");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "User.auth.loggedIn", {hash:{},inverse:self.program(24, program24, data),fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n				");
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n							<h3>Comentários (");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "commentCount", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(")</h3>\n\n							<ul>\n								");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "comment", "in", "comments", {hash:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n							</ul>\n\n						");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n									<li class=\"comment\">\n										<div class=\"row\">\n											<div class=\"span2\" style=\"text-align: right;\">\n												<p>\n													<a class=\"post_avatar\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "openProfile", "comment.profile", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n														<img ");
  hashTypes = {'src': "ID"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'src': ("comment.profile.avatar_icon")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push("/>\n													</a>\n												</p>\n											</div>\n											<div class=\"span9 comment_content\">\n												<p><span class=\"comment_info\"><a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "openProfile", "comment.profile", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "comment.profile.nick", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</a> • ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.momentago),stack1 ? stack1.call(depth0, "comment.createdAt", options) : helperMissing.call(depth0, "momentago", "comment.createdAt", options))));
  data.buffer.push("</span></p>\n\n												<p>");
  hashTypes = {'unescaped': "STRING"};
  stack2 = helpers._triageMustache.call(depth0, "comment.content", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</p>\n												\n											</div>\n										</div>\n									</li>	\n								");
  return buffer;
  }

function program17(depth0,data) {
  
  
  data.buffer.push("\n							<!--<h3>Nenhum comentário até agora</h3>-->\n						");
  }

function program19(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n						\n						");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "isPostingComment", {hash:{},inverse:self.program(22, program22, data),fn:self.program(20, program20, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n					");
  return buffer;
  }
function program20(depth0,data) {
  
  
  data.buffer.push("\n\n							<p class=\"def_loading\">Enviando comentário</p>\n\n						");
  }

function program22(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n							\n							<h4>Enviar Comentário</h4>\n\n							<textarea id=\"new_comment\" rows=\"5\"></textarea>\n							<a class=\"btn btn-w-icon palette-pomegranate\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "postComment", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("><span class=\"fui-chat\"></span> Comentar</a>\n\n						");
  return buffer;
  }

function program24(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n						\n						<hr/>\n\n						<p>Quer fazer um comentário?</p>\n						<p>");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn")
  },inverse:self.noop,fn:self.program(25, program25, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "user", options) : helperMissing.call(depth0, "linkTo", "user", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</p>\n\n					");
  return buffer;
  }
function program25(depth0,data) {
  
  
  data.buffer.push("Crie uma conta");
  }

function program27(depth0,data) {
  
  
  data.buffer.push("\n					\n					<p class=\"def_loading\">Carregando comentários</p>\n\n				");
  }

function program29(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n					<p><a class=\"btn btn-w-icon\" ");
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("edit_link")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push("><span class=\"fui-new\"></span> Editar</a></p>\n				");
  return buffer;
  }

function program31(depth0,data) {
  
  
  data.buffer.push("\n\n		<p class=\"def_loading\">carregando publicação</p>\n\n	");
  }

  data.buffer.push("<div class=\"thepost\">\n\n	");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "isLoaded", {hash:{},inverse:self.program(31, program31, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["blog/recentes"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n	<div class=\"pagination\">\n		<ul>\n			<li class=\"previous\">\n				");
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("fui-arrow-left")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "blog.recentes", "prevPage", options) : helperMissing.call(depth0, "linkTo", "blog.recentes", "prevPage", options))));
  data.buffer.push("\n			</li>\n			");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "page", "in", "pages", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n			<li class=\"next\">\n				");
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("fui-arrow-right")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "blog.recentes", "nextPage", options) : helperMissing.call(depth0, "linkTo", "blog.recentes", "nextPage", options))));
  data.buffer.push("\n			</li>\n		</ul>\n	</div>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n				");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "page.is_current", {hash:{},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n					<li class=\"active\">");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "blog.recentes", "page", options) : helperMissing.call(depth0, "linkTo", "blog.recentes", "page", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n				");
  return buffer;
  }
function program4(depth0,data) {
  
  var hashTypes;
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "page.page_num", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n					<li>");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "blog.recentes", "page", options) : helperMissing.call(depth0, "linkTo", "blog.recentes", "page", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n				");
  return buffer;
  }

  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "blogposts", options) : helperMissing.call(depth0, "partial", "blogposts", options))));
  data.buffer.push("\n\n");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "needPagination", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  return buffer;
  
});

Ember.TEMPLATES["blog/tag"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n	");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "tagName", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n	&nbsp;\n");
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n	<div class=\"pagination\">\n		<ul>\n			<li class=\"previous\">\n				");
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("fui-arrow-left")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "blog.tag", "prevPage", options) : helperMissing.call(depth0, "linkTo", "blog.tag", "prevPage", options))));
  data.buffer.push("\n			</li>\n			");
  hashTypes = {};
  stack2 = helpers.each.call(depth0, "page", "in", "pages", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n			<li class=\"next\">\n				");
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("fui-arrow-right")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "blog.tag", "nextPage", options) : helperMissing.call(depth0, "linkTo", "blog.tag", "nextPage", options))));
  data.buffer.push("\n			</li>\n		</ul>\n	</div>\n");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n				");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "page.is_current", {hash:{},inverse:self.program(10, program10, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n					<li class=\"active\">");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "blog.tag", "page", options) : helperMissing.call(depth0, "linkTo", "blog.tag", "page", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n				");
  return buffer;
  }
function program8(depth0,data) {
  
  var hashTypes;
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "page.page_num", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n					<li>");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "blog.tag", "page", options) : helperMissing.call(depth0, "linkTo", "blog.tag", "page", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n				");
  return buffer;
  }

  data.buffer.push("<h3>\n");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "tagName", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</h3>\n\n");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "blogposts", options) : helperMissing.call(depth0, "partial", "blogposts", options))));
  data.buffer.push("\n\n");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "needPagination", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  return buffer;
  
});

Ember.TEMPLATES["home"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n			<li>\n				<a ");
  hashTypes = {'href': "STRING",'title': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("banner.url"),
    'title': ("banner.text")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n					<img ");
  hashTypes = {'src': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'src': ("banner.img")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push("/>\n				</a>\n			</li>\n		");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n				<li>\n					<p>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "notice.text", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</p>\n					<p><a class=\"leia mais\" ");
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("notice.url")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Leia mais</a></p>\n				</li>\n			");
  return buffer;
  }

  data.buffer.push("<div class=\"home_wrapper\">\n	\n	<h1><span>Universidade</span> <span>Popular de Arte</span> <span>e Ciência</span></h1>\n	\n	<div class=\"destaque\">\n		<ul>\n		");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "banner", "in", "banners", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		</ul>\n	</div>\n\n	<div class=\"noticias\">\n		<ul>\n			");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "notice", "in", "notices", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				<li>&nbsp;</li>\n		</ul>\n	</div>\n\n	<a class=\"maisnoticias\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "nextNotice", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">&raquo;</a>\n\n</div>\n\n");
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
  
  
  data.buffer.push("\n				<span class=\"ico\"></span>\n				<span class=\"caption\"><span>Entrada</span></span>\n			");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n				<span class=\"ico\"></span>\n				<span class=\"caption\"><span>Sobre a UPAC</span></span>\n			");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n				<span class=\"ico\"></span>\n				<span class=\"caption\"><span>Rede</span></span>\n			");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\n				<span class=\"ico\"></span>\n				<span class=\"caption\"><span>Blog</span></span>\n			");
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\n				<span class=\"ico\"></span>\n				<span class=\"caption\"><span>Agenda</span></span>\n			");
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n\n		<li class=\"menu_it logout\">\n			");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "logout", options) : helperMissing.call(depth0, "linkTo", "logout", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n		</li>\n\n	");
  return buffer;
  }
function program12(depth0,data) {
  
  
  data.buffer.push("\n				<span class=\"ico\"></span>\n				<span class=\"caption\"><span>Sair</span></span>\n			");
  }

function program14(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n\n		<li class=\"menu_it participate\">\n			");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "user", options) : helperMissing.call(depth0, "linkTo", "user", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n		</li>\n\n	");
  return buffer;
  }
function program15(depth0,data) {
  
  
  data.buffer.push("\n				<span class=\"ico\"></span>\n				<span class=\"caption\"><span>Participar</span></span>\n			");
  }

function program17(depth0,data) {
  
  
  data.buffer.push("\n				<span class=\"ico\"></span>\n				<span class=\"caption\"><span>Pesquisar</span></span>\n			");
  }

function program19(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n\n		<li class=\"menu_it profile\">\n			");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(20, program20, data),contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede.perfil", "User.model", options) : helperMissing.call(depth0, "linkTo", "rede.perfil", "User.model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n		</li>\n		\n		<li class=\"menu_it marker rede\">\n			<a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showContentModal", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n				<span class=\"ico\"></span>\n				<span class=\"caption\"><span>Criar ponto no mapa</span></span>\n			</a>\n		</li>\n\n		<li class=\"menu_it add\">\n			<a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showContentModal", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n				<span class=\"ico\"></span>\n				<span class=\"caption\"><span>Criar conteúdo</span></span>\n			</a>\n		</li>\n\n	");
  return buffer;
  }
function program20(depth0,data) {
  
  
  data.buffer.push("\n				<span class=\"ico\"></span>\n				<span class=\"caption\"><span>Meu perfil</span></span>\n			");
  }

  data.buffer.push("<nav id=\"main_menu\" ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("route_class")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n	<ul>\n		<li class=\"menu_it home\">\n			");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "home", options) : helperMissing.call(depth0, "linkTo", "home", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n		</li>\n		<li class=\"menu_it upac\">\n			");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "upac", options) : helperMissing.call(depth0, "linkTo", "upac", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n		</li>\n		<li class=\"menu_it rede\">\n			");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede", options) : helperMissing.call(depth0, "linkTo", "rede", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n		</li>\n		<li class=\"menu_it blog\">\n			");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "blog", options) : helperMissing.call(depth0, "linkTo", "blog", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n		</li>\n		<li class=\"menu_it agenda\">\n			");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "agenda", options) : helperMissing.call(depth0, "linkTo", "agenda", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n		</li>\n	</ul>\n</nav>\n\n<div id=\"sec_menu\" ");
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("route_class")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n	<ul>\n	");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "User.auth.loggedIn", {hash:{},inverse:self.program(14, program14, data),fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n		<li class=\"menu_it busca rede\">\n			");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede.index", options) : helperMissing.call(depth0, "linkTo", "rede.index", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n		</li>\n\n	");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "User.auth.loggedIn", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n	</ul>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["modal-content"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"overlay\">\n	<a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "hideContentModal", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"overlay-bg\"></a>\n	<div class=\"overlay-modal\">\n		<ul>\n			<li><a class=\"btn\" href=\"/editor\">Criar publicação</a></li>\n			<li><a class=\"btn\" href=\"/editor\">Criar evento</a></li>\n		</ul>\n	</div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["rede"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.RedeMapaView", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n<div id=\"rede_sidebar\">\n	");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["rede/add"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n		\n		<h3>O que gostaria de adicionar?</h3>\n\n		<input type=\"text\"/>\n\n	");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n		");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "anonymous", options) : helperMissing.call(depth0, "partial", "anonymous", options))));
  data.buffer.push("\n	");
  return buffer;
  }

  data.buffer.push("<div class=\"pad\">\n	");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "User.auth.loggedIn", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["rede/avatar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n		<h2>\n			Foto de perfil\n		</h2>\n\n		");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.UserPhoto", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n	");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n		");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "anonymous", options) : helperMissing.call(depth0, "partial", "anonymous", options))));
  data.buffer.push("\n	");
  return buffer;
  }

  data.buffer.push("<div class=\"pad\">\n	");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "User.auth.loggedIn", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["rede/editar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n	<h2>Editar perfil</h2>\n	<form id=\"editar_perfil\">\n		<div class=\"control-group\">\n			<label class=\"control-label\" for=\"name\">Nome e sobrenome</label>\n			<div class=\"controls\">\n				<input type=\"text\" id=\"name\" name=\"name\" placeholder=\"\" ");
  hashTypes = {'value': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'value': ("User.model.name")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onFocus", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n			</div>\n		</div>\n		<!--<div class=\"control-group\">\n			<label class=\"control-label\" for=\"email\">E-mail</label>\n			<div class=\"controls\">\n				<input type=\"text\" id=\"email\" name=\"email\" placeholder=\"\" ");
  hashTypes = {'value': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'value': ("User.model.email")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onFocus", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n			</div>\n		</div>-->\n		<div class=\"control-group\">\n			<label class=\"control-label\" for=\"about\">Sobre você</label>\n			<div class=\"controls\">\n				");
  hashTypes = {'valueBinding': "STRING",'rows': "STRING",'id': "STRING",'name': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextArea", {hash:{
    'valueBinding': ("User.model.about"),
    'rows': ("5"),
    'id': ("about"),
    'name': ("about")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("  \n			</div>\n		</div>\n			");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "tags", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	</form>\n\n	");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.TagsView", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n\n	");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "App.MapController.isMarking", {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n	");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n				<input type=\"hidden\" name=\"tags[]\" ");
  hashTypes = {'value': "ID"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'value': ("")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push("/>\n			");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n	\n		<div class=\"pad over\">\n			<p>Navegue pelo mapa e clique no ponto em que você deseja marcar sua localização.</p>\n			<p>\n				<a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "finishMarking", "App.MapController", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"btn btn-primary\">Salvar posição</a>\n				<a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelMarking", "App.MapController", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"btn btn-danger\">Cancelar</a>\n			</p>\n		</div>\n\n	");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n		\n		<p>\n			<a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "startMarking", "App.MapController", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"btn btn-w-icon\">\n				<span class=\"fui-location\"></span> \n				");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "User.model.geo.length", {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			</a>\n		</p>			\n\n	\n	<hr/>\n\n	<div class=\"control-group\">\n		<div class=\"controls\">\n			<p>\n				<button type=\"submit\" class=\"btn btn-primary\" ");
  hashTypes = {'disabled': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'disabled': ("isPosting")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "submit", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Salvar perfil</button>\n				");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn")
  },inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede.perfil", "User.model", options) : helperMissing.call(depth0, "linkTo", "rede.perfil", "User.model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n			</p>\n			");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "flashMsg", {hash:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n		</div>\n	</div>\n\n	<p><small>Para alterar e-mail ou senha, ");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede.perfil", "User.model", options) : helperMissing.call(depth0, "linkTo", "rede.perfil", "User.model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(".</small></p>\n\n	");
  return buffer;
  }
function program7(depth0,data) {
  
  
  data.buffer.push("Editar localização");
  }

function program9(depth0,data) {
  
  
  data.buffer.push("Marque sua localização");
  }

function program11(depth0,data) {
  
  
  data.buffer.push("Cancelar");
  }

function program13(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n			<div class=\"alert alert-error\">\n			  ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "flashMsg", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n			</div>\n			");
  return buffer;
  }

function program15(depth0,data) {
  
  
  data.buffer.push("clique aqui");
  }

function program17(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n		");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "anonymous", options) : helperMissing.call(depth0, "partial", "anonymous", options))));
  data.buffer.push("\n	");
  return buffer;
  }

  data.buffer.push("<div class=\"pad\">\n	");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "User.model.isLoaded", {hash:{},inverse:self.program(17, program17, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>");
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
  
  
  data.buffer.push("\n	\n	<p>Buscando dados...</p>\n\n");
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n\n	");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "User.auth.loggedIn", {hash:{},inverse:self.program(9, program9, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n		\n		<p>");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn")
  },inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede.perfil", "User.model", options) : helperMissing.call(depth0, "linkTo", "rede.perfil", "User.model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</p>\n\n	");
  return buffer;
  }
function program7(depth0,data) {
  
  
  data.buffer.push("Meu perfil");
  }

function program9(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n		");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "anonymous", options) : helperMissing.call(depth0, "partial", "anonymous", options))));
  data.buffer.push("\n	");
  return buffer;
  }

  data.buffer.push("<div class=\"pad\">\n	\n	<h1>Bem-vindo a rede UPAC");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "User.auth.loggedIn", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h1>\n\n\n");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "App.MapController.isFetching", {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["rede/perfil"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n\n		<div class=\"rede_perfil_foto\">\n			");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "isTheLoggedUser", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			<img ");
  hashTypes = {'src': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'src': ("avatar_medium")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push("/>\n		</div>\n\n		<h2>\n			");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "nick", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n		</h2>\n\n		<p>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "about", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</p>\n\n		<p class=\"tags\">\n			Palavras-chave: \n			");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "tags", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		</p>\n\n		<hr/>\n		\n		");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "isTheLoggedUser", {hash:{},inverse:self.program(10, program10, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n	");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n				");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn rede_perfil_foto_editar")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede.avatar", options) : helperMissing.call(depth0, "linkTo", "rede.avatar", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n			");
  return buffer;
  }
function program3(depth0,data) {
  
  
  data.buffer.push("Mudar foto <span class=\"fui-new\"></span>");
  }

function program5(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n				<a ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "openTag", "", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "name", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</a>\n			");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n\n\n			<p>");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn btn-w-icon")
  },inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede.editar", options) : helperMissing.call(depth0, "linkTo", "rede.editar", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</p>\n\n		");
  return buffer;
  }
function program8(depth0,data) {
  
  
  data.buffer.push("<span class=\"fui-new\"></span> Editar perfil");
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n\n			<p>");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn-")
  },inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "timeline", "model", options) : helperMissing.call(depth0, "linkTo", "timeline", "model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</p>\n			\n		");
  return buffer;
  }
function program11(depth0,data) {
  
  
  data.buffer.push("Linha do tempo");
  }

function program13(depth0,data) {
  
  
  data.buffer.push("\n		<p class=\"def_loading\">carregando perfil</p>\n	");
  }

  data.buffer.push("<div class=\"pad\">\n	");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "isLoaded", {hash:{},inverse:self.program(13, program13, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>");
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
  data.buffer.push("\n	\n	");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n	\n");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n\n<p>Carregando...</p>\n\n");
  }

  data.buffer.push("<div class=\"row-fluid\">\n");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "isLoaded", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["timeline/editar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var stack1, hashTypes, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n\n<div class=\"span8\">\n\n	<h1 class=\"upper\">\n		");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "name", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	</h1>\n\n	<hr/>\n\n	<p>");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "timeline.index", "model", options) : helperMissing.call(depth0, "linkTo", "timeline.index", "model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</p>\n	");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.UserPhoto", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n</div>\n\n<div class=\"span1\">\n	&nbsp;\n</div>\n\n<div class=\"span3\">\n	\n	<p></p>\n\n	<dl class=\"\">\n	  <dt>login</dt>\n	  <dd>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "username", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</dd>\n	  <dt>e-mail</dt>\n	  <dd>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "email", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</dd>\n	  <dt>participa desde</dt>\n	  <dd>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "createdAt", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</dd>\n	  <dt>último login</dt>\n	  <dd>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "lastLogin", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</dd>\n	</dl>\n\n</div>\n\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n			");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "name", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n		");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n			");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "username", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n		");
  return buffer;
  }

function program6(depth0,data) {
  
  
  data.buffer.push("Salvar");
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n	\n	Você não pode editar esse perfil. ");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "timeline.index", "model", options) : helperMissing.call(depth0, "linkTo", "timeline.index", "model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n");
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
  data.buffer.push("\n			  <dt>último login</dt>\n			  <dd>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.momentago),stack1 ? stack1.call(depth0, "lastLogin", options) : helperMissing.call(depth0, "momentago", "lastLogin", options))));
  data.buffer.push("</dd>\n		  ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n				");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn btn-large")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "timeline.editar", "model", options) : helperMissing.call(depth0, "linkTo", "timeline.editar", "model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n			");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push("Editar meu perfil");
  }

function program6(depth0,data) {
  
  
  data.buffer.push("Localizar no mapa");
  }

  data.buffer.push("<div class=\"row\">\n	<div class=\"span12\">\n		<h1 class=\"upper\">\n			");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "nick", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n		</h1>\n		<hr/>\n	</div>\n</div>\n\n<div class=\"row\">\n\n	<div class=\"span3\">\n		\n		<p><img src=\"./img/perfil_user.png\"/></p>\n\n		<dl class=\"\">\n		  <dt>login</dt>\n		  <dd>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "username", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</dd>\n		  <dt>e-mail</dt>\n		  <dd>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "email", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</dd>\n		  <dt>participa desde</dt>\n		  <dd>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.momentago),stack1 ? stack1.call(depth0, "createdAt", options) : helperMissing.call(depth0, "momentago", "createdAt", options))));
  data.buffer.push("</dd>\n		  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "lastLogin", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n		</dl>\n\n	</div>\n\n	<div class=\"span1\">\n		&nbsp;\n	</div>\n\n	<div class=\"span8\">\n\n		\n\n		<p>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "about", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</p>\n\n		<p>\n\n			");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "isTheLoggedUser", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n			");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn btn-large")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede.perfil", "model", options) : helperMissing.call(depth0, "linkTo", "rede.perfil", "model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n		</p>\n\n	</div>\n\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["upac"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("<h1 class=\"logo\">UPAC</h1>\n\n<p>Nossa proposta educacional está calcada em uma visão de educação que toma  a vivência como caminho e considera o saber-de- experiência-feito como ponto de partida, base da produção do conhecimento. Aqui referenciamos um dos nossos mestres, Paulo Freire, que nos ensina que o conhecimento provém da experiência. Nos ensina ainda, dialogando com nossa mestra maior, Nise da Silveira, que não se educa só pela racionalidade. Portanto apresentamos a amorosidade como princípio fundante de nosso caminho pedagógico e que gera o afeto catalisador, grande legado de Nise que, por sua vez, gera cuidado e alegria também conceitos que nos iluminam e orientam o nosso caminhar.</p>\n\n<iframe width=\"560\" height=\"315\" src=\"http://www.youtube.com/embed/XCVsm-_B_pU\" frameborder=\"0\" allowfullscreen></iframe>\n\n<div class=\"upac-row white\">\n	<div class=\"row-fluid\">\n		<div class=\"span5\">\n			<p><img src=\"./img/upac_figura_01.jpg\"/></p>\n		</div>\n		<div class=\"span7\">\n			<p>Aprendemos com Baruch de Spinoza que somos afetados pelas paixões e que as paixões que geram alegria  despertam nossa potência de viver. Portanto as paixões alegres constituem-se também referencias de nossa pratica pedagógica. Também dialogando com Nise e Spinoza referendamos a idéia de Deus  como algo inerente ao humano, síntese entre transcendência e imanência, sagrado e profano, corpo e espírito. Apresentamos a vida como centralidade, biocentrismo em vez de antropocentrismo. Portanto nossa universidade referencia as praticas tradicionais como o xamanismo, o candomblé e tantas outras, como caminhos de aprendizagens significativas, de fortalecimento da identidade e dos desvelamento do que Jung chamou de  inconsciente coletivo.</p>\n		</div>\n	</div>\n</div>\n\n<div class=\"upac-row\">\n	<div class=\"row-fluid\">\n\n		<div class=\"span7\">\n			<p>Na UPAC propomos uma ciência intuitiva, que considera a importância do ato criador e onde criação não se separa da invenção. Onde a poesia e a cultura popular revelam a beleza do conhecer  que gera luz, faz nascer novas possibilidades de transformação do cotidiano em suas complexidades. Referenciamos ainda Paulo Freire  ao compreendermos o humano como inacabado em sua incompletude que valoriza o saber do outro e da outra respeitando as diferenças e reconhecendo as semelhanças propondo o exercício da alteridade produtor de polifonias e policromias.</p>\n			<p><strong>Parte de uma visão ética que considera a fraternidade e a solidariedade como ideias-força e compreendendo a circularidade sistêmica, propõe mandalas como sínteses reflexivas e movimentos  em teias que referendam a conjugação do verbo esperançar como estratégia de conquista da liberdade.</strong></p>\n		</div>\n\n		<div class=\"span5\">\n			<p><img src=\"./img/upac_figura_02.jpg\"/></p>\n		</div>\n	</div>\n</div>\n\n<div class=\"contato upac-row white\">\n	<h2>Contato</h2>\n	<p>\n		<span class=\"icon marker\"></span>\n		<strong>Universidade Popular de Arte e Ciência</strong>\n		<br/>Inst. Mun. de Assistência À Saúde Nise da Silveira\n		<br/>R. Ramiro Magalhães, 521 - Engenho de Dentro\n		<br/>Rio de Janeiro - RJ, 20730-460\n	</p>\n	<p>\n		<span class=\"icon email\"></span>\n		<strong><a href=\"mailto:contato@upac.br\">contato@upac.br</a></strong>\n	</p>\n</div>");
  
});

Ember.TEMPLATES["user"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n	\n	<h2 class=\"upper\">Olá, ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "User.auth.username", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("!</h2>\n\n	<p>você está conectado e pronto para participar:</p>\n	\n	<p>\n		<div class=\"btn-group\">\n			");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn btn-large")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede.perfil", "User.model", options) : helperMissing.call(depth0, "linkTo", "rede.perfil", "User.model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n		</div>\n	</p>\n	\n	<hr/>\n\n	<p>Quer saber tudo o que você pode fazer como participante?\n	<br/>Assista ao vídeo abaixo para ver como navegar e colaborar na nossa rede:</p>\n\n	<iframe width=\"560\" height=\"315\" src=\"http://www.youtube.com/embed/rZNMXflQRcE\" frameborder=\"0\" allowfullscreen></iframe>\n	\n	<hr/>\n\n	<p><small>Esta não é a sua conta? ");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "logout", options) : helperMissing.call(depth0, "linkTo", "logout", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</small></p>\n\n");
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
  data.buffer.push("\n\n	<ul class=\"nav nav-pills\">\n\n		");
  hashTypes = {'tagName': "STRING",'href': "BOOLEAN"};
  options = {hash:{
    'tagName': ("li"),
    'href': (false)
  },inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "user.index", options) : helperMissing.call(depth0, "linkTo", "user.index", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n		");
  hashTypes = {'tagName': "STRING",'href': "BOOLEAN"};
  options = {hash:{
    'tagName': ("li"),
    'href': (false)
  },inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "user.cadastrar", options) : helperMissing.call(depth0, "linkTo", "user.cadastrar", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n	</ul>\n	\n	");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n			<a ");
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.href")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Já tenho uma conta</a>\n		");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n			<a ");
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.href")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Quero me registrar</a>\n		");
  return buffer;
  }

  data.buffer.push("<div class=\"row\">\n	\n	<div class=\"span4\">\n		<h1 class=\"side_title\">entre na rede UPAC</h1>\n	</div>\n\n	<div class=\"span1\">\n		&nbsp;\n	</div>\n\n	<div class=\"span7\">\n\n		<p>&nbsp;</p>\n\n");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "User.auth.loggedIn", {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
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

  data.buffer.push("<form id=\"register\" class=\"form-horizontal\">\n	<div class=\"control-group\">\n		<label class=\"control-label\" for=\"name\">Nome e sobrenome</label>\n		<div class=\"controls\">\n			");
  hashTypes = {'id': "STRING",'name': "STRING",'placeholder': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.AutoFocusTextField", {hash:{
    'id': ("name"),
    'name': ("name"),
    'placeholder': ("")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n		</div>\n	</div>\n	<div class=\"control-group\">\n		<label class=\"control-label\" for=\"username\">Nome de usuário</label>\n		<div class=\"controls\">\n			<input type=\"text\" id=\"username\" name=\"username\" placeholder=\"\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onFocus", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n			<span class=\"help-block\">sem espaços ou acentos, seu login no site</span>\n		</div>\n	</div>\n	<div class=\"control-group\">\n		<label class=\"control-label\" for=\"email\">E-mail</label>\n		<div class=\"controls\">\n			<input type=\"text\" id=\"email\" name=\"email\" placeholder=\"\" ");
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

  data.buffer.push("<form id=\"login\" class=\"form-horizontal\">\n	<div class=\"control-group\">\n		<label class=\"control-label\" for=\"username\">Usuário ou e-mail</label>\n		<div class=\"controls\">\n			");
  hashTypes = {'id': "STRING",'name': "STRING",'placeholder': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.AutoFocusTextField", {hash:{
    'id': ("username"),
    'name': ("username"),
    'placeholder': ("")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n		</div>\n	</div>\n	<div class=\"control-group\">\n		<label class=\"control-label\" for=\"password\">Senha</label>\n		<div class=\"controls\">\n			<input type=\"password\" id=\"password\" name=\"password\" placeholder=\"\" ");
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

Ember.TEMPLATES["user_photo"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n");
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("btn")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "rede.perfil", "User.model", options) : helperMissing.call(depth0, "linkTo", "rede.perfil", "User.model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("Voltar");
  }

  data.buffer.push("<form action=\"/file-upload\"\n      class=\"dropzone\"\n      id=\"avatar-dropzone\"></form>\n\n");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "landed", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  
});

Ember.TEMPLATES["view_tags"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("<div class=\"control-group\">\n	<label class=\"control-label\" for=\"select2\">Palavras-chave</label>\n	<div class=\"controls\">\n		<input type=\"text\" id=\"select2\" name=\"select2\"/>\n	</div>\n</div>");
  
});