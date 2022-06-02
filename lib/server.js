import Fastify from 'fastify'
import fastify_static from '@fastify/static';
import path from 'path';
const fastify = Fastify({ logger: false });


function serveStatic(port, host, dir) {
  fastify.register(fastify_static, {
    root: dir,
  })

  fastify.listen(port, host, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1)
    }
    console.log(`Server listening on ${address}`);
  })
}

export { serveStatic };
export default { serveStatic };
