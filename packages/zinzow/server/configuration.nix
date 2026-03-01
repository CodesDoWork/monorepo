{ config, lib, pkgs, ... }:

{
  system.stateVersion = "25.11";
  imports = [
    ./hardware-configuration.nix
  ];

  # boot
  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;
  boot.tmp.cleanOnBoot = true;
  boot.kernel.sysctl = {
    "vm.map_map_count" = 262144;
    "vm.overcommit_memory" = 1;
  };

  # system settings
  time.timeZone = "Europe/Berlin";
  console.keyMap = "de";

  networking = {
    hostName = "website-vm";
    networkmanager.enable = true;
  };

  users = {
    groups.dev = {};
    users = {
      user = {
        isNormalUser = true;
        extraGroups = [ "dev" "docker" ];
      };
    };
  };

  security = {
    sudo = {
      enable = false;
    };
  };

  system.autoUpgrade = {
    enable = true;
    allowReboot = true;
    dates = "03:00";
  };
  nix = {
    gc = {
      automatic = true;
      dates = "4:00";
      options = "--delete-older-than 14d";
    };
    settings.auto-optimise-store = true;
  };

  # permissions
  systemd.tmpfiles.rules = [
    "d /srv 0770 user dev"
  ];

  virtualisation.docker = {
    enable = true;
  };

  services.openssh = {
    enable = true;
    ports = [ 18316 ];
    settings = {
      PermitRootLogin = "no";
      PasswordAuthentication = true;
    };  
  };
}
