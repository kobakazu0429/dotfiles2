export LANG=ja_JP.UTF-8
export HOMEBREW_NO_ANALYTICS=1

function add_to_path {
  case ":$PATH:" in
    *":$1:"*) :;; # already there
    *) PATH="$1:$PATH";; # or PATH="$PATH:$1"
  esac
}

add_to_path /usr/local/sbin
add_to_path /usr/local/bin
add_to_path /usr/bin
add_to_path /bin
add_to_path /usr/sbin
add_to_path /sbin
add_to_path /opt/local/bin
add_to_path /opt/local/sbin
add_to_path /usr/local/opt/llvm/bin
add_to_path /usr/local/opt/openjdk/bin
add_to_path /usr/local/opt/openssl/bin
add_to_path /usr/local/opt/binutils/bin
add_to_path /usr/local/opt/imagemagick@7/bin
add_to_path $HOME/.nodebrew/current/bin
add_to_path $HOME/.yarn/bin
add_to_path $HOME/.local/bin
add_to_path $HOME/bin


# # export PATH="/usr/local/opt/llvm/bin:$PATH"

# rbenv
# export RBENV_ROOT=$HOME/.rbenv
# export RUBY_CONFIGURE_OPTS="--with-openssl-dir=$(brew --prefix openssl@1.1)"
# if [ -d $RBENV_ROOT ]; then
#   add_to_path $RBENV_ROOT/bin
#   eval "$(rbenv init -)"
# fi

# pyenv
# export PYENV_ROOT=$HOME/.pyenv
# if [ -d $PYENV_ROOT ]; then
#   add_to_path $PYENV_ROOT/shims
#   eval "$(pyenv init -)"
# fi

# goenv
export GOENV_ROOT=$HOME/.goenv
if [ -d $GOENV_ROOT ]; then
  add_to_path $GOENV_ROOT/bin
  eval "$(goenv init -)"
fi


export PATH
export MANPATH=/opt/local/man:$MANPATH

# ヒストリにある重複するコマンドを削除するオプション
setopt hist_ignore_all_dups
# 複数のターミナル間でヒストリの共有
# setopt share_history
# include `zmodule environment`
# 保存しないコマンド
HISTORY_IGNORE="(ls|pwd|exit)"
# メモリに保存する履歴件数
# HISTSIZE=10000
# include `zmodule environment`
# ファイルに保存する履歴件数
# SAVEHIST=1000000
# include `zmodule environment`

# 自動補完を有効にする
# コマンドの引数やパス名を途中まで入力して <Tab> を押すといい感じに補完してくれる
# 例： `cd path/to/<Tab>`, `ls -<Tab>`
# autoload -U compinit; compinit
# include `zmodule completion`


# 入力したコマンドが存在せず、かつディレクトリ名と一致するなら、ディレクトリに cd する
# 例： /usr/bin と入力すると /usr/bin ディレクトリに移動
# setopt auto_cd
# include `zmodule environment`

# cd した先のディレクトリをディレクトリスタックに追加する
# ディレクトリスタックとは今までに行ったディレクトリの履歴のこと
# `cd +<Tab>` でディレクトリの履歴が表示され、そこに移動できる
# setopt auto_pushd
# include `zmodule environment`

# <Tab> でパス名の補完候補を表示したあと、
# 続けて <Tab> を押すと候補からパス名を選択できるようになる
# 候補を選ぶには <Tab> か Ctrl-N,B,F,P
# zstyle ':completion:*:default' menu select=1
# include `zmodule completion`

# ビープ音の停止
setopt no_beep
setopt nolistbeep

# timeコマンドの出力フォーマットを変更
TIMEFMT=$'\n\n----------------------\nProgram : %J\nCPU     : %P\nuser    : %*Us\nsystem  : %*Ss\ntotal   : %*Es\n----------------------\n'


# Set editor default keymap to emacs (`-e`) or vi (`-v`)
# bindkey -v

