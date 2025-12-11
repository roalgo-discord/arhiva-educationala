import { visit } from 'unist-util-visit';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { defaultHandlers } from 'mdast-util-to-markdown';

const MAX_BUFFER = 5 * 1024 * 1024;
const DATA_KEY = 'cppClangFormat';

export default function remarkCppClangFormat(options = {}) {
  const {
    bin = 'clang-format',
    languages = ['cpp', 'c++', 'cc', 'cxx', 'hpp', 'hh', 'h'],
    assumeFilename = 'snippet.cpp',
    styleArgs = ['--style=file'],
  } = options;

  // @ts-expect-error: unified sets `this` to the processor.
  const processor = this;
  const data =
    processor && typeof processor.data === 'function' ? processor.data() : undefined;

  const record =
    data && data[DATA_KEY]
      ? data[DATA_KEY]
      : {
          handlerRegistered: false,
          shared: { currentFile: undefined },
        };

  if (data && !data[DATA_KEY]) {
    data[DATA_KEY] = record;
  }

  const { shared } = record;

  if (data && !record.handlerRegistered) {
    const extensions =
      data.toMarkdownExtensions || (data.toMarkdownExtensions = []);

    extensions.push({
      handlers: {
        code(node, _parent, state, info) {
          const lang = (node.lang || '').toLowerCase();
          if (!languages.includes(lang)) {
            return defaultHandlers.code(node, _parent, state, info);
          }

          const cwd =
            (node.data && node.data.cppClangFormatCwd) || process.cwd();
          const input = typeof node.value === 'string' ? node.value : '';

          const res = spawnSync(
            bin,
            [...styleArgs, '--assume-filename', assumeFilename],
            { input, cwd, encoding: 'utf8', maxBuffer: MAX_BUFFER }
          );

          const currentFile = shared.currentFile;

          if (res.error) {
            currentFile?.message?.(
              `clang-format execution failed: ${res.error.message}`,
              node,
              'remark:cpp-clang-format'
            );
            return defaultHandlers.code(node, _parent, state, info);
          }

          if (res.status !== 0) {
            const stderr = res.stderr ? String(res.stderr).trim() : 'unknown error';
            currentFile?.message?.(
              `clang-format exited with code ${res.status}: ${stderr}`,
              node,
              'remark:cpp-clang-format'
            );
            return defaultHandlers.code(node, _parent, state, info);
          }

          if (typeof res.stdout !== 'string') {
            currentFile?.message?.(
              'clang-format produced no output',
              node,
              'remark:cpp-clang-format'
            );
            return defaultHandlers.code(node, _parent, state, info);
          }

          let formatted = res.stdout.replace(/\r\n/g, '\n');
          if (!input.endsWith('\n') && formatted.endsWith('\n')) {
            formatted = formatted.slice(0, -1);
          }

          if (!formatted || formatted === node.value) {
            return defaultHandlers.code(node, _parent, state, info);
          }

          return defaultHandlers.code(
            { ...node, value: formatted },
            _parent,
            state,
            info
          );
        },
      },
    });

    record.handlerRegistered = true;
  }

  return function transformer(tree, file) {
    shared.currentFile = file;

    const cwd =
      file && file.path ? path.dirname(file.path) : process.cwd();

    visit(tree, 'code', (node) => {
      if (!node.data) node.data = {};
      node.data.cppClangFormatCwd = cwd;
    });
  };
}
