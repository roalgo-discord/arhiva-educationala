import { visit } from 'unist-util-visit';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

export default function remarkLintCppClangFormat(options = {}) {
  const {
    bin = 'clang-format',
    languages = ['cpp', 'c++', 'cc', 'cxx', 'hpp', 'hh', 'h'],
    assumeFilename = 'snippet.cpp',
    styleArgs = ['--style=file'],
  } = options;

  return (tree, file) => {
    const cwd = file.path ? path.dirname(file.path) : process.cwd();

    visit(tree, 'code', (node) => {
      const lang = (node.lang || '').toLowerCase();
      if (!languages.includes(lang)) return;

      const res = spawnSync(
        bin,
        [...styleArgs, '--assume-filename', assumeFilename],
        { input: node.value, cwd, encoding: 'utf8', maxBuffer: 5 * 1024 * 1024 }
      );

      if (res.error) {
        file.message(
          `clang-format execution failed: ${res.error.message}`,
          node,
          'remark-lint:cpp-clang-format'
        );
        return;
      }

      if (typeof res.stdout !== 'string') {
        file.message('clang-format produced no output', node, 'remark-lint:cpp-clang-format');
        return;
      }

      const formatted = res.stdout;
      if (formatted !== node.value) {
        file.message('C++ code block is not clang-formatted', node, 'remark-lint:cpp-clang-format');
      }
    });
  };
}