# 単語単位の移動時に、パス区切り文字で停止する
WORDCHARS=${WORDCHARS//[\/]}

# Zsh が入力を解釈するときの奇抜さを修正
# URL を貼り付けたときに手動でエスケープする必要がないようにしてくれる
# Append `../` to your input for each `.` you type after an initial `..`
zstyle ':zim:input' double-dot-expand yes

# zsh-autosuggestions
# 高速かつ控えめにコマンドをサジェスト
# 1に設定しておくと性能向上が期待できるが、.zimrc の末尾で zsh-autosuggestions モジュールを読み込むようにする必要がある
ZSH_AUTOSUGGEST_MANUAL_REBIND=1

# zsh-syntax-highlighting
# コマンドをシンタックスハイライト
# See https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/docs/highlighters.md
# main は基本的なハイライト
# brackets は括弧の対をハイライト
ZSH_HIGHLIGHT_HIGHLIGHTERS=(main brackets)

# ------------------
# Initialize modules
# ------------------

# Download zimfw plugin manager if missing.
if [[ ! -e ${ZIM_HOME}/zimfw.zsh ]]; then
  if (( ${+commands[curl]} )); then
    curl -fsSL --create-dirs -o ${ZIM_HOME}/zimfw.zsh \
        https://github.com/zimfw/zimfw/releases/latest/download/zimfw.zsh
  else
    mkdir -p ${ZIM_HOME} && wget -nv -O ${ZIM_HOME}/zimfw.zsh \
        https://github.com/zimfw/zimfw/releases/latest/download/zimfw.zsh
  fi
fi
# Install missing modules, and update ${ZIM_HOME}/init.zsh if missing or outdated.
if [[ ! ${ZIM_HOME}/init.zsh -nt ${ZIM_HOME}/.zimrc ]]; then
  source ${ZIM_HOME}/zimfw.zsh init -q
fi
# Initialize modules.
source ${ZIM_HOME}/init.zsh

# autoload -U promptinit; promptinit
# prompt pure

# 入力中のテキストからヒストリ検索
zmodload -F zsh/terminfo +p:terminfo
bindkey $terminfo[kcuu1] history-substring-search-up
bindkey $terminfo[kcud1] history-substring-search-down
unset key

function fzf-select-history() {
    BUFFER=$(history -n -r 1 | fzf --query "$LBUFFER")
    CURSOR=$#BUFFER
    zle reset-prompt
}
zle -N fzf-select-history
bindkey '^r' fzf-select-history


# eval "$(op completion zsh)"; compdef _op op

alias la='l'
# サイズ順
alias lS='ll -S'
# 更新日時順
alias lT='ll -t'

alias tree='tree -NC'

# git
alias g="git"
alias ga="git add"
alias gb="git branch -a"
alias gc="git commit -m"
alias gd="git diff"
alias gf="git fetch"
alias gp="git push"
alias gpl="git pull"
alias gs="git status"
alias gss="git status --short"
alias gch="git checkout"

function asd() {
  local root=$(ghq root)
  local repo=$(find $root -d 3 -maxdepth 3 | sort | grep -v DS_Store | sed -e "s#$root/##g" | peco)
  if [ -n "$repo" ]; then
    cd "$root/$repo"
  fi
}

alias sad=asd

# Python
alias p="python3"


# Ruby
alias r="rails"
alias b="bundle"
alias be="bundle exec"
alias ber="bundle exec rails"


# diff
function cdiff () {
  if [[ "$1" =~ (.*\.json) ]] && [[ "$2" =~ (.*\.json) ]]; then
    colordiff <(jq --sort-keys . $1) <(jq --sort-keys . $2) -u | less -R
  else
    colordiff $1 $2 -u | less -R
  fi
}


# speedtest
## 48463=IPA CyberLab 400G
alias speedtest_IPA_CyberLab_400G="speedtest -s 48463"


# nkfc
## cat file | to_nkfc > file2
alias to_nkfc="ruby -nle 'puts $_.unicode_normalize(:nfkc)'"

function nkfc_cd() {
  cd "$(ls | ruby -nle 'puts [$_, ":", $_.unicode_normalize(:nfkc)].join' | fzf --delimiter ":" --with-nth 2 | cut -d ":" -f 1)"
}
export FZF_DEFAULT_OPTS="--extended --cycle --height=40% --layout=reverse"

# youtube-dl
# option:mp4 quality=max
function youtubemp4 () {
  youtube-dl -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4' --merge-output-format mp4 $1
}

# option:mp4 quality=max parallelize aria2c
function youtubemp4para () {
  #  -c, --continue [true|false]            https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-c
  #  -x, --max-connection-per-server=<NUM>  https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-x
  #  -j, --max-concurrent-downloads=<N>     https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-j
  #  -k, --min-split-size=<SIZE>            https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-k
  youtube-dl -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4' --merge-output-format mp4 --external-downloader aria2c --external-downloader-args '-c -x 10 -j 10' $1
}

# option:mp3 quality=max
function youtubemp3 () {
  youtube-dl $1 -x -f "bestaudio" --audio-format mp3 --audio-quality 0
}


# JS
function show-npm-scripts() {
  if [ -e "package.json" ]; then
    cat package.json | jq -r ".scripts | to_entries[] | \"\(.key)\t\(.value)\"" | column -t -s "`printf '\t'`"
  elif [ -e "deno.json" ]; then
    cat deno.json | jq -r ".scripts | to_entries[] | \"\(.key)\t\(.value)\"" | column -t -s "`printf '\t'`"
  elif [ -e "deno.jsonc" ]; then
    cat deno.jsonc | npx strip-json-comments-cli | jq -r ".tasks | to_entries[] | \"\(.key)\t\(.value)\"" | column -t -s "`printf '\t'`"
  fi
}

function y() {
  scripts=`show-npm-scripts | peco | cut -f 1 -d " "`
  if [ -n "$scripts" ]; then
    if [ -e "package.json" ] && [ -e "package-lock.json" ]; then
      npm run $scripts
    elif [ -e "package.json" ] && [ -e "yarn.lock" ]; then
      yarn run $scripts
    elif [ -e "deno.json" ] || [ -e "deno.jsonc" ]; then
      deno task $scripts
    fi
  fi
}


# rar
function rarr() {
  rar a "$1.rar" "$1" -x"**/.*" -qo+
}


# find
function not-image-find() {
  find -E . -type f ! -iregex ".*\.(png|jpg|jpeg)"
}


# perf
if (which zprof > /dev/null 2>&1) ;then
  zprof
fi
