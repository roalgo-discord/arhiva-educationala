{
  description = "Arhiva Educationala RoAlgo";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

    bun2nix = {
      url = "github:nix-community/bun2nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    flake-parts.url = "github:hercules-ci/flake-parts";
    devenv.url = "github:cachix/devenv";
  };

  outputs =
    inputs@{
      self,
      flake-parts,
      nixpkgs,
      bun2nix,
      ...
    }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [
        inputs.devenv.flakeModule
      ];
      systems = nixpkgs.lib.systems.flakeExposed;

      perSystem =
        {
          config,
          self',
          inputs',
          pkgs,
          system,
          ...
        }:
        let
          bun2 = bun2nix.packages.${system}.default;
        in
        {
          packages.arhiva-educationala = pkgs.stdenv.mkDerivation {
            pname = "arhiva-educationala";
            version = "1.0.0";

            src = ./.;

            nativeBuildInputs = [
              pkgs.bun
              bun2.hook
            ];

            bunInstallFlags = [
              "--offline"
              "--linker=isolated"
            ];

            bunDeps = bun2.fetchBunDeps {
              bunNix = ./bun.nix;
            };

            buildPhase = ''
              bun run build
            '';

            installPhase = ''
              rm -rf .direnv .devenv result result-* .git
              mkdir -p "$out"
              cp -R . "$out"
              find "$out" -xtype l -delete
            '';
          };

          checks.arhiva-educationala-service = pkgs.testers.nixosTest {
            name = "arhiva-educationala-service";

            nodes.machine =
              { config, pkgs, ... }:
              {
                imports = [ self.nixosModules.arhiva-educationala ];
                services.arhiva-educationala = {
                  enable = true;
                  package = self'.packages.arhiva-educationala;
                  port = 3100;
                };
                virtualisation.memorySize = 2048;
                networking.firewall.allowedTCPPorts = [ 3100 ];
                environment.systemPackages = [ pkgs.curl ];
              };

            testScript = ''
              start_all()
              machine.wait_for_unit("arhiva-educationala.service")
              machine.wait_for_open_port(3100)
              machine.succeed("curl -sSf http://127.0.0.1:3100/ | head -n 5")
            '';
          };

          devenv.shells.default = {
            languages.javascript = {
              enable = true;
              bun.enable = true;
            };

            packages = [
              bun2nix.packages.${system}.default
            ];

            enterShell = '''';
          };
        };

      flake.nixosModules.arhiva-educationala =
        {
          config,
          lib,
          pkgs,
          ...
        }:
        let
          inherit (lib)
            mkEnableOption
            mkOption
            mkIf
            types
            ;
          cfg = config.services.arhiva-educationala;
        in
        {
          options.services.arhiva-educationala = {
            enable = mkEnableOption "Arhiva Educationala Next.js service";

            package = mkOption {
              type = types.package;
              default = self.packages.${pkgs.system}.arhiva-educationala;
              description = "Built Arhiva Educationala Next.js site";
            };

            port = mkOption {
              type = types.port;
              default = 3000;
              description = "Port on which Arhiva Educationala listens";
            };

            user = mkOption {
              type = types.str;
              default = "arhiva-educationala";
            };

            group = mkOption {
              type = types.str;
              default = "arhiva-educationala";
            };

            workingDirectory = mkOption {
              type = types.str;
              default = "/var/lib/arhiva-educationala";
              description = "Working directory used by the systemd service.";
            };
          };

          config = mkIf cfg.enable {
            users.users.${cfg.user} = {
              isSystemUser = true;
              group = cfg.group;
              home = "/var/lib/${cfg.user}";
              createHome = true;
            };

            users.groups.${cfg.group} = { };

            systemd.services.arhiva-educationala = {
              description = "Arhiva Educationala";
              wantedBy = [ "multi-user.target" ];
              after = [ "network.target" ];

              serviceConfig = {
                WorkingDirectory = "${cfg.package}";
                ExecStart = "${pkgs.bun}/bin/bun run start";

                Environment = [
                  "PORT=${toString cfg.port}"
                  "NODE_ENV=production"
                ];

                User = cfg.user;
                Group = cfg.group;
                Restart = "on-failure";
              };
            };

            networking.firewall.allowedTCPPorts = [ cfg.port ];
          };
        };

      flake.nixosModules.default = self.nixosModules.arhiva-educationala;
    };
}
