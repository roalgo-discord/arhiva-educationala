{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{
  languages.javascript = {
    enable = true;
    bun.enable = true;
  };

  devcontainer.enable = true;
}
