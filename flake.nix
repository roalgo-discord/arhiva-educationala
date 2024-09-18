{
  description = "Flake for mkdocs project with Python dependencies";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = import nixpkgs { inherit system; };
    in
    {
      devShell = pkgs.mkShell {
        name = "mkdocs-shell";

        buildInputs = [
          pkgs.python3
          pkgs.poetry
          pkgs.python3Packages.virtualenv
          # Add other python requirements here if necessary, for example:
          # pkgs.python3Packages.mkdocsMaterial
        ];

        shellHook = ''
          echo "Activating virtual environment"
          if [ ! -d ".venv" ]; then
            virtualenv .venv
          fi
          source .venv/bin/activate

          echo "Installing Python dependencies"
          poetry install

          echo "You can now run mkdocs commands!"
        '';
      };
    });
}
