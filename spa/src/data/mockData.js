export const monthlyProgress = [
  { mes: 'ENE', traducidos: 8, revisados: 5 },
  { mes: 'FEB', traducidos: 12, revisados: 8 },
  { mes: 'MAR', traducidos: 10, revisados: 7 },
  { mes: 'ABR', traducidos: 15, revisados: 11 },
  { mes: 'MAY', traducidos: 18, revisados: 14 },
  { mes: 'JUN', traducidos: 13, revisados: 9 },
  { mes: 'JUL', traducidos: 20, revisados: 16 },
  { mes: 'AGO', traducidos: 17, revisados: 13 },
  { mes: 'SEP', traducidos: 22, revisados: 17 },
  { mes: 'OCT', traducidos: 19, revisados: 15 },
  { mes: 'NOV', traducidos: 24, revisados: 20 },
  { mes: 'DIC', traducidos: 21, revisados: 17 },
]

export const universos = [
  { id: 1, nombre: 'Aliento de los dioses', revisados: 12, enRevision: 2, pendientes: 1 },
  { id: 2, nombre: 'Arena blanca', revisados: 6, enRevision: 2, pendientes: 8 },
  { id: 3, nombre: 'El alma del emperador', revisados: 5, enRevision: 1, pendientes: 1 },
  { id: 4, nombre: 'Alcatraz', revisados: 3, enRevision: 2, pendientes: 10 },
  { id: 5, nombre: 'Cosmere', revisados: 15, enRevision: 4, pendientes: 3 },
  { id: 6, nombre: 'Citoverso', revisados: 2, enRevision: 2, pendientes: 14 },
  { id: 7, nombre: 'Elantris', revisados: 9, enRevision: 5, pendientes: 2 },
  { id: 8, nombre: 'Fuera del universo', revisados: 1, enRevision: 1, pendientes: 12 },
  { id: 9, nombre: 'Legión', revisados: 4, enRevision: 1, pendientes: 4 },
  { id: 10, nombre: 'Nacidos de la bruma', revisados: 20, enRevision: 10, pendientes: 8 },
  { id: 11, nombre: 'Mago Frugal', revisados: 5, enRevision: 1, pendientes: 1 },
  { id: 12, nombre: 'Otras historias', revisados: 7, enRevision: 3, pendientes: 6 },
  { id: 14, nombre: 'Rithmatista', revisados: 2, enRevision: 2, pendientes: 5 },
  { id: 15, nombre: 'Reckoners', revisados: 4, enRevision: 2, pendientes: 10 },
  { id: 16, nombre: 'Rueda del tiempo', revisados: 6, enRevision: 3, pendientes: 2 },
  { id: 17, nombre: 'Archivo de las tormentas', revisados: 22, enRevision: 12, pendientes: 6 },
  { id: 18, nombre: 'Islas de la Ascuaoscura', revisados: 3, enRevision: 1, pendientes: 11 },
  { id: 19, nombre: 'Sombras por Silencio', revisados: 4, enRevision: 2, pendientes: 1 },
  { id: 20, nombre: 'Trenza', revisados: 2, enRevision: 1, pendientes: 8 },
  { id: 21, nombre: 'Yumi', revisados: 5, enRevision: 2, pendientes: 10 },
  { id: 22, nombre: 'Hombre Iluminado', revisados: 1, enRevision: 1, pendientes: 3 },
  { id: 23, nombre: 'Stormlight RPG', revisados: 9, enRevision: 4, pendientes: 5 },
  { id: 24, nombre: 'Diciembre', revisados: 2, enRevision: 1, pendientes: 14 },
]

const suma = (clave) => universos.reduce((acc, u) => acc + u[clave], 0)
const traducidosImperio = suma('revisados') + suma('enRevision')
const totalImperio = traducidosImperio + suma('pendientes')

export const projectStats = {
  totalArticulos: totalImperio,
  traducidos: traducidosImperio,
  revisados: suma('revisados'),
  pendientes: suma('pendientes'),
}

export const articleStates = [
  { label: 'Revisado', value: suma('revisados'), color: '#d66e4b' },
  { label: 'En revisión', value: suma('enRevision'), color: '#ffb873' },
  { label: 'Pendiente', value: suma('pendientes'), color: '#7e402b' },
]

