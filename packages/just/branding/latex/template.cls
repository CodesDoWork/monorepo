\NeedsTeXFormat{LaTeX2e}
\RequirePackage{currfile}
\ProvidesClass{template}[Software Documentation Class]

% ----------------------------
% Base Class
% ----------------------------
\LoadClass[11pt,a4paper]{article}

% ----------------------------
% Required Packages
% ----------------------------
\RequirePackage[ngerman]{babel}
\RequirePackage{geometry}
\RequirePackage{graphicx}
\RequirePackage{xcolor}
\RequirePackage{fancyhdr}
\RequirePackage{titlesec}
\RequirePackage{hyperref}
\RequirePackage{listings}
\RequirePackage{refcount}
\RequirePackage{lastpage}
\RequirePackage{setspace}
\RequirePackage{fontspec}
\RequirePackage{enumitem}
\RequirePackage{minted}

\edef\CurrentPath{\CurrentFilePath}%

% ----------------------------
% Page Layout
% ----------------------------
\geometry{
  left=25mm,
  right=25mm,
  top=30mm,
  bottom=30mm
}

\onehalfspacing

% ----------------------------
% Branding Variables
% ----------------------------
\newcommand{\CompanyName}{Justin Konratt}
\newcommand{\CompanyLogo}{\CurrentPath/../assets/img/logo.png}
\newcommand{\DocVersion}{v1.0}

% ----------------------------
% Brand Colors
% ----------------------------
\definecolor{PrimaryColor}{HTML}{00A6F4}
\definecolor{SecondaryColor}{HTML}{00BBA7}
\definecolor{AccentColor}{HTML}{FE9A00}

% ----------------------------
% Fonts
% ----------------------------
\setmainfont{Inter}[
  Path=\CurrentPath/../assets/font/inter/,
  Ligatures=TeX,
  UprightFont = Inter_18pt-Regular.ttf,
  BoldFont = Inter_18pt-Bold.ttf,
  ItalicFont = Inter_18pt-Italic.ttf,
  BoldItalicFont = Inter_18pt-BoldItalic.ttf,
]

\setsansfont{Inter}[
  Ligatures=TeX
]

\newfontfamily\HeadingFont{JetbrainsMono}[
  Path=\CurrentPath/../assets/font/jetbrains-mono/,
  UprightFont = JetbrainsMono-Regular.ttf,
  BoldFont = JetbrainsMono-Bold.ttf,
  ItalicFont = JetbrainsMono-Italic.ttf,
  BoldItalicFont = JetbrainsMono-BoldItalic.ttf,
]

% ----------------------------
% Hyperlinks
% ----------------------------
\hypersetup{
  colorlinks=true,
  linkcolor=SecondaryColor,
  urlcolor=AccentColor,
  citecolor=SecondaryColor,
}

% ----------------------------
% Header & Footer
% ----------------------------
\renewcommand{\sectionmark}[1]{\markboth{#1}{}}
\pagestyle{fancy}
\fancyhf{}

\fancyhead[L]{
  \includegraphics[height=8pt]{\CompanyLogo}\hspace{8pt}
  \CompanyName
}

\fancyhead[R]{
  \leftmark
}

\fancyfoot[L]{
  Version \DocVersion
}

\fancyfoot[C]{
  \thepage\ von \getpagerefnumber{LastPage}
}

\fancyfoot[R]{
  \today
}

\renewcommand{\headrulewidth}{0.4pt}
\renewcommand{\footrulewidth}{0.4pt}

% ----------------------------
% Section Styling
% ----------------------------
\titleformat{\section}
  {\Large\HeadingFont\color{PrimaryColor}}
  {\thesection}{1em}{}

\titleformat{\subsection}
  {\large\HeadingFont\color{SecondaryColor}}
  {\thesubsection}{1em}{}

\titleformat{\subsubsection}
  {\HeadingFont\color{AccentColor}}
  {\thesubsubsection}{1em}{}

% ----------------------------
% Code Listings (Software Docs)
% ----------------------------
\lstdefinestyle{companycode}{
  backgroundcolor=\color{black!3},
  basicstyle=\ttfamily\small,
  keywordstyle=\color{SecondaryColor}\bfseries,
  commentstyle=\color{AccentColor},
  stringstyle=\color{PrimaryColor},
  numbers=left,
  numberstyle=\tiny\color{black!50},
  frame=single,
  breaklines=true,
  tabsize=2
}

\lstset{style=companycode}

% ----------------------------
% Title Page
% ----------------------------
\renewcommand{\maketitle}{
  \begin{titlepage}
    \centering
    \vspace*{3cm}

    \includegraphics[width=0.35\textwidth]{\CompanyLogo}\par
    \vspace{1.5cm}

    {\Huge\HeadingFont\color{PrimaryColor}\@title\par}
    \vspace{0.5cm}

    {\Large\color{SecondaryColor}\@author\par}
    \vspace{1cm}

    {\large Version \DocVersion\par}
    \vfill

    {\large \CompanyName\par}
    {\large \today\par}
  \end{titlepage}
}

\setlist[enumerate]{noitemsep}
\setlist[itemize]{noitemsep}
