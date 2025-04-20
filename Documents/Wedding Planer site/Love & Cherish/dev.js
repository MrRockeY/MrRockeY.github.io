import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vitePath = path.resolve(__dirname, 'node_modules', '.bin', 'vite');

const vite = spawn(vitePath, [], {
  stdio: 'inherit',
  shell: true
});

vite.on('error', (err) => {
  console.error('Failed to start Vite:', err);
});

process.on('SIGINT', () => {
  vite.kill('SIGINT');
});
