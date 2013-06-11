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

Heading = SetextHeading / AtxHeading

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

Inlines =
	l:(!Endline Inline / Endline &Inline )+ Endline?
	{ return {List: l}}

Inline =
	Str
	/ Endline
	/ UlOrStartLine
	/ Space
	/ Strong
	/ Emph
	/ Strike
	/ Image
	/ Link
	/ NoteReference
	/ InlineNote
	/ Code
	/ Entity
	/ EscapedChar
	/ Smart
	/ Symbol

Space = s:Spacechar+ { return {Space: s}; }
Str = s:<NormalChar+> c:(StrChunk)*
	{if (!s) return c; return {List: s.append(c);}}
StrChunk = < c:(NormalChar | '_'+ &Alphanumeric)+ > { return c.join('')} / AposChunk


Ticks1 = '`' !'`'
Ticks2 = '``' !'``'
Ticks3 = '```' !'```'
Ticks4 = '````' !'````'
Ticks5 = '`````' !'`````'

Code = 
	c:(
		  Ticks1 Sp < ((!'`' Nonspacechar)+ / !Ticks1 '`'+ / !( Sp Ticks1) (Spacechar | Newline !BlankLine))+ > Sp Ticks1
		/ Ticks2 Sp < ((!'`' Nonspacechar)+ / !Ticks2 '`'+ / !( Sp Ticks2) (Spacechar | Newline !BlankLine))+ > Sp Ticks2
		/ Ticks3 Sp < ((!'`' Nonspacechar)+ / !Ticks3 '`'+ / !( Sp Ticks3) (Spacechar | Newline !BlankLine))+ > Sp Ticks3
		/ Ticks4 Sp < ((!'`' Nonspacechar)+ / !Ticks4 '`'+ / !( Sp Ticks4) (Spacechar | Newline !BlankLine))+ > Sp Ticks4
		/ Ticks5 Sp < ((!'`' Nonspacechar)+ / !Ticks5 '`'+ / !( Sp Ticks5) (Spacechar | Newline !BlankLine))+ > Sp Ticks5
	) { return {Code:c}; }

BlankLine = Sp Newline
//Quoted = '"' (!'"' .)* '"' | '\'' (!'\'' .)* '\''


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
NormalChar = !(SpecialChar|Spacechar|Newline) .
AlphanumericAscii = [0-9A-Za-z]
Alphanumeric =
	AlphanumericAscii
	/ '\200' / '\201' / '\202' / '\203' 
	/ '\204' / '\205' / '\206' / '\207'
	/ '\210' / '\211' / '\212' / '\213'
	/ '\214' / '\215' / '\216' / '\217'
	/ '\220' / '\221' / '\222' / '\223'
	/ '\224' / '\225' / '\226' / '\227'
	/ '\230' / '\231' / '\232' / '\233'
	/ '\234' / '\235' / '\236' / '\237'
	/ '\240' / '\241' / '\242' / '\243'
	/ '\244' / '\245' / '\246' / '\247'
	/ '\250' / '\251' / '\252' / '\253'
	/ '\254' / '\255' / '\256' / '\257'
	/ '\260' / '\261' / '\262' / '\263'
	/ '\264' / '\265' / '\266' / '\267'
	/ '\270' / '\271' / '\272' / '\273'
	/ '\274' / '\275' / '\276' / '\277'
	/ '\300' / '\301' / '\302' / '\303'
	/ '\304' / '\305' / '\306' / '\307'
	/ '\310' / '\311' / '\312' / '\313'
	/ '\314' / '\315' / '\316' / '\317'
	/ '\320' / '\321' / '\322' / '\323'
	/ '\324' / '\325' / '\326' / '\327'
	/ '\330' / '\331' / '\332' / '\333'
	/ '\334' / '\335' / '\336' / '\337'
	/ '\340' / '\341' / '\342' / '\343'
	/ '\344' / '\345' / '\346' / '\347'
	/ '\350' / '\351' / '\352' / '\353'
	/ '\354' / '\355' / '\356' / '\357'
	/ '\360' / '\361' / '\362' / '\363'
	/ '\364' / '\365' / '\366' / '\367'
	/ '\370' / '\371' / '\372' / '\373'
	/ '\374' / '\375' / '\376' / '\377'
Digit = [0-9]
BOM = "\357\273\277"

HexEntity = < '&' '#' [Xx] [0-9a-fA-F]+ ';' >
DecEntity = < '&' '#' [0-9]+ ';' >
HexEntity = < '&' [0-9a-zA-Z]+ ';' >


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
