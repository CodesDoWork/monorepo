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
        openssh.authorizedKeys.keys = [
          "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDPT2/z3cipQhptV8esRPTUdzXRpBVx+A26ouxTViJLgmYioVEsG0h1JYUBBS1Od4JPIa5PfTLlL4URHjRZqTjMIOevLOHjMSbmyqMWDPU7y/UME+1ZtcUFUrIRKqi8ghnJL0GMbXm12Nc8oTNtER24eDqnrL81ewR1Q0zph7OTD+aMrjWQAFQa2a9XUcZcFSVU8PPTEpxa+qsSCJl5Rf4IgT23e/yY1GXrY9LQpgce95HhM125lKtwkhwNZKHIPg0qe0fhEZAp+k27Czlp/ATberLrEI8txFfXkN/l02O8cMh0pk/y4CZC1yW4ujSI5HVmTrfqmB9B8PplCadDXJ7L rsa-key-20230922"
        ];
      };

      root = {
        hashedPassword = "!"
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
      PasswordAuthentication = false;
    };  
  };
}
