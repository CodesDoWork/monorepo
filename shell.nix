{ pkgs ? import <nixpkgs> {
  config.allowUnfree = true;
}}:

pkgs.mkShell {
  packages = with pkgs; [
    nodejs_25
    bun
    python313
    python313Packages.pip
    python313Packages.uv
    texlive.combined.scheme-full # LaTeX
    ltex-ls-plus # LaTeX
    ffmpeg_7-headless # audio tool (just-music-store, just-music-downloader)
    r128gain # music normalization (just-music-store)
    chromium # nx-plugins-lighthouse
  ];
}
