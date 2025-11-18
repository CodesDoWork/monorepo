{ pkgs ? import <nixpkgs> {
  config.allowUnfree = true;
}}:
pkgs.mkShell {
  packages = with pkgs; [
    nodejs_22
    bun
    python313
    python313Packages.pip
    python313Packages.uv
  ];
}
