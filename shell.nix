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
    pkgs.texlive.combined.scheme-full
    ltex-ls-plus
    ffmpeg_7-headless
    chromaprint
  ];
}
