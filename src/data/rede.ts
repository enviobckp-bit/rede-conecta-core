export const WHATSAPP_NUMBER = "5519974210220";
export const WHATSAPP_DISPLAY = "(19) 97421-0220";
export const INSTAGRAM = "@grupo_rede.conecta";
export const INSTAGRAM_URL = "https://instagram.com/redee_conecta";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const pilares = [
  {
    num: "01",
    titulo: "Acolher",
    texto: "Criar um ambiente seguro onde cada pessoa pode ser ouvida sem julgamento.",
  },
  {
    num: "02",
    titulo: "Restaurar",
    texto: "Cuidar de feridas emocionais e relacionais que travam a vida e o trabalho.",
  },
  {
    num: "03",
    titulo: "Desenvolver",
    texto: "Formar pessoas e líderes com conhecimento prático e profundidade humana.",
  },
  {
    num: "04",
    titulo: "Conectar",
    texto: "Aproximar pessoas de recursos, referências e relações que sustentam.",
  },
  {
    num: "05",
    titulo: "Transformar",
    texto: "Gerar mudanças reais e duradouras em famílias, equipes e comunidades.",
  },
];

export const frentes = [
  {
    slug: "familia",
    nome: "REDE Família",
    resumo: "Relacionamentos e casais",
    descricao:
      "Acompanhamento e formação para casais e famílias: comunicação, conflitos, reconstrução de vínculos e educação dos filhos.",
    itens: ["Encontros de casais", "Terapia familiar", "Palestras e workshops", "Mentoria para famílias"],
  },
  {
    slug: "jovem",
    nome: "REDE Jovem",
    resumo: "Propósito, escolhas e futuro",
    descricao:
      "Conteúdo que fala a linguagem da nova geração: identidade, escolhas, ansiedade, carreira e projeto de vida.",
    itens: ["Encontros para jovens", "Orientação vocacional", "Saúde emocional", "Liderança jovem"],
  },
  {
    slug: "lideranca",
    nome: "REDE Liderança",
    resumo: "Formação e desenvolvimento de líderes",
    descricao:
      "Trilhas de formação para líderes de igrejas e organizações: caráter, influência, gestão de pessoas e sustentabilidade emocional.",
    itens: ["Treinamentos", "Imersões", "Mentoria de líderes", "Cultura e equipes"],
  },
  {
    slug: "alma",
    nome: "REDE Alma",
    resumo: "Emoções, autoestima e restauração",
    descricao:
      "Cuidado com a saúde emocional: feridas invisíveis, ansiedade, autoestima, luto e prevenção ao adoecimento.",
    itens: ["Setembro Amarelo", "Rodas de cuidado", "Atendimento e encaminhamento", "Palestras temáticas"],
  },
  {
    slug: "social",
    nome: "REDE Social",
    resumo: "Acolhimento e inclusão",
    descricao:
      "Iniciativas de acolhimento para pessoas em vulnerabilidade, promovendo pertencimento, dignidade e inclusão.",
    itens: ["Grupos de apoio", "Acolhimento comunitário", "Inclusão e pertencimento", "Parcerias locais"],
  },
  {
    slug: "proposito",
    nome: "REDE Propósito",
    resumo: "Talentos, sonhos e projetos de vida",
    descricao:
      "Descoberta de talentos e construção de projetos de vida com clareza, coragem e método.",
    itens: ["Mapeamento de talentos", "Projeto de vida", "Mentoria individual", "Workshops de propósito"],
  },
  {
    slug: "comunidade",
    nome: "REDE Comunidade",
    resumo: "Ações sociais, culturais e educativas",
    descricao:
      "Ações que aproximam pessoas e instituições em torno de educação, cultura e desenvolvimento local.",
    itens: ["Projetos educativos", "Eventos culturais", "Campanhas sociais", "Redes de parceria"],
  },
];

export type Palestra = {
  id: number;
  titulo: string;
  tema: string;
  publico: string[];
  sinopse: string;
};

