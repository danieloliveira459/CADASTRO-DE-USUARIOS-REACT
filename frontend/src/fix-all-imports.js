const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');

function correctImports(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      correctImports(fullPath); // recursivo para subpastas
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let updated = content;

      // Corrige '..src/' para './'
      updated = updated.replace(/\.\.src/g, './');

      // Corrige imports com múltiplos '../' que podem estar incorretos
      updated = updated.replace(/(\.\.\/)+/g, match => {
        const parts = match.split('../').filter(Boolean);
        return '../'.repeat(parts.length);
      });

      // Corrige imports de arquivos com maiúsculas/minúsculas inconsistentes (simplificado)
      updated = updated.replace(/from\s+['"](\.\/[A-Za-z0-9_-]+)['"]/g, (m, p1) => {
        const fullPathImport = path.join(path.dirname(fullPath), p1 + '.js');
        if (fs.existsSync(fullPathImport)) {
          return `from '${p1}'`;
        }
        return m; // mantém se não existir
      });

      if (updated !== content) {
        fs.writeFileSync(fullPath, updated, 'utf8');
        console.log('Corrigido:', fullPath);
      }
    }
  });
}

correctImports(SRC_DIR);
console.log('Todos os imports foram verificados e corrigidos!');

