export const minimum = [
  `tap "homebrew/bundle"`,
  `tap "homebrew/cask"`,
  `tap "homebrew/core"`,
  `tap "homebrew/services"`,

  `brew "bat"`, // Clone of cat(1) with syntax highlighting and Git integration
  `brew "colordiff"`, // Color-highlighted diff(1) output
  `brew "deno"`, // Secure runtime for JavaScript and TypeScript
  `brew "ghq"`, // Remote repository management made easy
  `brew "git"`, // Distributed revision control system
  `brew "gnu-sed"`, // GNU implementation of the famous stream editor
  `brew "inetutils"`, // GNU utilities for networking
  `brew "iperf3"`, // Update of iperf: measures TCP, UDP, and SCTP bandwidth
  `brew "jq"`, // Lightweight and flexible command-line JSON processor
  `brew "mas"`, // Mac App Store command-line interface
  `brew "nkf"`, // Network Kanji code conversion Filter (NKF)
  `brew "nmap"`, // Port scanning utility for large networks
  `brew "nodebrew"`, // Node.js version manager
  `brew "peco"`, // Simplistic interactive filtering tool
  `brew "rsync"`, // Utility that provides fast incremental file transfer
  `brew "tree"`, // Display directories as trees (with optional color/HTML output)
  `brew "wget"`, // Internet file retriever
  `brew "yarn"`, // JavaScript package manager

  `cask "1password"`, // Password manager that keeps all passwords secure behind one password
  `cask "adobe-acrobat-reader"`, // View, print, and comment on PDF documents
  `cask "google-chrome"`, // Web browser
  `cask "iterm2"`, // Terminal emulator as alternative to Apple's Terminal app
  `cask "karabiner-elements"`, // Keyboard customizer
  `cask "raycast"`, // Control your tools with a few keystrokes
  `cask "slack"`, // Team communication and collaboration software
  `cask "visual-studio-code"`, // Open-source code editor
  `cask "vlc"`, // Multimedia player
];

export const personal = [
  ...minimum,

  `mas "LINE", id: 539883307`,
  `mas "LINE WORKS", id: 6447544433`,
  `mas "Tailscale", id: 1475387142`,

  `tap "carlocab/personal"`,
  `brew "carlocab/personal/unrar"`, // Extract, view, and test RAR archives,

  `tap "teamookla/speedtest"`,
  `brew "speedtest"`,

  `brew "youtube-dl"`, // Download YouTube videos from the command-line
  `brew "ffmpeg"`, // Play, record, convert, and stream audio and video

  `cask "appcleaner"`, // Application uninstaller
  `cask "thunderbird"`, // Customizable email client
];
