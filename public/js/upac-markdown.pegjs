Doc = 
	Block*
// Marcador do local no texto
LocMarker = &. { return _chunk.pos; }

Block =
	BlankLine*
	( BlockQuote
	/ Verbatim
	/ Note
	/ Reference
	/ HorizontalRule
	/ Heading
	/ OrderedList
	/ BulletList
	/ StyleBlock
	/ Para
	/ Plain )

Para =
	NonindentSpace a:Inlines BlankLine+
	{ return {Para: a}; }

Plain =
	a:Inlines
	{ return {Plain: a}; }

AtxInline =
	!Newline !(Sp '#'* Sp Newline) Inline

AtxStart =
	< ( "######" / "#####" / "####" / "###" / "##" / "#" ) >

AtxHeading = s:AtxStart Sp a:StartList ( AtxInline )+ (Sp '#'* Sp)? Newline

SetextHeading = SetextHeading1 | SetextHeading2

SetextBottom1 = "="+ Newline

SetextBottom2 = "-"+ Newline

SetextHeading1 =
	&(RawLine SetextBottom1)
	i:( !Endline Inline)+ Sp Newline
	SetextBottom1
	{ return {Heading1: i}; }

SetextHeading2 =
	&(RawLine SetextBottom1)
	i:( !Endline Inline)+ Sp Newline
	SetextBottom2
	{ return {Heading2: i}; }

Heading = SetextHeading | AtxHeading

BlockQuote =
	a:BlockQuoteRaw
	{
		return {"blockquote":a};
	}

BlockQuoteRaw =
	a:(
		( '>' ' '? Line )
		( !'>' !BlankLine Line )*
		( BlankLine { return '\n'; } )*
	)+
	{
		return {Raw: a.join('') };
	}

NonblankIndentedLine =
	!BlankLine IndentedLine

VerbatimChunk =
	( BlankLine { return '\n';} )*
	( NonblankIndentedLine )+
	
Verbatim =
	c:( VerbatimChunk )+
	{ return {Verbatim: c.join('')}; }


Eof = !.
Spacechar = ' ' / '\t'
Nonspacechar = !Spacechar !Newline .
Newline = '\n' / '\r' '\n'?
Sp = Spacechar*
Spn1 = Sp (Newline Sp)?
SpecialChar = 
	  "*" / '_' / '`' / '&' 
	/ '[' / ']' / '(' / ')'
	/ '<' / '!' / '#'
	/ '\\' / '\'' / '"' // / ExtendedSpecialChar


NonindentSpace = "   " / "  " / " " / ""
Indent = "\t" / "    "
Indents = ind:Indent+ { return ind.length; }
AnyIndent = ind:Indent* { return ind.length; }
IndentedLine = Indent txt:Line { return txt; }
OptionallyIndentedLine = Indent? txt:Line { return txt; }


Line = RawLine { return _chunk.match; }

RawLine = 
	( 
		(!'\r' !'\n' .)* Newline 
		/.+ Eof 
	)

SkipBlock =
	( !BlankLine RawLine )+ BlankLine*
	/ BlankLine+
