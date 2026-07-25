const concepts = {
  origen: {
    name: 'A · Origen',
    shortName: 'Origen',
    rationale:
      'La propuesta más directa: un trazo continuo parte de un núcleo azul y va construyendo capas cada vez más amplias. Une “dentro”, desarrollo progresivo y sistema sin recurrir a símbolos obvios de IA.',
    scores: ['9.5', '9.0', '8.5']
  },
  despliegue: {
    name: 'B · Despliegue',
    shortName: 'Despliegue',
    rationale:
      'La unidad azul funciona como capacidad inicial. Los dos ángulos que la contienen amplían su escala de forma modular: una lectura más técnica, sistemática y ligada a la orquestación de agentes.',
    scores: ['8.5', '8.0', '9.5']
  },
  umbral: {
    name: 'C · Umbral',
    shortName: 'Umbral',
    rationale:
      'El elemento interior atraviesa el marco que lo contenía. La idea de transformación es más dinámica: Involution introduce inteligencia dentro de la empresa hasta cambiar sus límites operativos.',
    scores: ['9.0', '8.5', '9.0']
  }
};

const cards = [...document.querySelectorAll('[data-concept]')];
const markSlots = [...document.querySelectorAll('[data-mark-slot]')];
const nameNode = document.querySelector('#selected-name');
const rationaleNode = document.querySelector('#selected-rationale');
const footerNode = document.querySelector('#footer-selection');
const livePreviewLink = document.querySelector('#live-preview-link');
const scoreNodes = [
  document.querySelector('#score-idea'),
  document.querySelector('#score-memory'),
  document.querySelector('#score-small')
];

function selectConcept(key, updateUrl = true) {
  const concept = concepts[key] ?? concepts.despliegue;

  cards.forEach((card) => {
    const selected = card.dataset.concept === key;
    card.classList.toggle('is-selected', selected);
    card.setAttribute('aria-pressed', String(selected));
    card.querySelector('.concept-status').textContent = selected ? 'Seleccionado' : 'Seleccionar';
  });

  markSlots.forEach((slot) => {
    slot.querySelector('use').setAttribute('href', `#mark-${key}`);
  });

  nameNode.textContent = concept.name;
  rationaleNode.textContent = concept.rationale;
  footerNode.textContent = `Ruta activa: ${concept.shortName}`;
  livePreviewLink.href = `./?logo=${key}`;
  livePreviewLink.firstChild.textContent = `Ver ${concept.shortName} en la web completa `;
  scoreNodes.forEach((node, index) => {
    node.textContent = concept.scores[index];
  });

  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set('logo', key);
    window.history.replaceState({}, '', url);
  }
}

cards.forEach((card) => {
  card.addEventListener('click', () => selectConcept(card.dataset.concept));
});

const initialConcept = new URLSearchParams(window.location.search).get('logo');
selectConcept(concepts[initialConcept] ? initialConcept : 'despliegue', false);
