{ config, lib, pkgs, ... }:

{
  imports = [
    ./hardware-configuration.nix
  ];

  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;
  boot.tmp.cleanOnBoot = true;
  boot.kernel.sysctl = {
    "vm.map_map_count" = 262144;
    "vm.overcommit_memory" = 1;
  };

  time.timeZone = "Europe/Berlin";
  console.keyMap = "de";

  users.users.jkonratt = {
    isNormalUser = true;
    extraGroups = [ "wheel" "docker" ];
    openssh.authorizedKeys.keys = [
      "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDPT2/z3cipQhptV8esRPTUdzXRpBVx+A26ouxTViJLgmYioVEsG0h1JYUBBS1Od4JPIa5PfTLlL4URHjRZqTjMIOevLOHjMSbmyqMWDPU7y/UME+1ZtcUFUrIRKqi8ghnJL0GMbXm12Nc8oTNtER24eDqnrL81ewR1Q0zph7OTD+aMrjWQAFQa2a9XUcZcFSVU8PPTEpxa+qsSCJl5Rf4IgT23e/yY1GXrY9LQpgce95HhM125lKtwkhwNZKHIPg0qe0fhEZAp+k27Czlp/ATberLrEI8txFfXkN/l02O8cMh0pk/y4CZC1yW4ujSI5HVmTrfqmB9B8PplCadDXJ7L rsa-key-20230922"
    ];
  };

  environment.systemPackages = with pkgs; [
    lm_sensors
    docker
  ];

  virtualisation.docker = {
    enable = true;
    rootless = {
      enable = true;
      setSocketVariable = true;
    };
  };

  services.openssh = {
    enable = true;
    settings = {
      PermitRootLogin = "no";
      PasswordAuthentication = false;
    };  
  };

  networking.firewall.allowedTCPPorts = [ 22 ];
  networking.firewall.allowedUDPPorts = [ 51820 ];
  networking.firewall.enable = true;

  system.stateVersion = "24.11";
}
