import fs from 'node:fs'
import YAML from 'yaml'

const ruta = 'docs/api-contrato-openapi.yml'
const doc = YAML.parse(fs.readFileSync(ruta, 'utf8'))

const recursos = Object.keys(doc.paths).filter((p) => p.startsWith('/api/v1/'))
const refs = new Set()
function recolectarRefs(nodo) {
  if (!nodo || typeof nodo !== 'object') return
  if (Array.isArray(nodo)) return nodo.forEach(recolectarRefs)
  if (nodo.$ref) refs.add(nodo.$ref.replace('#/components/schemas/', ''))
  Object.values(nodo).forEach(recolectarRefs)
}
recolectarRefs(doc)

const esquemas = new Set(Object.keys(doc.components.schemas ?? {}))
const refsRotos = [...refs].filter((r) => !esquemas.has(r))

const resultado = {
  openapi: doc.openapi,
  paths: Object.keys(doc.paths).length,
  recursos,
  schemas: [...esquemas],
  refsSinDefinir: refsRotos,
}

console.log(JSON.stringify(resultado, null, 2))
if (resultado.refsSinDefinir.length) process.exit(1)