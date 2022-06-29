import processor from './lib/processor.js';
import server from './lib/server.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const dir = path.join(dirname(fileURLToPath(import.meta.url)), 'static');
const s = server.init(8080, '0.0.0.0', dir);
processor.start(s);
