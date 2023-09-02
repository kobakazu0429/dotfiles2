# dotfiles2

## Install

### Minimum

```shell
bash -c "$(curl -fsSL https://dot.kaz.dev/install)"
```

or

```shell
git clone git@github.com:kobakazu0429/dotfiles2.git
cd dotfiles2

ghq get git@github.com:kobakazu0429/dotfiles2.git
cd ~/ghq/github.com/kobakazu0429/dotfiles2

deno task start:minimum
```

### Personal

```
deno task start:personal
```

## Update / Dump

```shell
deno task update
```

## Scaffold

```shell
deno task scaffold
# after, type module name
```
