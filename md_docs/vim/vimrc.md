# * 나만의 커스터마이징 Vim
## 적용방법
1. 로컬 `~/.vimrc`에 최하단 코드를 [복붙](https://raw.githubusercontent.com/hidekuma/dotfiles/master/.vimrc.new)한다. `.vimrc`가 없으면 만들어준다.
2. 변경사항을 반영하기 위해, `.vimrc`를 재로딩해준다.
```bash
  $ source ~/.vimrc
```
3. `Vundle`을 설치한다.
```bash
  $ git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
```
4. `.vimrc`를 `vi`로 연다.
```bash
  $ vi ~/.vimrc
```
5. <kbd>ctrl</kbd> + <kbd>:</kbd> 하면, 화면 가장 하단에 커맨드라인을 칠 수가 있다.
6. `VundleInstall`이라고 쳐준다.
7. 완료! 기능은 사용하면서, 각 플러그인의 리포지터리와 컨픽파일 내부에 커맨드를 살펴보면 좋다.

## 컨픽파일(~/.vimrc)
```vim
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" HIDEKUMA's vimrc
" customzing for work
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Shared plugin setup for Vundle
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

filetype off                                       " required by Vundle (re-enabled below)
if isdirectory(expand("~/.vim/bundle/Vundle.vim/"))
  set rtp+=~/.vim/bundle/Vundle.vim
  call vundle#begin()

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Vundle plugins
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

  " Basic
  Plugin 'VundleVim/Vundle.vim'                       " let Vundle manage Vundle, required

  " Files & Search
  Plugin 'scrooloose/nerdtree'
  Plugin 'ctrlpvim/ctrlp.vim'
  Plugin 'majutsushi/tagbar'

  " Styling
  Plugin 'vim-airline/vim-airline'          " nice statusline at the bottom of each window 
  " Plugin 'vim-airline/vim-airline-themes'
  Plugin 'airblade/vim-gitgutter'

  " Movement
  Plugin 'Lokaltog/vim-easymotion'
  Plugin 'vim-scripts/matchit.zip'

  " Theme
  Plugin 'nanotech/jellybeans.vim'
  Plugin 'chriskempson/vim-tomorrow-theme'
  Plugin 'nightsense/snow'

  " Editing utilities
  Plugin 'tpope/vim-surround'
  Plugin 'tpope/vim-repeat'
  Plugin 'terryma/vim-multiple-cursors'
  Plugin 'mattn/emmet-vim'

  " Syntax / Indenting
  Plugin 'scrooloose/syntastic'
  Plugin 'chr4/nginx.vim'
  Plugin 'plasticboy/vim-markdown'
  Plugin 'groenewege/vim-less'
  Plugin 'pangloss/vim-javascript'
  Plugin 'nathanaelkane/vim-indent-guides'

  " Lint
  Plugin 'w0rp/ale'

  " PHP / Yii
  Plugin 'mikehaertl/pdv-standalone'
  Plugin 'StanAngeloff/php.vim'
  Plugin '2072/PHP-Indenting-for-VIm'
  Plugin 'shawncplus/phpcomplete.vim'

  " Python
  Plugin 'rkulla/pydiction'

  " Git
  Plugin 'tpope/vim-fugitive'

  " Auto complete
  "Plugin 'Valloric/YouCompleteMe'

  " End of Vundle plugins
  call vundle#end()            " required
endif

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" General
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

set nocompatible                " be iMproved, required
set history=50                  " How many lines of history to remember
set confirm                     " Ask for confirmation in some situations (:q)
set ignorecase smartcase        " case insensitive search, except when mixing cases
set modeline                    " we allow modelines in textfiles to set vim settings
set hidden                      " allows to change buffer without saving
set mouse=a                     " enable mouse in all modes
set noerrorbells                " don't make noise
set novisualbell                " don't blink
set t_Co=256                    " Enable 256 color mode
set exrc                        " Scan working dir for .vimrc
set autoindent smartindent
set smarttab
set showcmd
set showmatch
set title

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Text Formatting/Tab settings
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

set formatoptions=tcrqn         " autowrap and comments (see :h 'fo-table)
set autoindent                  " keep indent on next line and make BS work with indenting
set wrap                        " wrap lines that exceed screen
set smarttab                    " Make Tab work fine with spaces
set showmatch                   " show matching brackets
set matchtime=5                 " tenths of a second to blink matching brackets
set hlsearch                    " highlight search phrase matches (reset with :noh)
set incsearch                   " do highlight as you type you search phrase
set list                        " show tabs, trailings spaces, ...
set listchars=tab:\|\ ,trail:.,extends:>,precedes:<


""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" UI
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

set wildmenu                    " Show suggestions on TAB for some commands
set ruler                       " Always show current positions along the bottom
set cmdheight=1                 " the command bar is 1 high
set number                      " turn on line numbers
set lazyredraw                  " do not redraw while running macros (much faster)
set backspace=indent,eol,start  " make backspace work normal
set whichwrap+=<,>,h,l          " make cursor keys and h,l wrap over line endings
set report=0                    " always report how many lines where changed
set fillchars=vert:\ ,stl:\ ,stlnc:\    " make the splitters between windows be blank
set laststatus=2                " always show the status line
set scrolloff=10                " Start scrolling this number of lines from top/bottom
set hlsearch incsearch
set cursorline
set cursorcolumn
"set clipboard=unnamed " use OS clipboard -- brew install reattach-to-user-namespace
 
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" File settings
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set encoding=utf-8              " Let Vim use utf-8 internally
set fileencoding=utf-8          " Default for new files
set termencoding=utf-8          " Terminal encoding
set fileformats=unix,dos,mac    " support all three, in this order
set fileformat=unix             " default file format

filetype plugin indent on    " required

" Enable syntax highlighting (based on detected filetype)
syntax on

" When editing a file, always jump to the last cursor position.
autocmd BufReadPost * if line("'\"") && line("'\"") <= line("$") | exe "normal `\"" | endif

" Set some file types by extension
autocmd BufNewFile,BufRead *.xt,*.xd setf xml
autocmd BufNewFile,BufRead *.tpl,*.page setf html

" Global indent settings
set tabstop=2 softtabstop=2 shiftwidth=2 expandtab

" Indenting per file type
"  - tabstop:       number of spaces inserted for each tab
"  - softtabstop:   make spaces feel like real tabs (e.g. for backspace)
"  - shiftwidth:    number of spaces for indentation (e.g. > and < )
"  - expandtab:     use spaces instaed of Tab. <c-v><TAB> gives real Tab
"  - autoindent:    keep indenting of previous line
autocmd FileType php setlocal tabstop=4 softtabstop=4 shiftwidth=4 expandtab autoindent
autocmd FileType html setlocal tabstop=4 softtabstop=4 shiftwidth=4 expandtab autoindent
autocmd FileType javascript setlocal tabstop=4 softtabstop=4 shiftwidth=4 expandtab

" PHP settings
" Let the surround plugin use `-` for <?php ?>
autocmd FileType php let b:surround_45 = "<?php \r ?>"
" Let the surround plugin use `=` for <?= ?>
autocmd FileType php let b:surround_61 = "<?= \r ?>"
" Fix javascript word boundaries (erratically activated for PHP files): exclude $
autocmd FileType php setlocal iskeyword-=$

" Function for autodetecting tab settings
function Kees_settabs()
    if len(filter(getbufline(winbufnr(0), 1, "$"), 'v:val =~ "^\\t"')) > len(filter(getbufline(winbufnr(0), 1, "$"), 'v:val =~ "^ "'))
        set noet
    else
        set et
    endif
endfunction
autocmd BufReadPost * call Kees_settabs()

" No folding for markdown files
let g:vim_markdown_folding_disabled=1

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Plugin Settings
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

" color
color jellybeans
color Tomorrow-Night
"color snow 

" pydiction
let g:pydiction_location = '~/.vim/bundle/pydiction/complete-dict'
let g:pydiction_menu_height = 10

" nerdtree
nmap ,nt :NERDTree<CR>

" vim-airline
"let g:airline_theme='sol'
"let g:airline_theme_patch_func = 'AirlineThemePatch'
"function! AirlineThemePatch(palette)
"  if g:airline_theme == 'sol'
"    " Current tab should always have hightes optical priority, so don't use
"    " redish colors for modified tabs
"
"    " Color for current tab if modified (darkened blue)
"    let a:palette.tabline.airline_tabmod[3] = 30
"
"    " Color for modified (grey
"    let a:palette.normal_modified.airline_c[3] = 244
"  endif
"endfunction
let g:airline#extensions#tabline#enabled = 1        " Enhanced top tabline
let g:airline#extensions#tabline#formatter = 'unique_tail'
let g:airline#extensions#ale#enabled = 1

" vim-multiple-cursor
let g:multi_cursor_use_default_mapping=0
let g:multi_cursor_next_key='<C-n>'
let g:multi_cursor_prev_key='<C-p>'
let g:multi_cursor_skip_key='<C-x>'
let g:multi_cursor_quit_key='<Esc>'

" vim-indent-guides
let g:indent_guides_enable_on_vim_startup = 1
let g:indent_guides_auto_colors = 0
let g:indent_guides_exclude_filetypes = ['help', 'nerdtree']
"hi IndentGuidesOdd ctermbg=White
"hi IndentGuidesEven ctermbg=LightCyan
let g:indent_guides_guide_size = 1 
let g:indent_guides_start_level = 2

" highlight line number
hi LineNr ctermfg=white cterm=bold

" highlight cursor color
hi CursorColumn ctermbg=NONE
hi CursorLine ctermbg=Black cterm=bold

" tagbar
nmap <F8> :TagbarToggle<CR>

" tpope/vim-surround
let g:surround_indent = 0           " Make indenting on block selection + S work

" StanAngeloff/php.vim
let php_sql_query = 1               " Highlight SQL inside strings
let php_parent_error_close = 1      " Highlight parent error ] or )
let php_parent_error_open = 1       " Skip php end tag if there's an unclosed ( or [
let php_folding = 0                 " No folding
let php_sync_method = 0             " Sync from start

" 2072/PHP-Indenting-for-VIm
let g:PHP_outdentphpescape = 0      " Indent PHP tags as the surrounding non-PHP code
let g:PHP_noArrowMatching = 1       " Don't align arrows of chained method calls
let g:PHP_vintage_case_default_indent = 1   " Indent case: and default: in switch()

" vim-scripts/matchit
let b:match_ignorecase = 1

" PDV (PHP Documentor)
nnoremap <C-K> :call PhpDocSingle()<CR>
vnoremap <C-K> :call PhpDocRange()<CR>

"ctrlp
set wildignore+=*/tmp/*,*.so,*.swp,*.zip     " MacOSX/Linux
set wildignore+=*\\tmp\\*,*.swp,*.zip,*.exe  " Windows
let g:ctrlp_user_command = ['.git/', 'git --git-dir=%s/.git ls-files -oc --exclude-standard'] 
let g:ctrlp_working_path_mode = 'ra'
let g:ctrlp_match_window = 'min:0,max:30'

" php auto complete
let g:phpcomplete_mappings = {
   \ 'jump_to_def': '<C-]>',
   \ 'jump_to_def_split': '<C-W><C-]>',
   \ 'jump_to_def_vsplit': '<C-W><C-\>',
   \ 'jump_to_def_tabnew': '<C-W><C-[>',
   \}

" emmet
  let g:user_emmet_settings = {
  \  'php' : {
  \    'extends' : 'html',
  \    'filters' : 'c',
  \  },
  \  'xml' : {
  \    'extends' : 'html',
  \  },
  \  'haml' : {
  \    'extends' : 'html',
  \  },
  \  'tpl' : {
  \    'extends' : 'html',
  \  },
  \}

  " ALE
  let g:ale_fixers = {
  \   'php': ['php_cs_fixer'],
  \   'python': ['autopep8', 'yapf']
  \}
  let g:ale_completion_enabled = 1

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" END
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
```
