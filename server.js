// production server
import Fastify from 'fastify';
import fastify_static from '@fastify/static';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fastify = Fastify({
    logger: true,
});

fastify.register(fastify_static, {
    root: path.join(__dirname, 'dist'),
});

fastify.listen({ port: 80 }, (err, _) => {
    if (err) throw err;
});