export const glossary = [
  {
    term: 'Investiture',
    es: 'Investidura',
    universo: 'Cosmere',
    urlEn: 'https://coppermind.net/wiki/Investiture',
    urlEs: 'https://es.coppermind.net/wiki/Investidura',
  },
  {
    term: 'Shard',
    es: 'Esquirla',
    universo: 'Cosmere',
    urlEn: 'https://coppermind.net/wiki/Shard',
    urlEs: 'https://es.coppermind.net/wiki/Esquirla',
  },
  {
    term: 'Splinter',
    es: 'Astilla',
    universo: 'Cosmere',
    urlEn: 'https://coppermind.net/wiki/Splinter',
    urlEs: 'https://es.coppermind.net/wiki/Astilla',
  },
  {
    term: 'Stormlight',
    es: 'Luz tormentosa',
    universo: 'Archivo de las tormentas',
    urlEn: 'https://coppermind.net/wiki/Stormlight',
    urlEs: 'https://es.coppermind.net/wiki/Luz_tormentosa',
  },
  {
    term: 'Allomancy',
    es: 'Alomancia',
    universo: 'Nacidos de la bruma',
    urlEn: 'https://coppermind.net/wiki/Allomancy',
    urlEs: 'https://es.coppermind.net/wiki/Alomancia',
  },
  {
    term: 'Feruchemy',
    es: 'Feruquimia',
    universo: 'Nacidos de la bruma',
    urlEn: 'https://coppermind.net/wiki/Feruchemy',
    urlEs: 'https://es.coppermind.net/wiki/Feruquimia',
  },
  {
    term: 'Hemalurgy',
    es: 'Hemalurgia',
    universo: 'Nacidos de la bruma',
    urlEn: 'https://coppermind.net/wiki/Hemalurgy',
    urlEs: 'https://es.coppermind.net/wiki/Hemalurgia',
  },
  {
    term: 'Mistborn',
    es: 'Nacido de la bruma',
    universo: 'Nacidos de la bruma',
    urlEn: 'https://coppermind.net/wiki/Mistborn',
    urlEs: 'https://es.coppermind.net/wiki/Nacido_de_la_bruma',
  },
  {
    term: 'Cognitive Realm',
    es: 'Reino Cognitivo',
    universo: 'Cosmere',
    urlEn: 'https://coppermind.net/wiki/Cognitive_Realm',
    urlEs: 'https://es.coppermind.net/wiki/Reino_Cognitivo',
  },
  {
    term: 'Fabrial',
    es: 'Fabrial',
    universo: 'Archivo de las tormentas',
    urlEn: 'https://coppermind.net/wiki/Fabrial',
    urlEs: 'https://es.coppermind.net/wiki/Fabrial',
  },
  {
    term: "The Frugal Wizard's Handbook for Surviving Medieval England",
    es: 'La guía del mago frugal para sobrevivir en la Inglaterra del medievo',
    universo: 'Mago Frugal',
    urlEn: 'https://coppermind.net/wiki/The_Frugal_Wizard',
    urlEs: 'https://es.coppermind.net/wiki/Mago_Frugal',
  },
]

export const categoria = [
  {
    id: 1,
    es: 'Category:Administration',
    en: 'Categoría:Administración',
  },
  {
    id: 2,
    es: 'Category:Aetherbound',
    en: 'Categoría:Etervínculo',
  },
  {
    id: 3,
    es: 'Category:Armies',
    en: 'Categoría:Ejércitos',
  },
  {
    id: 4,
    es: 'Isles of the Emberdark',
    en: 'Islas de la Ascuaoscura',
  },
  {
    id: 5,
    es: 'Category:Worldhoppers',
    en: 'Categoría:Saltamundos',
  },
  {
    id: 6,
    es: 'Category:Yolish events',
    en: 'Categoría:Eventos de Yolen',
  },
  {
    id: 7,
    es: 'Category:Veden',
    en: 'Categoría:De Jah Keved',
  },
  {
    id: 8,
    es: 'Category:Urithiru',
    en: 'Categoría:Urithiru',
  },
]

export const traduccionArticulos = [
  {
    id: 1,
    tituloEn: 'Hemalurgy',
    tituloEs: 'Hemalurgia',
    universo: 'Mistborn',
    page_en_url: 'https://coppermind.net/wiki/Hemalurgy',
    page_es_url: 'https://es.coppermind.net/wiki/Hemalurgia',
    traducido: false,
    traductor: null,
  },
  {
    id: 2,
    tituloEn: 'Kelsier',
    tituloEs: 'Kelsier',
    universo: 'Cosmere',
    page_en_url: 'https://coppermind.net/wiki/Kelsier',
    page_es_url: 'https://es.coppermind.net/wiki/Kelsier',
    traducido: false,
    traductor: 'traductor',
  },
  {
    id: 3,
    tituloEn: 'Cognitive Realm',
    tituloEs: 'Reino Cognitivo',
    universo: 'Cosmere',
    page_en_url: 'https://coppermind.net/wiki/Cognitive_Realm',
    page_es_url: 'https://es.coppermind.net/wiki/Reino_Cognitivo',
    traducido: false,
    traductor: null,
  },
  {
    id: 4,
    tituloEn: 'Citoverse',
    tituloEs: 'Citoverso',
    universo: 'Citoverso',
    page_en_url: 'https://coppermind.net/wiki/Citoverse',
    page_es_url: 'https://es.coppermind.net/wiki/Citoverso',
    traducido: false,
    traductor: null,
  },
  {
    id: 5,
    tituloEn: 'Ire',
    tituloEs: 'Ire',
    universo: 'Cosmere',
    page_en_url: 'https://coppermind.net/wiki/Ire',
    page_es_url: 'https://es.coppermind.net/wiki/Ire',
    traducido: false,
    traductor: null,
  },
  {
    id: 6,
    tituloEn: 'Alcatraz vs. the Evil Librarians',
    tituloEs: 'Alcatraz contra los Bibliotecarios Malvados',
    universo: 'Alcatraz',
    page_en_url:
      'https://coppermind.net/wiki/Alcatraz_vs._the_Evil_Librarians',
    page_es_url:
      'https://es.coppermind.net/wiki/Alcatraz_contra_los_Bibliotecarios_Malvados',
    traducido: false,
    traductor: null,
  },
  {
    id: 7,
    tituloEn: 'Marasi Colms',
    tituloEs: 'Marasi Colms',
    universo: 'Mistborn',
    page_en_url: 'https://coppermind.net/wiki/Marasi_Colms',
    page_es_url: 'https://es.coppermind.net/wiki/Marasi_Colms',
    traducido: false,
    traductor: null,
  },
  {
    id: 8,
    tituloEn: 'Traps',
    tituloEs: 'Trampas',
    universo: 'Mistborn',
    page_en_url: 'https://coppermind.net/wiki/Traps',
    page_es_url: 'https://es.coppermind.net/wiki/Trampas',
    traducido: false,
    traductor: null,
  },
]
