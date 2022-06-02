import processor from './lib/processor.js';
import server from './lib/server.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

processor.start();

const dir = path.join(dirname(fileURLToPath(import.meta.url)), 'static');
server.serveStatic(8080, '0.0.0.0', dir);
