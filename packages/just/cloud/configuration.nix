{ config, lib, pkgs, ... }:

{
  system.stateVersion = "24.11";
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

  # networking
  networking = {
    hostName = "justCloud";
    firewall = {
      enable = true;
      allowedTCPPorts = [ 22 25 110 143 465 587 993 995 3003 4190 ]; # 22=ssh, 3003=testing, resst=mail
      allowedUDPPorts = [ 51820 ];
      extraCommands = ''
        iptables -A INPUT -i lo -s 192.168.192.0/24 -j ACCEPT
        ip6tables -A INPUT -i lo -s 192.168.192.0/24 -j ACCEPT
      '';
    };
    resolvconf.enable = false;
  };
  environment.etc."resolv.conf".text = ''
    nameserver 127.0.0.1
    nameserver 1.1.1.1
    nameserver 1.0.0.1
  '';

  # users
  users.groups.dev = {};
  users.users.jkonratt = {
    isNormalUser = true;
    extraGroups = [ "dev" "docker" ];
    openssh.authorizedKeys.keys = [
      "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDPT2/z3cipQhptV8esRPTUdzXRpBVx+A26ouxTViJLgmYioVEsG0h1JYUBBS1Od4JPIa5PfTLlL4URHjRZqTjMIOevLOHjMSbmyqMWDPU7y/UME+1ZtcUFUrIRKqi8ghnJL0GMbXm12Nc8oTNtER24eDqnrL81ewR1Q0zph7OTD+aMrjWQAFQa2a9XUcZcFSVU8PPTEpxa+qsSCJl5Rf4IgT23e/yY1GXrY9LQpgce95HhM125lKtwkhwNZKHIPg0qe0fhEZAp+k27Czlp/ATberLrEI8txFfXkN/l02O8cMh0pk/y4CZC1yW4ujSI5HVmTrfqmB9B8PplCadDXJ7L rsa-key-20230922"
    ];
  };

  users.users.root = {
    openssh.authorizedKeys.keys = [
      "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDPT2/z3cipQhptV8esRPTUdzXRpBVx+A26ouxTViJLgmYioVEsG0h1JYUBBS1Od4JPIa5PfTLlL4URHjRZqTjMIOevLOHjMSbmyqMWDPU7y/UME+1ZtcUFUrIRKqi8ghnJL0GMbXm12Nc8oTNtER24eDqnrL81ewR1Q0zph7OTD+aMrjWQAFQa2a9XUcZcFSVU8PPTEpxa+qsSCJl5Rf4IgT23e/yY1GXrY9LQpgce95HhM125lKtwkhwNZKHIPg0qe0fhEZAp+k27Czlp/ATberLrEI8txFfXkN/l02O8cMh0pk/y4CZC1yW4ujSI5HVmTrfqmB9B8PplCadDXJ7L rsa-key-20230922"
    ];
  };

  # permissions
  systemd.tmpfiles.rules = [
    "d /srv 0770 root dev"
  ];

  # packages & services
  environment.systemPackages = with pkgs; [
    docker
    lm_sensors
  ];

  virtualisation.docker = {
    enable = true;
    rootless = {
      # enable = true;
      enable = false;
      setSocketVariable = true;
    };
  };

  security.wrappers.docker-rootlesskit = {
    source = "${pkgs.rootlesskit.out}/bin/rootlesskit";
    capabilities = "cap_net_bind_service+ep";
    owner = "root";
    group = "root";
  };

  services.openssh = {
    enable = true;
    settings = {
      PermitRootLogin = "yes";
      PasswordAuthentication = false;
    };  
  };
}