export const palestras: Palestra[] = [
  {
    id: 1,
    titulo: "Os 10 Mandamentos de um Casamento Forte",
    tema: "Família",
    publico: ["Igrejas", "Casais"],
    sinopse:
      "Dez princípios práticos que sustentam relacionamentos saudáveis: comunicação, admiração, limites, perdão e projeto comum.",
  },
  {
    id: 2,
    titulo: "21 Princípios para uma Liderança que Transforma",
    tema: "Liderança",
    publico: ["Igrejas", "Empresas"],
    sinopse:
      "Uma jornada por princípios de influência, caráter e consistência que transformam líderes e, com eles, as pessoas ao redor.",
  },
  {
    id: 3,
    titulo: "Cuidando de Quem Cuida",
    tema: "Saúde Emocional",
    publico: ["Igrejas", "Empresas"],
    sinopse:
      "Para quem vive servindo: como sustentar a própria saúde emocional sem abandonar o chamado de cuidar dos outros.",
  },
  {
    id: 4,
    titulo: "Play Sábio — Provérbios para a Vida Real",
    tema: "Propósito",
    publico: ["Igrejas", "Jovens"],
    sinopse:
      "Sabedoria milenar aplicada às decisões cotidianas: dinheiro, amizades, palavras, tempo e escolhas.",
  },
  {
    id: 5,
    titulo: "Provérbios para Líderes e Empresários",
    tema: "Liderança",
    publico: ["Empresas"],
    sinopse:
      "Princípios de sabedoria aplicados à gestão, às decisões difíceis e à construção de organizações íntegras.",
  },
  {
    id: 6,
    titulo: "Recalculando a Rota 2.0",
    tema: "Propósito",
    publico: ["Igrejas", "Empresas", "Jovens"],
    sinopse:
      "Quando o plano falha, a rota muda. Como recomeçar com clareza, coragem e direção depois de perdas e frustrações.",
  },
  {
    id: 7,
    titulo: "80% Invisível — O Potencial que Ainda Não Nasceu em Você",
    tema: "Desenvolvimento Humano",
    publico: ["Igrejas", "Empresas", "Jovens"],
    sinopse:
      "A maior parte do que somos ainda não veio à tona. Uma provocação sobre potencial adormecido e coragem para começar.",
  },
  {
    id: 8,
    titulo: "Alma Enferma, Vida Estagnada",
    tema: "Saúde Emocional",
    publico: ["Igrejas"],
    sinopse:
      "Como feridas não tratadas paralisam a vida e quais caminhos conduzem à restauração interior.",
  },
  {
    id: 9,
    titulo: "Em Equilíbrio",
    tema: "Saúde Emocional",
    publico: ["Empresas", "Igrejas"],
    sinopse:
      "Vida pessoal, trabalho e relações: como construir equilíbrio real em um mundo que exige tudo ao mesmo tempo.",
  },
  {
    id: 10,
    titulo: "Entre o Espírito, a Alma e o Corpo",
    tema: "Saúde Emocional",
    publico: ["Igrejas"],
    sinopse:
      "Uma visão integrada do ser humano e o cuidado necessário em cada dimensão da vida.",
  },
  {
    id: 11,
    titulo: "Feridas Que Ninguém Vê",
    tema: "Saúde Emocional",
    publico: ["Igrejas", "Empresas"],
    sinopse:
      "As dores silenciosas que carregamos e como criar ambientes onde é seguro pedir ajuda.",
  },
  {
    id: 12,
    titulo: "Paistoreando",
    tema: "Família",
    publico: ["Igrejas", "Casais"],
    sinopse:
      "Paternidade presente: o impacto de pais que cuidam, orientam e caminham junto com seus filhos.",
  },
  {
    id: 13,
    titulo: "Você Pode, Ainda Que Ferido!",
    tema: "Desenvolvimento Humano",
    publico: ["Igrejas", "Jovens"],
    sinopse:
      "Uma mensagem de reconstrução para quem acredita que a dor encerrou a sua história.",
  },
  {
    id: 14,
    titulo: "Liderança de Dentro Para Fora",
    tema: "Liderança",
    publico: ["Empresas", "Igrejas"],
    sinopse:
      "Antes de liderar pessoas, liderar a si mesmo. Autoconhecimento, disciplina e coerência como base da influência.",
  },
  {
    id: 15,
    titulo: "Pilares do Ser Humano",
    tema: "Desenvolvimento Humano",
    publico: ["Empresas", "Igrejas"],
    sinopse:
      "Os fundamentos que sustentam uma vida inteira: identidade, relações, propósito e valores.",
  },
  {
    id: 16,
    titulo: "Os Segredos da Liderança de Jesus",
    tema: "Liderança",
    publico: ["Igrejas", "Empresas"],
    sinopse:
      "Um estudo prático do modelo de liderança mais influente da história: serviço, visão e formação de pessoas.",
  },
  {
    id: 17,
    titulo: "Setembro Amarelo — Uma Rede que Sustenta Vidas",
    tema: "Saúde Emocional",
    publico: ["Empresas", "Igrejas", "Jovens"],
    sinopse:
      "Prevenção, escuta e acolhimento: como comunidades e equipes podem se tornar uma rede que sustenta vidas.",
  },
  {
    id: 18,
    titulo: "Você é MAIS…",
    tema: "Desenvolvimento Humano",
    publico: ["Jovens", "Igrejas"],
    sinopse:
      "Identidade e valor próprio: uma palestra sobre enxergar-se além dos rótulos e das comparações.",
  },
];

export const temas = Array.from(new Set(palestras.map((p) => p.tema))).sort();
export const publicos = Array.from(new Set(palestras.flatMap((p) => p.publico))).sort();
