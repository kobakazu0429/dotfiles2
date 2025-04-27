export GHQ_ROOT=$HOME/ghq
export DOTFILES=$GHQ_ROOT/github.com/kobakazu0429/dotfiles2
export MY_SCRIPTS=$DOTFILES/modules/scripts

export XDG_CONFIG_HOME=$HOME/.config
export XDG_CACHE_HOME=$HOME/.cache
export XDG_DATA_HOME=$HOME/.local/share

export ZDOTDIR=$XDG_CONFIG_HOME/zsh
export ZIM_HOME=$XDG_CONFIG_HOME/zim
export ZIM_CONFIG_FILE=$ZIM_HOME/.zimrc

if [[ -d "$DOTFILES/modules/zsh/zshenv.d" ]]; then
  for conf in "$DOTFILES/modules/zsh/zshenv.d/".zshenv_*; do
    [ -e "$conf" ] || break
    source "${conf}"
  done
fi

# zmodload zsh/zprof && zprof
